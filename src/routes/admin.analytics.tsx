import { createFileRoute } from "@tanstack/react-router";
import { useBookings } from "@/lib/hooks";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsPage,
});

const COLORS = ["#C9A86C", "#3A6B7C", "#E8DCC6", "#1A1A1A"];

function AnalyticsPage() {
  const { data: bookings = [], isLoading } = useBookings();

  const monthlyData = (() => {
    const map: Record<string, { revenue: number; bookings: number }> = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    months.forEach((m) => { map[m] = { revenue: 0, bookings: 0 }; });
    bookings.forEach((b) => {
      const d = new Date(b.created_at);
      const m = months[d.getMonth()];
      if (m && b.status === "confirmed") {
        map[m].revenue += b.total;
        map[m].bookings += 1;
      }
    });
    return months.map((m) => ({ month: m, ...map[m] }));
  })();

  const statusData = (() => {
    const map: Record<string, number> = {};
    bookings.forEach((b) => { map[b.status] = (map[b.status] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  })();

  if (isLoading) {
    return <div className="flex items-center justify-center py-20 text-sm text-foreground/60">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-foreground/60">Deep dive into performance metrics</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-background border rounded-xl p-5">
          <h3 className="font-medium mb-4">Monthly Revenue</h3>
          <div className="h-72">
            {monthlyData.some((d) => d.revenue > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--border)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--border)" tickFormatter={(v) => `रू${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} formatter={(v: number) => [`रू${v.toLocaleString("en-IN")}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="var(--gold)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-foreground/40">No revenue data yet</div>
            )}
          </div>
        </div>

        <div className="bg-background border rounded-xl p-5">
          <h3 className="font-medium mb-4">Bookings by Status</h3>
          <div className="h-72">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                    {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-foreground/40">No booking data yet</div>
            )}
            {statusData.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center mt-2 text-xs">
                {statusData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    <span>{d.name}: {d.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
