import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { type User, type UserRole } from "@/lib/admin-types";
import { Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
});

const roleStyles: Record<UserRole, string> = {
  admin: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  staff: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  guest: "bg-stone-100 text-stone-600 dark:bg-stone-900/30 dark:text-stone-400",
};

function Badge({ label, style }: { label: string; style: string }) {
  return <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${style}`}>{label}</span>;
}

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const updateRole = (id: string, role: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    toast.success(`Role updated to ${role}`);
  };

  const toggleBan = (id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, banned: !u.banned } : u)));
    toast.success("User status updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-foreground/60">Manage guests and staff accounts</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 text-sm max-w-sm">
        <Search size={16} className="text-foreground/40" />
        <input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none w-full" />
      </div>

      <div className="bg-paper border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Role</th>
                <th className="text-left px-4 py-3 font-medium">Bookings</th>
                <th className="text-left px-4 py-3 font-medium">Lifetime Spend</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((u) => (
                <tr key={u.id} className={`hover:bg-muted/30 transition ${u.banned ? "opacity-50" : ""}`}>
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-foreground/60">{u.email}</td>
                  <td className="px-4 py-3">
                    <select value={u.role} onChange={(e) => updateRole(u.id, e.target.value as UserRole)}
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 bg-transparent outline-none cursor-pointer ${roleStyles[u.role]}`}>
                      <option value="guest">Guest</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">{u.bookingCount}</td>
                  <td className="px-4 py-3">${u.lifetimeSpend.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Badge label={u.banned ? "Banned" : "Active"} style={u.banned ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"} />
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleBan(u.id)} className={`text-xs px-3 py-1.5 rounded-lg border transition ${u.banned ? "text-emerald-600 border-emerald-200 hover:bg-emerald-50" : "text-red-600 border-red-200 hover:bg-red-50"}`}>
                      {u.banned ? "Unban" : "Ban"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-8 text-sm text-foreground/60">No users yet</p>
        )}
      </div>
    </div>
  );
}
