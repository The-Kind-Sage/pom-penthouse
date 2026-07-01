import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useRoomTypes, useCreateRoomType, useUpdateRoomType, useDeleteRoomType } from "@/lib/hooks";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, BedDouble, Copy } from "lucide-react";

export const Route = createFileRoute("/admin/rooms")({
  component: RoomsPage,
});

interface RoomForm {
  name: string;
  price: number;
  max_guests: number;
  description: string;
}

const EMPTY_FORM: RoomForm = { name: "", price: 0, max_guests: 1, description: "" };

function RoomsPage() {
  const { data: roomTypes, isLoading } = useRoomTypes();
  const createType = useCreateRoomType();
  const updateType = useUpdateRoomType();
  const deleteType = useDeleteRoomType();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<RoomForm>(EMPTY_FORM);
  const [bulkMode, setBulkMode] = useState(false);
  const [form2, setForm2] = useState<RoomForm>(EMPTY_FORM);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setForm2(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
    setBulkMode(false);
  };

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setForm2(EMPTY_FORM);
    setEditingId(null);
    setBulkMode(false);
    setShowForm(true);
  };

  const openBulkCreate = () => {
    setForm(EMPTY_FORM);
    setForm2(EMPTY_FORM);
    setEditingId(null);
    setBulkMode(true);
    setShowForm(true);
  };

  const openEdit = (room: any) => {
    setForm({ name: room.name, price: room.price, max_guests: room.max_guests, description: room.description || "" });
    setEditingId(room.id);
    setBulkMode(false);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error("Name is required");
    try {
      if (editingId) {
        await updateType.mutateAsync({ id: editingId, ...form });
        toast.success("Room type updated");
      } else {
        await createType.mutateAsync(form);
        toast.success("Room type added");
      }
      resetForm();
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleBulkSave = async () => {
    if (!form.name.trim()) return toast.error("First room name is required");
    if (!form2.name.trim()) return toast.error("Second room name is required");
    try {
      await Promise.all([
        createType.mutateAsync(form),
        createType.mutateAsync(form2),
      ]);
      toast.success("2 room types added");
      resetForm();
    } catch {
      toast.error("Failed to save rooms");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await deleteType.mutateAsync(id);
      toast.success("Room type deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const RoomFormCard = ({ f, setF, label }: { f: RoomForm; setF: (v: RoomForm) => void; label: string }) => (
    <div className="border rounded-xl p-4 space-y-3 bg-muted/30">
      {bulkMode && <p className="text-xs font-medium text-gold uppercase tracking-wider">{label}</p>}
      <div>
        <label className="text-sm font-medium mb-1 block">Name *</label>
        <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })}
          placeholder="e.g. Single Bed Room"
          className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Price/Night ($)</label>
          <input type="number" min={0} value={f.price} onChange={(e) => setF({ ...f, price: Number(e.target.value) })}
            className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Max Guests</label>
          <input type="number" min={1} max={10} value={f.max_guests} onChange={(e) => setF({ ...f, max_guests: Number(e.target.value) })}
            className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Description</label>
        <textarea rows={2} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })}
          placeholder="Optional description..."
          className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm resize-none" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Rooms</h1>
          <p className="text-sm text-foreground/60">Manage room types (Single Bed, Double Bed, Twin Bed)</p>
        </div>
        <div className="flex gap-2">
          <button onClick={openBulkCreate} className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
            <Copy className="size-4" /> Add Two Rooms
          </button>
          <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Add Room Type
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-background border rounded-xl p-6 space-y-4 max-w-2xl">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">
              {editingId ? "Edit Room Type" : bulkMode ? "Add Two Room Types" : "New Room Type"}
            </h3>
            <button onClick={resetForm} className="p-1 hover:bg-muted rounded-lg"><X className="size-4" /></button>
          </div>

          {bulkMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RoomFormCard f={form} setF={setForm} label="Room 1" />
              <RoomFormCard f={form2} setF={setForm2} label="Room 2" />
            </div>
          ) : (
            <RoomFormCard f={form} setF={setForm} label="" />
          )}

          <div className="flex gap-3">
            <button onClick={resetForm} className="px-4 py-2 text-sm border rounded-lg hover:bg-muted">Cancel</button>
            <button onClick={bulkMode ? handleBulkSave : handleSave}
              disabled={createType.isPending || updateType.isPending}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50">
              {editingId ? "Update" : bulkMode ? "Create Both" : "Create"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-background border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading...</div>
        ) : !roomTypes?.length ? (
          <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
            <BedDouble className="size-10" />
            <p className="text-sm">No room types yet. Add one above.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Price/Night</th>
                <th className="text-left px-4 py-3 font-medium">Max Guests</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roomTypes.map((room) => (
                <tr key={room.id} className="border-b last:border-b-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{room.name}</td>
                  <td className="px-4 py-3">${room.price}</td>
                  <td className="px-4 py-3">{room.max_guests}</td>
                  <td className="px-4 py-3 text-muted-foreground">{room.description || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(room)} className="p-1.5 hover:bg-muted rounded-lg mr-1">
                      <Pencil className="size-4" />
                    </button>
                    <button onClick={() => handleDelete(room.id, room.name)} className="p-1.5 hover:bg-red-500/10 text-red-500 rounded-lg">
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
