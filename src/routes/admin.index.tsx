import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, CalendarCheck, Percent, MessageCircle } from "lucide-react";
import { useBookingStats, useBookings, useActivities } from "@/lib/hooks";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function MetricCard({ label, value, trend, icon: Icon, color }: {
  label: string; value: string; trend: string;
  icon: any; color: string;
}) {
  return (
    <div className="bg-background border rounded-xl p-5 flex items-start justify-between">
      <div>
        <p className="text-sm text-foreground/60">{label}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        <span className="text-xs text-foreground/40 mt-2 inline-block">{trend}</span>
      </div>
      <div className={`p-3 rounded-xl bg-muted ${color}`}>
        <Icon size={22} />
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useBookingStats();
  const { data: bookings = [] } = useBookings();
  const { data: activities = [] } = useActivities(10);

  const metrics = [
    {
      label: "Total Revenue",
      value: `रू ${(stats?.totalRevenue || 0).toLocaleString("en-IN")}`,
      trend: `${stats?.confirmedBookings || 0} confirmed bookings`,
      icon: DollarSign, color: "text-emerald-500",
    },
    {
      label: "Active Bookings",
      value: String(stats?.confirmedBookings || 0),
      trend: `${stats?.totalBookings || 0} total`,
      icon: CalendarCheck, color: "text-blue-500",
    },
    {
      label: "Pending Bookings",
      value: String(stats?.pendingBookings || 0),
      trend: "Awaiting confirmation",
      icon: MessageCircle, color: "text-amber-500",
    },
    {
      label: "Total Bookings",
      value: String(stats?.totalBookings || 0),
      trend: "All time",
      icon: Percent, color: "text-rose-500",
    },
  ];

  const activityColors: Record<string, string> = {
    booking: "bg-blue-500",
    payment: "bg-emerald-500",
    review: "bg-amber-500",
    user: "bg-purple-500",
  };

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-foreground/60">Overview of your penthouse business</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => <MetricCard key={m.label} {...m} />)}
      </div>

      <div className="bg-background border rounded-xl p-5">
        <h3 className="font-medium mb-4">Recent Activity</h3>
        {activities.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-sm text-foreground/40">
            No recent activity
          </div>
        ) : (
          <div className="space-y-0 divide-y">
            {activities.map((a) => (
              <div key={a.id} className="flex items-start gap-3 py-3">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${activityColors[a.type || "booking"] || "bg-gray-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{a.action}</p>
                  <p className="text-xs text-foreground/60">{a.detail}</p>
                </div>
                <span className="text-xs text-foreground/40 shrink-0">{timeAgo(a.created_at)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
