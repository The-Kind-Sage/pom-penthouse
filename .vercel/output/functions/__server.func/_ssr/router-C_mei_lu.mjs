import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C_mei_lu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-laqxiwve.css";
var favicon_32x32_default = "data:image/png;base64,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";
var favicon_16x16_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACV0lEQVR4ATySP09UQRTFf/N2QcWERnGhlQZxTeRPA81SUSwFQkGQhGCFXwFDQkcNFCRIJaVaSYUQSFwTDDFCsKEnECMQCtdGxL2eO+8tszP3zZx7zrlz39vErDZnZn+sVjPTtPrQ2Y++bnA/+Eo50thcAsxqNULAAmC+PAQhvtcKWj79GTznBxrFn02MILEAJTWjnhA4vzinUvlE5XOFs7OfImiaqUDG0jaYNSaqq0x9GsfHx4yOjtLW2kapNMBAqUShtZVnw8MyvciIMtH0QrpBhsnx+u81z8fH6enpZWt7i8vLS46OjiiXy3xYX2dychJcqHuKrgjJTUsB8g15dr/sMv1ymomJCaq/qnR0dLC0uBR1m5ubVH9X0zbkIAm6Qb0JIZEGiwsL6vuMey33RTZyuXyslsvlaMjniSPESJJqJNYrFZt/tRpv1tZof9jO3aYmHH7/7m1kj4yMcOv2HVzjeqnQS/SzjrGXwMG3fX6cntKr97C6uspQeYiZVzN0Pe1ieXkZH0b6k4rEAa+MbA3Y3tlRGrq6u+nv72dsbIyNjY/sfd2jpaVFjPp0OZmBKx3Xd94/2PcdhcIDio+LTE29YHBwUL03ROMAKkUcfo/0BvrjOBKUOj050TbQ3NysJwRvTcbEoUqaEPAR9JSB+6RNIHIICS4qFAr4C3SieQEJgx88ZHv3TeqY4654vbLC4eF3+vr63E/pQPzQwYsoCBHgEfeVQbhCjp52xaPOTp4UiyIIzPhYukmjcGUjH65kYPMW7CpiBNzVgxEyTprxaB6yZQTXzP8HAAD//4em+KcAAAAGSURBVAMAEN38yTmbTjcAAAAASUVORK5CYII=";
var favicon_default = "/assets/favicon-Cn5BUlJ-.ico";
var apple_touch_icon_default = "/assets/apple-touch-icon-DUcAwrjZ.png";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: favicon_default
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: favicon_32x32_default
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: favicon_16x16_default
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: apple_touch_icon_default
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$8 = () => import("./admin-DwHR33_q.mjs");
var Route$8 = createFileRoute("/admin")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	ssr: false,
	beforeLoad: ({ location }) => {
		if (location.pathname === "/admin/login") return;
		if (!localStorage.getItem("pom-admin-auth")) throw redirect({ to: "/admin/login" });
	}
});
var $$splitComponentImporter$7 = () => import("./routes-DgkqjfV4.mjs");
var Route$7 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Pom PentHouse — Lakeside Sanctuary, Pokhara, Nepal" },
			{
				name: "description",
				content: "A luxury penthouse 180m from Phewa Lake, Pokhara. 3 beds, Annapurna views. Book a stay from $189/night."
			},
			{
				property: "og:title",
				content: "Pom PentHouse — Pokhara"
			},
			{
				property: "og:description",
				content: "A Lakeside Sanctuary — Pokhara, Nepal"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:image",
				content: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
			},
			{
				property: "og:url",
				content: "/"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}, {
			rel: "preload",
			as: "image",
			href: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80&auto=format&fit=crop"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin.index-CbxeKcNI.mjs");
var Route$6 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./admin.users-ayf5YwqV.mjs");
var Route$5 = createFileRoute("/admin/users")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.settings-BzZiOHRA.mjs");
var Route$4 = createFileRoute("/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.penthouses-D7gW4HIg.mjs");
var Route$3 = createFileRoute("/admin/penthouses")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.login-DUYOIojn.mjs");
var Route$2 = createFileRoute("/admin/login")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.bookings-GYh2DuVQ.mjs");
var Route$1 = createFileRoute("/admin/bookings")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.analytics-qLibFFcT.mjs");
var Route = createFileRoute("/admin/analytics")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var AdminRoute = Route$8.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$9
});
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AdminIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminUsersRoute = Route$5.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => AdminRoute
});
var AdminSettingsRoute = Route$4.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var AdminPenthousesRoute = Route$3.update({
	id: "/penthouses",
	path: "/penthouses",
	getParentRoute: () => AdminRoute
});
var AdminLoginRoute = Route$2.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRoute
});
var AdminBookingsRoute = Route$1.update({
	id: "/bookings",
	path: "/bookings",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminAnalyticsRoute: Route.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => AdminRoute
	}),
	AdminBookingsRoute,
	AdminLoginRoute,
	AdminPenthousesRoute,
	AdminSettingsRoute,
	AdminUsersRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren)
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
