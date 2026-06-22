import { o as __toESM } from "../_runtime.mjs";
import { t as createServerClient } from "../_libs/@supabase/ssr+[...].mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as require_cloudinary } from "../_libs/cloudinary+lodash.mjs";
import { t as Resend } from "../_libs/resend+standardwebhooks.mjs";
import { a as numberType, c as stringType, i as literalType, l as unknownType, n as booleanType, o as objectType, r as enumType, s as recordType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DqFgnw5j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_cloudinary = require_cloudinary();
var styles_default = "/assets/styles-Drk6X82H.css";
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
var Route$12 = createRootRouteWithContext()({
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
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$8 = () => import("./admin-B-gvZQJj.mjs");
var Route$11 = createFileRoute("/admin")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	ssr: false,
	beforeLoad: ({ location }) => {
		if (location.pathname === "/admin/login") return;
	}
});
var $$splitComponentImporter$7 = () => import("./routes-CJw8X63D.mjs");
var Route$10 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Pom PentHouse — Lakeside Sanctuary, Pokhara, Nepal" },
			{
				name: "description",
				content: "A luxury penthouse 180m from Phewa Lake, Pokhara. 3 beds, Annapurna views. Book a stay from रू25,500/night."
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
var $$splitComponentImporter$6 = () => import("./admin.index-I5H3HVMI.mjs");
var Route$9 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
import_cloudinary.v2.config({
	cloud_name: void 0,
	api_key: void 0,
	api_secret: void 0,
	secure: true
});
async function uploadImage(file, folder = "pom-penthouse") {
	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);
	return new Promise((resolve, reject) => {
		import_cloudinary.v2.uploader.upload_stream({
			folder,
			resource_type: "image",
			transformation: [{
				quality: "auto",
				fetch_format: "auto"
			}]
		}, (error, result) => {
			if (error) reject(error);
			else resolve({
				url: result.secure_url,
				public_id: result.public_id
			});
		}).end(buffer);
	});
}
var Route$8 = createFileRoute("/api/upload")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get("file");
		const folder = formData.get("folder") || "pom-penthouse";
		if (!file) return new Response(JSON.stringify({
			success: false,
			error: "No file provided"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (file.size > 10 * 1024 * 1024) return new Response(JSON.stringify({
			success: false,
			error: "File too large (max 10MB)"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const result = await uploadImage(file, folder);
		return new Response(JSON.stringify({
			success: true,
			url: result.url,
			public_id: result.public_id
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({
			success: false,
			error: err?.message || "Upload failed"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
function createServiceClient() {
	return createServerClient(void 0, void 0, {
		cookies: {
			getAll() {
				return [];
			},
			setAll() {}
		},
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});
}
var resend = new Resend(void 0);
var FROM_EMAIL = "Pom PentHouse <hello@pompenthouse.np>";
async function sendBookingConfirmation(booking) {
	return resend.emails.send({
		from: FROM_EMAIL,
		to: booking.guestEmail,
		subject: `Booking Confirmed — ${booking.penthouseName}`,
		html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Booking Confirmed</h1>
        <p>Dear ${booking.guestName},</p>
        <p>Your booking at <strong>${booking.penthouseName}</strong> is confirmed.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Check-in</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.checkIn}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Check-out</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.checkOut}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Nights</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.nights}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Total</td><td style="padding: 8px; font-weight: bold;">रू ${booking.total.toLocaleString("en-IN")}</td></tr>
        </table>
        <p>We look forward to hosting you.</p>
        <p>Best,<br/>Pom PentHouse</p>
      </div>
    `
	});
}
async function sendNewBookingNotification(booking) {
	return resend.emails.send({
		from: FROM_EMAIL,
		to: "hello@pompenthouse.np",
		subject: `New Booking — ${booking.penthouseName}`,
		html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">New Booking Received</h1>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Guest</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.guestName} (${booking.guestEmail})</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Penthouse</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.penthouseName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Check-in</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.checkIn}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Check-out</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.checkOut}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Total</td><td style="padding: 8px; font-weight: bold;">रू ${booking.total.toLocaleString("en-IN")}</td></tr>
        </table>
      </div>
    `
	});
}
async function sendContactNotification(contact) {
	return resend.emails.send({
		from: FROM_EMAIL,
		to: "hello@pompenthouse.np",
		subject: `New Contact Message — ${contact.name}`,
		html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">New Contact Message</h1>
        <p><strong>From:</strong> ${contact.name} (${contact.email})</p>
        <p style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 20px 0;">${contact.message}</p>
      </div>
    `
	});
}
objectType({
	email: stringType().email("Invalid email"),
	password: stringType().min(6, "Password must be at least 6 characters")
});
objectType({
	name: stringType().min(1, "Name is required"),
	location: stringType().optional(),
	price_per_night: numberType().min(1, "Price is required"),
	status: enumType([
		"available",
		"booked",
		"maintenance"
	]),
	image: stringType().url().optional().or(literalType("")),
	description: stringType().optional(),
	amenities: arrayType(stringType()).default([]),
	max_guests: numberType().min(1).default(2),
	bedrooms: numberType().min(0).default(1),
	bathrooms: numberType().min(0).default(1),
	rules: arrayType(stringType()).default([]),
	images: arrayType(stringType()).default([])
});
var bookingSchema = objectType({
	penthouse_id: stringType().uuid().optional().nullable(),
	penthouse_name: stringType().min(1, "Penthouse name is required"),
	guest_name: stringType().min(1, "Guest name is required"),
	guest_email: stringType().email("Invalid email"),
	guest_phone: stringType().optional(),
	check_in: stringType().min(1, "Check-in date is required"),
	check_out: stringType().min(1, "Check-out date is required"),
	nights: numberType().min(1, "At least 1 night"),
	total: numberType().min(0),
	guests: numberType().min(1).default(1),
	addons: recordType(booleanType()).default({}),
	notes: stringType().optional()
});
var contactSchema = objectType({
	name: stringType().min(1, "Name is required"),
	email: stringType().email("Invalid email"),
	message: stringType().min(10, "Message must be at least 10 characters")
});
objectType({
	name: stringType().optional(),
	email: stringType().email().optional(),
	role: enumType([
		"guest",
		"staff",
		"admin"
	]),
	banned: booleanType().default(false)
});
recordType(unknownType());
var Route$7 = createFileRoute("/api/contact")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const body = await request.json();
		const validated = contactSchema.parse(body);
		const { error } = await createServiceClient().from("contact_messages").insert({
			name: validated.name,
			email: validated.email,
			message: validated.message
		});
		if (error) throw error;
		sendContactNotification({
			name: validated.name,
			email: validated.email,
			message: validated.message
		}).catch(console.error);
		return new Response(JSON.stringify({ success: true }), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		const message = err?.issues?.[0]?.message || err?.message || "Failed to send message";
		return new Response(JSON.stringify({
			success: false,
			error: message
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var Route$6 = createFileRoute("/api/bookings")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const body = await request.json();
		const validated = bookingSchema.parse(body);
		const { data: booking, error } = await createServiceClient().from("bookings").insert({
			penthouse_id: validated.penthouse_id || null,
			penthouse_name: validated.penthouse_name,
			guest_name: validated.guest_name,
			guest_email: validated.guest_email,
			guest_phone: validated.guest_phone || null,
			check_in: validated.check_in,
			check_out: validated.check_out,
			nights: validated.nights,
			total: validated.total,
			guests: validated.guests,
			addons: validated.addons,
			notes: validated.notes || null,
			status: "pending",
			payment_status: "unpaid"
		}).select().single();
		if (error) throw error;
		Promise.all([sendBookingConfirmation({
			guestName: validated.guest_name,
			guestEmail: validated.guest_email,
			penthouseName: validated.penthouse_name,
			checkIn: validated.check_in,
			checkOut: validated.check_out,
			nights: validated.nights,
			total: validated.total
		}).catch(console.error), sendNewBookingNotification({
			guestName: validated.guest_name,
			guestEmail: validated.guest_email,
			penthouseName: validated.penthouse_name,
			checkIn: validated.check_in,
			checkOut: validated.check_out,
			total: validated.total
		}).catch(console.error)]);
		return new Response(JSON.stringify({
			success: true,
			booking
		}), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		const message = err?.issues?.[0]?.message || err?.message || "Booking failed";
		return new Response(JSON.stringify({
			success: false,
			error: message
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var $$splitComponentImporter$5 = () => import("./admin.users-D9LZR6Gw.mjs");
var Route$5 = createFileRoute("/admin/users")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.settings-CQHWZRuO.mjs");
var Route$4 = createFileRoute("/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.penthouses-BEKTDvtu.mjs");
var Route$3 = createFileRoute("/admin/penthouses")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.login-G2L-N0Ep.mjs");
var Route$2 = createFileRoute("/admin/login")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.bookings-C1Q-NZpA.mjs");
var Route$1 = createFileRoute("/admin/bookings")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.analytics-B9WJxXrk.mjs");
var Route = createFileRoute("/admin/analytics")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var AdminRoute = Route$11.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$12
});
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var AdminIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var ApiUploadRoute = Route$8.update({
	id: "/api/upload",
	path: "/api/upload",
	getParentRoute: () => Route$12
});
var ApiContactRoute = Route$7.update({
	id: "/api/contact",
	path: "/api/contact",
	getParentRoute: () => Route$12
});
var ApiBookingsRoute = Route$6.update({
	id: "/api/bookings",
	path: "/api/bookings",
	getParentRoute: () => Route$12
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
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	ApiBookingsRoute,
	ApiContactRoute,
	ApiUploadRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
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
