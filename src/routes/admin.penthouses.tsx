import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { usePenthouses, useCreatePenthouse, useUpdatePenthouse, useDeletePenthouse } from "@/lib/hooks";
import { type Penthouse, type PenthouseStatus } from "@/lib/admin-types";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/penthouses")({
  component: PenthousesPage,
});

const statusStyles: Record<PenthouseStatus, string> = {
  available: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  booked: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  maintenance: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

function Badge({ label, style }: { label: string; style: string }) {
  return <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${style}`}>{label}</span>;
}

function PenthousesPage() {
  const { data: penthouses = [], isLoading } = usePenthouses();
  const createPenthouse = useCreatePenthouse();
  const updatePenthouse = useUpdatePenthouse();
  const deletePenthouse = useDeletePenthouse();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Penthouse | null>(null);
  const [form, setForm] = useState({ name: "", location: "", price_per_night: 0, description: "", max_guests: 2, bedrooms: 1, bathrooms: 1, status: "available" as PenthouseStatus, amenities: "", rules: "" });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", location: "", price_per_night: 0, description: "", max_guests: 2, bedrooms: 1, bathrooms: 1, status: "available", amenities: "", rules: "" });
    setImageUrls([]);
    setShowForm(true);
  };

  const openEdit = (p: Penthouse) => {
    setEditing(p);
    setForm({ name: p.name, location: p.location || "", price_per_night: p.price_per_night, description: p.description || "", max_guests: p.max_guests, bedrooms: p.bedrooms, bathrooms: p.bathrooms, status: p.status, amenities: p.amenities?.join(", ") || "", rules: p.rules?.join(", ") || "" });
    setImageUrls(p.images || []);
    setShowForm(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", "pom-penthouse");
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (data.url) urls.push(data.url);
      }
      setImageUrls((prev) => [...prev, ...urls]);
      toast.success(`${urls.length} image(s) uploaded`);
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error("Name is required"); return; }
    const payload = {
      name: form.name,
      location: form.location,
      price_per_night: form.price_per_night,
      description: form.description,
      max_guests: form.max_guests,
      bedrooms: form.bedrooms,
      bathrooms: form.bathrooms,
      status: form.status,
      amenities: form.amenities.split(",").map((s) => s.trim()).filter(Boolean),
      rules: form.rules.split(",").map((s) => s.trim()).filter(Boolean),
      image: imageUrls[0] || null,
      images: imageUrls,
    };
    try {
      if (editing) {
        await updatePenthouse.mutateAsync({ id: editing.id, ...payload });
        toast.success("Penthouse updated");
      } else {
        await createPenthouse.mutateAsync(payload);
        toast.success("Penthouse added");
      }
      setShowForm(false);
    } catch {
      toast.error("Failed to save penthouse");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePenthouse.mutateAsync(id);
      toast.success("Penthouse removed");
    } catch {
      toast.error("Failed to delete penthouse");
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-20 text-sm text-foreground/60">Loading penthouses...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Penthouses</h1>
          <p className="text-sm text-foreground/60">Manage your property inventory</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2 px-4">
          <Plus size={16} /> Add Penthouse
        </button>
      </div>

      <div className="bg-background border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="w-12 px-4 py-3" />
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Location</th>
                <th className="text-left px-4 py-3 font-medium">Price / Night</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Guests</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {penthouses.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition">
                  <td className="px-4 py-3">
                    {p.image ? <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 rounded-lg bg-muted" />}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-foreground/60">{p.location}</td>
                  <td className="px-4 py-3">रू{p.price_per_night.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3"><Badge label={p.status} style={statusStyles[p.status as PenthouseStatus]} /></td>
                  <td className="px-4 py-3">{p.max_guests}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-muted transition" title="Edit"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {penthouses.length === 0 && (
          <p className="text-center py-8 text-sm text-foreground/60">No penthouses yet — add your first one</p>
        )}
      </div>

      {showForm && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setShowForm(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-background border rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-semibold text-lg mb-4">{editing ? "Edit Penthouse" : "Add Penthouse"}</h3>
              <div className="space-y-4">
                <input placeholder="Name*" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
                <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
                <div className="grid grid-cols-3 gap-3">
                  <input type="number" placeholder="Price" value={form.price_per_night || ""} onChange={(e) => setForm({ ...form, price_per_night: Number(e.target.value) })}
                    className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
                  <input type="number" placeholder="Guests" value={form.max_guests || ""} onChange={(e) => setForm({ ...form, max_guests: Number(e.target.value) })}
                    className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as PenthouseStatus })}
                    className="rounded-xl border px-4 py-3 bg-transparent outline-none text-sm">
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Bedrooms" value={form.bedrooms || ""} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
                    className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
                  <input type="number" placeholder="Bathrooms" value={form.bathrooms || ""} onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
                    className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
                </div>
                <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm resize-none" />
                <input placeholder="Amenities (comma separated)" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
                <input placeholder="Rules (comma separated)" value={form.rules} onChange={(e) => setForm({ ...form, rules: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />

                <div>
                  <label className="text-sm font-medium mb-1 block">Property Images</label>
                  {imageUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {imageUrls.map((url, i) => (
                        <div key={i} className="relative group">
                          <img src={url} alt="" className="w-20 h-20 rounded-lg object-cover" />
                          <button
                            type="button"
                            onClick={() => setImageUrls((prev) => prev.filter((_, j) => j !== i))}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <label className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted/30 transition block">
                    <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
                    <Upload size={24} className="mx-auto text-foreground/40 mb-2" />
                    <p className="text-sm text-foreground/60">{uploading ? "Uploading..." : "Click or drag to upload images"}</p>
                    <p className="text-xs text-foreground/40 mt-1">Max 10MB per image</p>
                  </label>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={handleSave} disabled={createPenthouse.isPending || updatePenthouse.isPending} className="flex-1 btn-primary justify-center text-sm py-2 disabled:opacity-50">
                  {editing ? "Update" : "Add"} Penthouse
                </button>
                <button onClick={() => setShowForm(false)} className="flex-1 border rounded-full py-2 text-sm hover:bg-muted transition">Cancel</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
