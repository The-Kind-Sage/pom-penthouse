import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
};

export function ImageUpload({ value, onChange, label = "Image", folder = "pom-penthouse" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      if (data.success) onChange(data.url);
    } catch { }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block">{label}</label>
      {value ? (
        <div className="relative w-full max-w-[300px] rounded-xl overflow-hidden border group">
          <img src={value} alt={label} className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
            <button type="button" onClick={() => inputRef.current?.click()}
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition">
              <Upload size={16} />
            </button>
            <button type="button" onClick={() => onChange("")}
              className="p-1.5 rounded-lg bg-red-500/70 hover:bg-red-500 text-white transition">
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
          className="w-full max-w-[300px] h-40 rounded-xl border-2 border-dashed border-border hover:border-gold/50 transition flex flex-col items-center justify-center gap-2 text-foreground/40 hover:text-foreground/70 disabled:opacity-50">
          {uploading ? <Loader2 className="size-6 animate-spin" /> : <Upload className="size-6" />}
          <span className="text-xs">{uploading ? "Uploading..." : "Click to upload"}</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}
