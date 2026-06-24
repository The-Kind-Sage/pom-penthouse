import { useState, useRef } from "react";
import { Upload, X, Loader2, Plus } from "lucide-react";

type MultiImageUploadProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  folder?: string;
  maxImages?: number;
};

export function MultiImageUpload({ value, onChange, label = "Images", folder = "pom-penthouse", maxImages = 10 }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLocalAsset = (url: string) => {
    return url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || url.includes('/assets/');
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        // Store local URL in database (it will display from src/assets)
        const urlToStore = data.local_url || data.url;
        onChange([...value, urlToStore]);
      }
    } catch { }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const canAddMore = value.length < maxImages;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block">{label} ({value.length}/{maxImages})</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {value.map((url, i) => (
          <div key={i} className="relative w-full rounded-xl overflow-hidden border group">
            <img 
              src={isLocalAsset(url) ? url : url} 
              alt={`${label} ${i + 1}`} 
              className="w-full h-32 object-cover" 
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button type="button" onClick={() => removeImage(i)}
                className="p-1.5 rounded-lg bg-red-500/70 hover:bg-red-500 text-white transition">
                <X size={16} />
              </button>
            </div>
            {isLocalAsset(url) && (
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-500/80 text-white text-xs rounded-full">
                Local
              </div>
            )}
          </div>
        ))}
        {canAddMore && (
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
            className="w-full h-32 rounded-xl border-2 border-dashed border-border hover:border-gold/50 transition flex flex-col items-center justify-center gap-2 text-foreground/40 hover:text-foreground/70 disabled:opacity-50">
            {uploading ? <Loader2 className="size-6 animate-spin" /> : <Plus className="size-6" />}
            <span className="text-xs">{uploading ? "Uploading..." : "Add Image"}</span>
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}
