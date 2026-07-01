import { useState } from "react";
import { X, Plus } from "lucide-react";

type MultiImageUploadProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  maxImages?: number;
};

export function MultiImageUpload({ value, onChange, label = "Images", maxImages = 10 }: MultiImageUploadProps) {
  const [urlInput, setUrlInput] = useState("");

  const addUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (value.length >= maxImages) return;
    onChange([...value, trimmed]);
    setUrlInput("");
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
            <img src={url} alt={`${label} ${i + 1}`} className="w-full h-32 object-cover" />
            <button type="button" onClick={() => removeImage(i)}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/70 hover:bg-red-500 text-white transition opacity-0 group-hover:opacity-100">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      {canAddMore && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="Paste image URL..."
            className="flex-1 rounded-xl border px-4 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
          />
          <button type="button" onClick={addUrl}
            className="px-3 py-2 rounded-lg border hover:bg-muted text-sm flex items-center gap-1">
            <Plus className="size-4" /> Add
          </button>
        </div>
      )}
    </div>
  );
}
