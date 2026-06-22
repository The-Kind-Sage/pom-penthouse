import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useBookings, useUpdateBooking } from "@/lib/hooks";
import { type Booking, type BookingStatus, type PaymentStatus } from "@/lib/admin-types";
import { Check, X, Download, Search, Eye } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/bookings")({
  component: BookingsPage,
});

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  declined: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  cancelled: "bg-stone-100 text-stone-600 dark:bg-stone-900/30 dark:text-stone-400",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

const paymentStyles: Record<PaymentStatus, string> = {
  paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  unpaid: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  refunded: "bg-stone-100 text-stone-600 dark:bg-stone-900/30 dark:text-stone-400",
};

function Badge({ label, style }: { label: string; style: string }) {
  return <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${style}`}>{label}</span>;
}

function BookingsPage() {
  const { data: bookings = [], isLoading } = useBookings();
  const updateBooking = useUpdateBooking();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filtered = bookings.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (search && !b.guest_name.toLowerCase().includes(search.toLowerCase()) && !(b.penthouse_name || "").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleUpdateStatus = async (id: string, status: BookingStatus) => {
    try {
      await updateBooking.mutateAsync({ id, status });
      toast.success(`Booking ${status}`);
    } catch {
      toast.error("Failed to update booking");
    }
  };

  const downloadCSV = () => {
    if (filtered.length === 0) { toast.error("No bookings to export"); return; }
    const headers = "ID,Guest,Penthouse,Check-in,Check-out,Total,Status\n";
    const rows = filtered.map((b) => `${b.id},${b.guest_name},${b.penthouse_name || ""},${b.check_in},${b.check_out},${b.total},${b.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "bookings.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Bookings exported");
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-20 text-sm text-foreground/60">Loading bookings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Bookings</h1>
          <p className="text-sm text-foreground/60">Manage all reservations</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={downloadCSV} className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2 hover:bg-muted transition">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 text-sm flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="text-foreground/40" />
          <input placeholder="Search guest or penthouse..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none w-full" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as BookingStatus | "all")}
          className="border rounded-lg px-3 py-2 text-sm bg-transparent outline-none">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-paper border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium">Guest</th>
                <th className="text-left px-4 py-3 font-medium">Penthouse</th>
                <th className="text-left px-4 py-3 font-medium">Check-in</th>
                <th className="text-left px-4 py-3 font-medium">Check-out</th>
                <th className="text-left px-4 py-3 font-medium">Total</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Payment</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30 transition">
                  <td className="px-4 py-3">
                    <p className="font-medium">{b.guest_name}</p>
                    <p className="text-xs text-foreground/60">{b.guest_email}</p>
                  </td>
                  <td className="px-4 py-3">{b.penthouse_name}</td>
                  <td className="px-4 py-3">{b.check_in}</td>
                  <td className="px-4 py-3">{b.check_out}</td>
                  <td className="px-4 py-3">रू{b.total.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3"><Badge label={b.status} style={statusStyles[b.status as BookingStatus]} /></td>
                  <td className="px-4 py-3"><Badge label={b.payment_status} style={paymentStyles[b.payment_status as PaymentStatus]} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedBooking(b)} className="p-1.5 rounded-lg hover:bg-muted transition" title="View"><Eye size={15} /></button>
                      {b.status === "pending" && (
                        <>
                          <button onClick={() => handleUpdateStatus(b.id, "confirmed")} className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-600 transition" title="Approve"><Check size={15} /></button>
                          <button onClick={() => handleUpdateStatus(b.id, "declined")} className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition" title="Decline"><X size={15} /></button>
                        </>
                      )}
                      {b.status === "confirmed" && (
                        <button onClick={() => handleUpdateStatus(b.id, "cancelled")} className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition" title="Cancel"><X size={15} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-8 text-sm text-foreground/60">No bookings yet</p>
        )}
      </div>

      {selectedBooking && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setSelectedBooking(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-paper border rounded-2xl p-6 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedBooking.guest_name}</h3>
                  <p className="text-sm text-foreground/60">{selectedBooking.guest_email}</p>
                </div>
                <Badge label={selectedBooking.status} style={statusStyles[selectedBooking.status]} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-foreground/60">Penthouse</span><span>{selectedBooking.penthouse_name}</span></div>
                <div className="flex justify-between"><span className="text-foreground/60">Check-in</span><span>{selectedBooking.check_in}</span></div>
                <div className="flex justify-between"><span className="text-foreground/60">Check-out</span><span>{selectedBooking.check_out}</span></div>
                <div className="flex justify-between"><span className="text-foreground/60">Nights</span><span>{selectedBooking.nights}</span></div>
                <div className="flex justify-between"><span className="text-foreground/60">Guests</span><span>{selectedBooking.guests}</span></div>
                <div className="flex justify-between font-medium border-t pt-2 mt-2"><span>Total</span><span>रू{selectedBooking.total.toLocaleString("en-IN")}</span></div>
              </div>
              <div className="flex gap-2 mt-4">
                {selectedBooking.status === "pending" && (
                  <>
                    <button onClick={() => { handleUpdateStatus(selectedBooking.id, "confirmed"); setSelectedBooking(null); }} className="flex-1 btn-primary justify-center text-sm py-2">Approve</button>
                    <button onClick={() => { handleUpdateStatus(selectedBooking.id, "declined"); setSelectedBooking(null); }} className="flex-1 border rounded-full py-2 text-sm hover:bg-muted transition">Decline</button>
                  </>
                )}
                <button onClick={() => setSelectedBooking(null)} className="flex-1 border rounded-full py-2 text-sm hover:bg-muted transition">Close</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
