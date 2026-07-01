import { X } from "lucide-react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block">{label}</label>
      {value ? (
        <div className="relative w-full max-w-[300px] rounded-xl overflow-hidden border group">
          <img src={value} alt={label} className="w-full h-40 object-cover" />
          <button type="button" onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/70 hover:bg-red-500 text-white transition opacity-0 group-hover:opacity-100">
            <X size={16} />
          </button>
        </div>
      ) : null}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste image URL..."
        className="w-full max-w-[300px] rounded-xl border px-4 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
      />
    </div>
  );
}
