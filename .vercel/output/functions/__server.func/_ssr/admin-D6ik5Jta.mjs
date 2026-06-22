import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAdmin, t as adminStore } from "./admin-store-BHBSC3CO.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CalendarCheck, E as ChevronLeft, M as Bell, O as ChartColumn, T as ChevronRight, b as LayoutDashboard, h as Moon, j as Building2, l as Settings, n as Users, r as User, s as Sun, u as Search, v as Menu, y as LogOut } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-D6ik5Jta.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var navItems = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/admin/bookings",
		label: "Bookings",
		icon: CalendarCheck
	},
	{
		to: "/admin/penthouses",
		label: "Penthouses",
		icon: Building2
	},
	{
		to: "/admin/users",
		label: "Users",
		icon: Users
	},
	{
		to: "/admin/analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		to: "/admin/settings",
		label: "Settings",
		icon: Settings
	}
];
function AdminLayout() {
	const { sidebarOpen, isLoading, isAuthenticated, user } = useAdmin();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [theme, setTheme] = (0, import_react.useState)("light");
	const [notifOpen, setNotifOpen] = (0, import_react.useState)(false);
	const [profileOpen, setProfileOpen] = (0, import_react.useState)(false);
	const location = useLocation();
	const navigate = useNavigate();
	const isLoginPage = location.pathname === "/admin/login";
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") adminStore.init();
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);
	(0, import_react.useEffect)(() => {
		if (!isLoading && !isLoginPage && !isAuthenticated) navigate({ to: "/admin/login" });
	}, [
		isLoading,
		isAuthenticated,
		isLoginPage,
		navigate
	]);
	const toggleTheme = () => {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		localStorage.setItem("pom-admin-theme", next);
	};
	const isActive = (item) => {
		if (item.exact) return location.pathname === item.to;
		return location.pathname.startsWith(item.to);
	};
	if (isLoginPage) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-foreground/60",
			children: "Loading..."
		})
	});
	if (!isAuthenticated) return null;
	const initials = user?.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "A";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground flex",
		children: [
			mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 bg-black/50 lg:hidden",
				onClick: () => setMobileOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `fixed lg:sticky top-0 left-0 z-50 h-screen bg-paper border-r transition-all duration-300 flex flex-col ${sidebarOpen ? "w-64" : "w-0 lg:w-16 overflow-hidden"} ${mobileOpen ? "w-64" : "-translate-x-full lg:translate-x-0"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between h-16 px-4 border-b shrink-0",
						children: [sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-display text-xl tracking-tight",
							children: "Pom Admin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								adminStore.toggleSidebar();
								setMobileOpen(false);
							},
							className: "p-1.5 rounded-lg hover:bg-muted transition",
							children: sidebarOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 18 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 py-4 space-y-1 px-2 overflow-y-auto",
						children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							onClick: () => setMobileOpen(false),
							className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${isActive(item) ? "bg-primary text-primary-foreground font-medium" : "text-foreground/70 hover:bg-muted hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { size: 18 }), sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 border-t shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => adminStore.logout(),
							className: `flex items-center gap-3 text-sm text-foreground/60 hover:text-foreground transition ${sidebarOpen ? "" : "justify-center"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 18 }), sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Logout" })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "h-16 border-b bg-paper flex items-center justify-between px-4 lg:px-6 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "lg:hidden p-2",
							onClick: () => setMobileOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 16,
								className: "text-foreground/40"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Search...",
								className: "bg-transparent outline-none w-40 lg:w-60"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: toggleTheme,
								className: "p-2 rounded-lg hover:bg-muted transition",
								children: theme === "light" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { size: 18 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setNotifOpen(!notifOpen),
									className: "p-2 rounded-lg hover:bg-muted transition relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" })]
								}), notifOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fixed inset-0 z-10",
									onClick: () => setNotifOpen(false)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute right-0 top-full mt-2 w-72 bg-paper border rounded-xl shadow-lg z-20 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-4 py-2 text-sm font-medium border-b",
										children: "Notifications"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-4 py-6 text-sm text-foreground/40 text-center",
										children: "No notifications"
									})]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setProfileOpen(!profileOpen),
									className: "flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium",
										children: initials
									})
								}), profileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fixed inset-0 z-10",
									onClick: () => setProfileOpen(false)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute right-0 top-full mt-2 w-48 bg-paper border rounded-xl shadow-lg z-20 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "px-4 py-2 text-sm border-b",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium",
												children: user?.name || "Admin"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-foreground/60",
												children: user?.email || ""
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 14 }), " Profile"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => adminStore.logout(),
											className: "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-red-500",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 14 }), " Logout"]
										})
									]
								})] })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 overflow-y-auto p-4 lg:p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			})
		]
	});
}
//#endregion
export { AdminLayout as component };
