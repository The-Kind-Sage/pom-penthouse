import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useBookings } from "./hooks-jthhuE6S.mjs";
import { a as CartesianGrid, c as Cell, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Bar, r as YAxis, s as Pie, t as PieChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.analytics-B9WJxXrk.js
var import_jsx_runtime = require_jsx_runtime();
var COLORS = [
	"#C9A86C",
	"#3A6B7C",
	"#E8DCC6",
	"#1A1A1A"
];
function AnalyticsPage() {
	const { data: bookings = [], isLoading } = useBookings();
	const monthlyData = (() => {
		const map = {};
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		months.forEach((m) => {
			map[m] = {
				revenue: 0,
				bookings: 0
			};
		});
		bookings.forEach((b) => {
			const m = months[new Date(b.created_at).getMonth()];
			if (m && b.status === "confirmed") {
				map[m].revenue += b.total;
				map[m].bookings += 1;
			}
		});
		return months.map((m) => ({
			month: m,
			...map[m]
		}));
	})();
	const statusData = (() => {
		const map = {};
		bookings.forEach((b) => {
			map[b.status] = (map[b.status] || 0) + 1;
		});
		return Object.entries(map).map(([name, value]) => ({
			name,
			value
		}));
	})();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20 text-sm text-foreground/60",
		children: "Loading analytics..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold",
			children: "Analytics"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-foreground/60",
			children: "Deep dive into performance metrics"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-2 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-paper border rounded-xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium mb-4",
					children: "Monthly Revenue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72",
					children: monthlyData.some((d) => d.revenue > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: monthlyData,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--border)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "month",
									tick: { fontSize: 12 },
									stroke: "var(--border)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: { fontSize: 12 },
									stroke: "var(--border)",
									tickFormatter: (v) => `रू${(v / 1e3).toFixed(0)}k`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										borderRadius: 12,
										border: "1px solid var(--border)"
									},
									formatter: (v) => [`रू${v.toLocaleString("en-IN")}`, "Revenue"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "revenue",
									fill: "var(--gold)",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center h-full text-sm text-foreground/40",
						children: "No revenue data yet"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-paper border rounded-xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium mb-4",
					children: "Bookings by Status"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-72",
					children: [statusData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
							data: statusData,
							cx: "50%",
							cy: "50%",
							innerRadius: 60,
							outerRadius: 100,
							paddingAngle: 4,
							dataKey: "value",
							children: statusData.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
							borderRadius: 12,
							border: "1px solid var(--border)"
						} })] })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center h-full text-sm text-foreground/40",
						children: "No booking data yet"
					}), statusData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-3 justify-center mt-2 text-xs",
						children: statusData.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-2.5 h-2.5 rounded-full",
								style: { background: COLORS[i % COLORS.length] }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								d.name,
								": ",
								d.value
							] })]
						}, d.name))
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { AnalyticsPage as component };
