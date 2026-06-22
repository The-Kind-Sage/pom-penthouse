import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as useUpdateSetting, s as useSettings } from "./hooks-jthhuE6S.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-CQHWZRuO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function SettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold",
			children: "Settings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-foreground/60",
			children: "Configure your site"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "pricing",
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "pricing",
						children: "Pricing"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "cms",
						children: "Site Content"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "pricing",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingTab, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "cms",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSTab, {})
				})
			]
		})]
	});
}
function PricingTab() {
	const { data: settings } = useSettings();
	const updateSetting = useUpdateSetting();
	const pricing = settings?.pricing_rules || {
		peakMultiplier: 0,
		minStay: 1,
		holidayRate: 0
	};
	const [peakMultiplier, setPeakMultiplier] = (0, import_react.useState)(pricing.peakMultiplier || 0);
	const [minStay, setMinStay] = (0, import_react.useState)(pricing.minStay || 1);
	const [holidayRate, setHolidayRate] = (0, import_react.useState)(pricing.holidayRate || 0);
	(0, import_react.useEffect)(() => {
		if (pricing) {
			setPeakMultiplier(pricing.peakMultiplier || 0);
			setMinStay(pricing.minStay || 1);
			setHolidayRate(pricing.holidayRate || 0);
		}
	}, [settings]);
	const save = async () => {
		try {
			await updateSetting.mutateAsync({
				key: "pricing_rules",
				value: {
					peakMultiplier,
					minStay,
					holidayRate
				}
			});
			toast.success("Pricing rules saved");
		} catch {
			toast.error("Failed to save pricing rules");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-paper border rounded-xl p-6 space-y-6 max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium mb-1",
					children: "Peak Season Multiplier"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-foreground/60 mb-2",
					children: "Additional % added during peak season (Oct-Feb)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 100,
						value: peakMultiplier,
						onChange: (e) => setPeakMultiplier(Number(e.target.value)),
						className: "flex-1 accent-[var(--gold)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-medium w-12",
						children: [peakMultiplier, "%"]
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium mb-1",
					children: "Minimum Stay (nights)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-foreground/60 mb-2",
					children: "Default minimum booking duration"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					value: minStay,
					onChange: (e) => setMinStay(Number(e.target.value)),
					className: "rounded-xl border px-4 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm w-24"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium mb-1",
					children: "Holiday Rate Increase"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-foreground/60 mb-2",
					children: "Additional % for public holidays"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 100,
						value: holidayRate,
						onChange: (e) => setHolidayRate(Number(e.target.value)),
						className: "flex-1 accent-[var(--gold)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-medium w-12",
						children: [holidayRate, "%"]
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: save,
				disabled: updateSetting.isPending,
				className: "btn-primary text-sm py-2 px-4 disabled:opacity-50",
				children: "Save Pricing Rules"
			})
		]
	});
}
function CMSTab() {
	const { data: settings } = useSettings();
	const updateSetting = useUpdateSetting();
	const [heroTitle, setHeroTitle] = (0, import_react.useState)("");
	const [heroSubtitle, setHeroSubtitle] = (0, import_react.useState)("");
	const [contactEmail, setContactEmail] = (0, import_react.useState)("");
	const [contactPhone, setContactPhone] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (settings) {
			setHeroTitle(settings.hero_title || "");
			setHeroSubtitle(settings.hero_subtitle || "");
			setContactEmail(settings.contact_email || "");
			setContactPhone(settings.contact_phone || "");
		}
	}, [settings]);
	const save = async () => {
		try {
			await Promise.all([
				updateSetting.mutateAsync({
					key: "hero_title",
					value: heroTitle
				}),
				updateSetting.mutateAsync({
					key: "hero_subtitle",
					value: heroSubtitle
				}),
				updateSetting.mutateAsync({
					key: "contact_email",
					value: contactEmail
				}),
				updateSetting.mutateAsync({
					key: "contact_phone",
					value: contactPhone
				})
			]);
			toast.success("Site content updated");
		} catch {
			toast.error("Failed to save content");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-paper border rounded-xl p-6 space-y-4 max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-sm font-medium mb-1 block",
				children: "Hero Title"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: heroTitle,
				onChange: (e) => setHeroTitle(e.target.value),
				placeholder: "Enter hero title",
				className: "w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-sm font-medium mb-1 block",
				children: "Hero Subtitle"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: heroSubtitle,
				onChange: (e) => setHeroSubtitle(e.target.value),
				placeholder: "Enter hero subtitle",
				className: "w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-sm font-medium mb-1 block",
				children: "Contact Email"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: contactEmail,
				onChange: (e) => setContactEmail(e.target.value),
				placeholder: "email@example.com",
				className: "w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-sm font-medium mb-1 block",
				children: "Contact Phone"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: contactPhone,
				onChange: (e) => setContactPhone(e.target.value),
				placeholder: "+977 ...",
				className: "w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: save,
				disabled: updateSetting.isPending,
				className: "btn-primary text-sm py-2 px-4 disabled:opacity-50",
				children: "Save Content"
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
