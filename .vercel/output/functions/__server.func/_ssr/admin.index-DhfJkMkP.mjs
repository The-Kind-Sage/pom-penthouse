import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as CalendarCheck, C as DollarSign, _ as MessageCircle, f as Percent } from "../_libs/lucide-react.mjs";
import { n as useBookingStats, r as useBookings, t as useActivities } from "./hooks-BYi8XGEx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-DhfJkMkP.js
var import_jsx_runtime = require_jsx_runtime();
function MetricCard({ label, value, trend, icon: Icon, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-paper border rounded-xl p-5 flex items-start justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-foreground/60",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xl font-semibold mt-1",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-foreground/40 mt-2 inline-block",
				children: trend
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `p-3 rounded-xl bg-muted ${color}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 22 })
		})]
	});
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
			icon: DollarSign,
			color: "text-emerald-500"
		},
		{
			label: "Active Bookings",
			value: String(stats?.confirmedBookings || 0),
			trend: `${stats?.totalBookings || 0} total`,
			icon: CalendarCheck,
			color: "text-blue-500"
		},
		{
			label: "Pending Bookings",
			value: String(stats?.pendingBookings || 0),
			trend: "Awaiting confirmation",
			icon: MessageCircle,
			color: "text-amber-500"
		},
		{
			label: "Total Bookings",
			value: String(stats?.totalBookings || 0),
			trend: "All time",
			icon: Percent,
			color: "text-rose-500"
		}
	];
	const activityColors = {
		booking: "bg-blue-500",
		payment: "bg-emerald-500",
		review: "bg-amber-500",
		user: "bg-purple-500"
	};
	function timeAgo(dateStr) {
		const diff = Date.now() - new Date(dateStr).getTime();
		const mins = Math.floor(diff / 6e4);
		if (mins < 1) return "Just now";
		if (mins < 60) return `${mins} min ago`;
		const hrs = Math.floor(mins / 60);
		if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
		const days = Math.floor(hrs / 24);
		return `${days} day${days > 1 ? "s" : ""} ago`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-foreground/60",
				children: "Overview of your penthouse business"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: metrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, { ...m }, m.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-paper border rounded-xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium mb-4",
					children: "Recent Activity"
				}), activities.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center py-12 text-sm text-foreground/40",
					children: "No recent activity"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-0 divide-y",
					children: activities.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-2 h-2 rounded-full mt-2 shrink-0 ${activityColors[a.type || "booking"] || "bg-gray-400"}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: a.action
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-foreground/60",
									children: a.detail
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-foreground/40 shrink-0",
								children: timeAgo(a.created_at)
							})
						]
					}, a.id))
				})]
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
