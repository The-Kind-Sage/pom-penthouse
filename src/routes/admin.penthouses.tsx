import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { type Penthouse, type PenthouseStatus } from "@/lib/admin-types";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
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
  const [penthouses, setPenthouses] = useState<Penthouse[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Penthouse | null>(null);
  const [form, setForm] = useState({ name: "", location: "", pricePerNight: 0, description: "", maxGuests: 0, bedrooms: 0, bathrooms: 0, status: "available" as PenthouseStatus, amenities: "", rules: "" });

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", location: "", pricePerNight: 0, description: "", maxGuests: 0, bedrooms: 0, bathrooms: 0, status: "available", amenities: "", rules: "" });
    setShowForm(true);
  };

  const openEdit = (p: Penthouse) => {
    setEditing(p);
    setForm({ name: p.name, location: p.location, pricePerNight: p.pricePerNight, description: p.description, maxGuests: p.maxGuests, bedrooms: p.bedrooms, bathrooms: p.bathrooms, status: p.status, amenities: p.amenities.join(", "), rules: p.rules.join(", ") });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) { toast.error("Name is required"); return; }
    if (editing) {
      setPenthouses((prev) => prev.map((p) => p.id === editing.id ? { ...p, ...form, amenities: form.amenities.split(",").map((s) => s.trim()), rules: form.rules.split(",").map((s) => s.trim()) } : p));
      toast.success("Penthouse updated");
    } else {
      const newP: Penthouse = { id: `p${Date.now()}`, ...form, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", amenities: form.amenities.split(",").map((s) => s.trim()), rules: form.rules.split(",").map((s) => s.trim()), images: [], createdAt: new Date().toISOString() };
      setPenthouses((prev) => [...prev, newP]);
      toast.success("Penthouse added");
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setPenthouses((prev) => prev.filter((p) => p.id !== id));
    toast.success("Penthouse removed");
  };

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

      <div className="bg-paper border rounded-xl overflow-hidden">
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
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-foreground/60">{p.location}</td>
                  <td className="px-4 py-3">${p.pricePerNight}</td>
                  <td className="px-4 py-3"><Badge label={p.status} style={statusStyles[p.status]} /></td>
                  <td className="px-4 py-3">{p.maxGuests}</td>
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
            <div className="bg-paper border rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-semibold text-lg mb-4">{editing ? "Edit Penthouse" : "Add Penthouse"}</h3>
              <div className="space-y-4">
                <input placeholder="Name*" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
                <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
                <div className="grid grid-cols-3 gap-3">
                  <input type="number" placeholder="Price" value={form.pricePerNight || ""} onChange={(e) => setForm({ ...form, pricePerNight: Number(e.target.value) })}
                    className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
                  <input type="number" placeholder="Guests" value={form.maxGuests || ""} onChange={(e) => setForm({ ...form, maxGuests: Number(e.target.value) })}
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

                <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted/30 transition">
                  <Upload size={24} className="mx-auto text-foreground/40 mb-2" />
                  <p className="text-sm text-foreground/60">Drag & drop property images here</p>
                  <p className="text-xs text-foreground/40 mt-1">Max 10MB per image</p>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={handleSave} className="flex-1 btn-primary justify-center text-sm py-2">
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
