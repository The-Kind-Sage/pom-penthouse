import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as Search } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users-ayf5YwqV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var roleStyles = {
	admin: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
	staff: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
	guest: "bg-stone-100 text-stone-600 dark:bg-stone-900/30 dark:text-stone-400"
};
function Badge({ label, style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-block text-xs px-2 py-1 rounded-full font-medium ${style}`,
		children: label
	});
}
function UsersPage() {
	const [users, setUsers] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const filtered = users.filter((u) => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
	const updateRole = (id, role) => {
		setUsers((prev) => prev.map((u) => u.id === id ? {
			...u,
			role
		} : u));
		toast.success(`Role updated to ${role}`);
	};
	const toggleBan = (id) => {
		setUsers((prev) => prev.map((u) => u.id === id ? {
			...u,
			banned: !u.banned
		} : u));
		toast.success("User status updated");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between flex-wrap gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold",
					children: "Users"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-foreground/60",
					children: "Manage guests and staff accounts"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 text-sm max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					size: 16,
					className: "text-foreground/40"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					placeholder: "Search users...",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "bg-transparent outline-none w-full"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-paper border rounded-xl overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b bg-muted/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Role"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Bookings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Lifetime Spend"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y",
							children: filtered.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: `hover:bg-muted/30 transition ${u.banned ? "opacity-50" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-medium",
										children: u.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-foreground/60",
										children: u.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: u.role,
											onChange: (e) => updateRole(u.id, e.target.value),
											className: `text-xs px-2 py-1 rounded-full font-medium border-0 bg-transparent outline-none cursor-pointer ${roleStyles[u.role]}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "guest",
													children: "Guest"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "staff",
													children: "Staff"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "admin",
													children: "Admin"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: u.bookingCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3",
										children: ["$", u.lifetimeSpend.toLocaleString()]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											label: u.banned ? "Banned" : "Active",
											style: u.banned ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => toggleBan(u.id),
											className: `text-xs px-3 py-1.5 rounded-lg border transition ${u.banned ? "text-emerald-600 border-emerald-200 hover:bg-emerald-50" : "text-red-600 border-red-200 hover:bg-red-50"}`,
											children: u.banned ? "Unban" : "Ban"
										})
									})
								]
							}, u.id))
						})]
					})
				}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center py-8 text-sm text-foreground/60",
					children: "No users yet"
				})]
			})
		]
	});
}
//#endregion
export { UsersPage as component };
