import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as DollarSign, _ as MessageCircle, f as Percent, k as CalendarCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-CbxeKcNI.js
var import_jsx_runtime = require_jsx_runtime();
var metrics = [
	{
		label: "Total Revenue",
		value: "$0",
		trend: "Awaiting data",
		up: true,
		icon: DollarSign,
		color: "text-emerald-500"
	},
	{
		label: "Active Bookings",
		value: "0",
		trend: "No active bookings",
		up: true,
		icon: CalendarCheck,
		color: "text-blue-500"
	},
	{
		label: "Occupancy Rate",
		value: "--",
		trend: "Insufficient data",
		up: true,
		icon: Percent,
		color: "text-amber-500"
	},
	{
		label: "Pending Inquiries",
		value: "0",
		trend: "No inquiries",
		up: false,
		icon: MessageCircle,
		color: "text-rose-500"
	}
];
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
				className: "grid lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-paper border rounded-xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium mb-4",
						children: "Revenue Over Time"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64 flex items-center justify-center text-sm text-foreground/40",
						children: "No revenue data yet"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-paper border rounded-xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium mb-4",
						children: "Monthly Bookings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64 flex items-center justify-center text-sm text-foreground/40",
						children: "No booking data yet"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-paper border rounded-xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium mb-4",
					children: "Recent Activity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center py-12 text-sm text-foreground/40",
					children: "No recent activity"
				})]
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
