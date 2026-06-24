import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useApartmentTypes, useCreateApartmentType, useUpdateApartmentType, useDeleteApartmentType } from "@/lib/hooks";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Building } from "lucide-react";

export const Route = createFileRoute("/admin/apartments")({
  component: ApartmentsPage,
});

interface AptForm {
  name: string;
  price: number;
  max_guests: number;
  bedrooms: number;
  description: string;
}

const EMPTY_FORM: AptForm = { name: "", price: 0, max_guests: 2, bedrooms: 1, description: "" };

function ApartmentsPage() {
  const { data: aptTypes, isLoading } = useApartmentTypes();
  const createType = useCreateApartmentType();
  const updateType = useUpdateApartmentType();
  const deleteType = useDeleteApartmentType();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AptForm>(EMPTY_FORM);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (apt: any) => {
    setForm({ name: apt.name, price: apt.price, max_guests: apt.max_guests, bedrooms: apt.bedrooms, description: apt.description || "" });
    setEditingId(apt.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error("Name is required");
    try {
      if (editingId) {
        await updateType.mutateAsync({ id: editingId, ...form });
        toast.success("Apartment type updated");
      } else {
        await createType.mutateAsync(form);
        toast.success("Apartment type added");
      }
      resetForm();
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await deleteType.mutateAsync(id);
      toast.success("Apartment type deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Apartments</h1>
          <p className="text-sm text-foreground/60">Manage apartment types (1 BHK, 2 BHK, 3 BHK)</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          <Plus className="size-4" /> Add Apartment Type
        </button>
      </div>

      {showForm && (
        <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{editingId ? "Edit Apartment Type" : "New Apartment Type"}</h3>
            <button onClick={resetForm} className="p-1 hover:bg-muted rounded-lg"><X className="size-4" /></button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="1 BHK"
                className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Price/Night ($)</label>
                <input type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Max Guests</label>
                <input type="number" min={1} max={20} value={form.max_guests} onChange={(e) => setForm({ ...form, max_guests: Number(e.target.value) })}
                  className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Bedrooms</label>
                <input type="number" min={1} max={10} value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
                  className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Optional description..."
                className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm resize-none" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={resetForm} className="px-4 py-2 text-sm border rounded-lg hover:bg-muted">Cancel</button>
            <button onClick={handleSave} disabled={createType.isPending || updateType.isPending}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50">
              {editingId ? "Update" : "Create"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-background border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading...</div>
        ) : !aptTypes?.length ? (
          <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
            <Building className="size-10" />
            <p className="text-sm">No apartment types yet. Add one above.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Price/Night</th>
                <th className="text-left px-4 py-3 font-medium">Bedrooms</th>
                <th className="text-left px-4 py-3 font-medium">Max Guests</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {aptTypes.map((apt) => (
                <tr key={apt.id} className="border-b last:border-b-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{apt.name}</td>
                  <td className="px-4 py-3">${apt.price}</td>
                  <td className="px-4 py-3">{apt.bedrooms}</td>
                  <td className="px-4 py-3">{apt.max_guests}</td>
                  <td className="px-4 py-3 text-muted-foreground">{apt.description || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(apt)} className="p-1.5 hover:bg-muted rounded-lg mr-1">
                      <Pencil className="size-4" />
                    </button>
                    <button onClick={() => handleDelete(apt.id, apt.name)} className="p-1.5 hover:bg-red-500/10 text-red-500 rounded-lg">
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
