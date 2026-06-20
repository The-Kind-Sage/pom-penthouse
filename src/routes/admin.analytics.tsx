import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-foreground/60">Deep dive into performance metrics</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Revenue Trend</h3>
          <div className="h-72 flex items-center justify-center text-sm text-foreground/40">
            No revenue data yet
          </div>
        </div>

        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Occupancy by Property</h3>
          <div className="h-72 flex items-center justify-center text-sm text-foreground/40">
            No occupancy data yet
          </div>
        </div>

        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Revenue Breakdown</h3>
          <div className="h-72 flex items-center justify-center text-sm text-foreground/40">
            No breakdown data yet
          </div>
        </div>

        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Monthly Bookings</h3>
          <div className="h-72 flex items-center justify-center text-sm text-foreground/40">
            No booking data yet
          </div>
        </div>
      </div>
    </div>
  );
}
