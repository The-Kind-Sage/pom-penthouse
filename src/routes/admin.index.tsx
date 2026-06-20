import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, CalendarCheck, Percent, MessageCircle } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const metrics = [
  { label: "Total Revenue", value: "$0", trend: "Awaiting data", up: true, icon: DollarSign, color: "text-emerald-500" },
  { label: "Active Bookings", value: "0", trend: "No active bookings", up: true, icon: CalendarCheck, color: "text-blue-500" },
  { label: "Occupancy Rate", value: "--", trend: "Insufficient data", up: true, icon: Percent, color: "text-amber-500" },
  { label: "Pending Inquiries", value: "0", trend: "No inquiries", up: false, icon: MessageCircle, color: "text-rose-500" },
];

function MetricCard({ label, value, trend, icon: Icon, color }: typeof metrics[0]) {
  return (
    <div className="bg-paper border rounded-xl p-5 flex items-start justify-between">
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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-foreground/60">Overview of your penthouse business</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => <MetricCard key={m.label} {...m} />)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Revenue Over Time</h3>
          <div className="h-64 flex items-center justify-center text-sm text-foreground/40">
            No revenue data yet
          </div>
        </div>

        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Monthly Bookings</h3>
          <div className="h-64 flex items-center justify-center text-sm text-foreground/40">
            No booking data yet
          </div>
        </div>
      </div>

      <div className="bg-paper border rounded-xl p-5">
        <h3 className="font-medium mb-4">Recent Activity</h3>
        <div className="flex items-center justify-center py-12 text-sm text-foreground/40">
          No recent activity
        </div>
      </div>
    </div>
  );
}
