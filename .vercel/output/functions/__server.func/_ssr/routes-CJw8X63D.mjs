import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as ChevronLeft, M as ArrowUp, T as ChevronRight, c as Sparkles, d as Plus, g as Minus, h as Moon, j as Bell, m as Mountain, o as Sunrise, s as Sun, t as X, v as Menu, w as Cpu } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as useScroll, i as useMotionValue, n as useSpring, o as motion, r as useTransform, s as AnimatePresence, t as useInView } from "../_libs/framer-motion.mjs";
import { t as DayPicker } from "../_libs/react-day-picker.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CJw8X63D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var state = {
	bookingOpen: false,
	lightboxIndex: null
};
var listeners = /* @__PURE__ */ new Set();
function emit() {
	listeners.forEach((l) => l());
}
function subscribe(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
function getSnapshot() {
	return state;
}
function getServerSnapshot() {
	return state;
}
var ui = {
	openBooking() {
		state = {
			...state,
			bookingOpen: true
		};
		emit();
	},
	closeBooking() {
		state = {
			...state,
			bookingOpen: false
		};
		emit();
	},
	openLightbox(i) {
		state = {
			...state,
			lightboxIndex: i
		};
		emit();
	},
	closeLightbox() {
		state = {
			...state,
			lightboxIndex: null
		};
		emit();
	},
	setLightbox(i) {
		state = {
			...state,
			lightboxIndex: i
		};
		emit();
	}
};
function useUI() {
	return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
var links = [
	{
		href: "#about",
		label: "About"
	},
	{
		href: "#gallery",
		label: "Gallery"
	},
	{
		href: "#residence",
		label: "Residence"
	},
	{
		href: "#location",
		label: "Location"
	}
];
function Navbar() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem("pom-theme");
		const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		const next = stored ?? prefers;
		setTheme(next);
		document.documentElement.setAttribute("data-theme", next);
	}, []);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const toggleTheme = () => {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		localStorage.setItem("pom-theme", next);
		document.documentElement.setAttribute("data-theme", next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 border-b" : "py-5 border-b border-transparent"}`,
		style: {
			background: scrolled ? "color-mix(in srgb, var(--paper) 78%, transparent)" : "transparent",
			backdropFilter: scrolled ? "blur(16px)" : "none"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1200px] px-6 lg:px-12 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#top",
					className: "glitch-hover font-display text-2xl tracking-tight",
					"aria-label": "Pom PentHouse home",
					children: "Pom"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden md:flex items-center gap-9 text-sm",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "link-underline opacity-80 hover:opacity-100",
						children: l.label
					}, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: toggleTheme,
							className: "p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition",
							"aria-label": "Toggle theme",
							children: theme === "light" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: ui.openBooking,
							className: "hidden md:inline-flex btn-ghost !py-2.5 !px-5 text-sm",
							children: "Book a Stay"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "md:hidden p-2",
							onClick: () => setOpen(true),
							"aria-label": "Open menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 22 })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-[60] bg-[var(--paper)] flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center px-6 py-5 border-b",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl",
					children: "Pom"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(false),
					"aria-label": "Close menu",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 24 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex-1 flex flex-col items-center justify-center gap-8",
				children: [links.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: l.href,
					onClick: () => setOpen(false),
					className: "font-display text-3xl md:text-4xl animate-[fade-in_0.5s_ease-out_both]",
					style: { animationDelay: `${i * .05}s` },
					children: l.label
				}, l.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setOpen(false);
						ui.openBooking();
					},
					className: "btn-primary mt-6",
					children: "Book a Stay"
				})]
			})]
		})]
	});
}
var u = (path, w = 1600) => `https://images.unsplash.com/${path}?w=${w}&q=80&auto=format&fit=crop`;
var IMAGES = [
	{
		id: 1,
		src: u("photo-1600607687939-ce8a6c25118c", 1800),
		alt: "Pom PentHouse living room with Annapurna view at dawn",
		effect: "Crossfade"
	},
	{
		id: 2,
		src: u("photo-1613977257363-707ba9348227", 1800),
		alt: "Pom PentHouse balcony with Himalayan mountain view",
		effect: "Ken Burns"
	},
	{
		id: 3,
		src: u("photo-1600573472550-8090b5e0745e", 1800),
		alt: "Pom PentHouse bedroom with linen bedding and lake light",
		effect: "Crossfade"
	},
	{
		id: 4,
		src: u("photo-1600210492486-724fe5c67fb0", 1400),
		alt: "Morning light across a quiet stone interior",
		effect: "Push"
	},
	{
		id: 5,
		src: u("photo-1616594039964-ae9021a400a0", 1400),
		alt: "Limestone soaking bath with cedar accents",
		effect: "Mask Reveal"
	},
	{
		id: 6,
		src: u("photo-1502672260266-1c1ef2d93688", 1400),
		alt: "Cedar wood texture detail",
		effect: "Distortion Wave"
	},
	{
		id: 7,
		src: u("photo-1600585154340-be6161a56a0c", 1400),
		alt: "Tall living room with floor-to-ceiling glass",
		effect: "Wipe"
	},
	{
		id: 8,
		src: u("photo-1600607687920-4e2a09cf159d", 1200),
		alt: "Open kitchen with stone counters",
		effect: "Zoom In"
	},
	{
		id: 9,
		src: u("photo-1600566753086-00f18fb6b3ea", 1400),
		alt: "Wide lounge with low oak sofa and ceramics",
		effect: "Zoom Out"
	},
	{
		id: 10,
		src: u("photo-1616047006789-b7af5afb8c20", 1400),
		alt: "Bedroom detail with hand-woven linen",
		effect: "Blur Dissolve"
	},
	{
		id: 11,
		src: u("photo-1600210491892-03d54c0aaf87", 1200),
		alt: "Terrace by day with Annapurna view",
		effect: "Cube Flip"
	},
	{
		id: 12,
		src: u("photo-1600607688960-e095ff83135c", 1200),
		alt: "Stone bathroom with cedar shelving",
		effect: "Page Turn"
	},
	{
		id: 13,
		src: u("photo-1506905925346-21bda4d32df4", 1200),
		alt: "Rooftop view of Annapurna at sunset",
		effect: "Fade to Solid"
	},
	{
		id: 14,
		src: u("photo-1520250497591-112f2f40a3f4", 1200),
		alt: "Infinity view across Phewa Lake",
		effect: "Color Wash"
	},
	{
		id: 15,
		src: u("photo-1558002038-1055907df827", 1200),
		alt: "Smart-home interior with discreet controls",
		effect: "Card Flip"
	},
	{
		id: 16,
		src: u("photo-1530521954074-e64f6810b32d", 1200),
		alt: "Concierge service detail",
		effect: "Grayscale to Color"
	},
	{
		id: 17,
		src: u("photo-1616594039964-ae9021a400a0", 1600),
		alt: "Master suite with king linen bed",
		effect: "Tilt & Shift"
	},
	{
		id: 18,
		src: u("photo-1600607687939-ce8a6c25118c", 1600),
		alt: "Sunset lounge with oak sofa",
		effect: "Split Screen"
	},
	{
		id: 19,
		src: u("photo-1544735716-392fe2489ffa", 1600),
		alt: "Phewa Lake panorama, Pokhara",
		effect: "Liquid Smooth"
	},
	{
		id: 20,
		src: u("photo-1613977257363-707ba9348227", 1800),
		alt: "Pom PentHouse exterior at golden hour",
		effect: "Liquid Smooth"
	}
];
var photo = (n) => IMAGES[n - 1];
var slides = [
	photo(1),
	photo(2),
	photo(3)
];
function Hero() {
	const [i, setI] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (paused) return;
		const t = setInterval(() => setI((p) => (p + 1) % slides.length), 4500);
		return () => clearInterval(t);
	}, [paused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative min-h-screen w-full overflow-hidden flex items-end pb-24 lg:pb-32",
		onMouseEnter: () => setPaused(true),
		onMouseLeave: () => setPaused(false),
		children: [
			slides.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"aria-hidden": i !== idx,
				className: "absolute inset-0",
				initial: false,
				animate: { opacity: i === idx ? 1 : 0 },
				transition: {
					duration: 1.2,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.src,
					alt: s.alt,
					loading: "eager",
					decoding: "async",
					className: "object-cover w-full h-full"
				})
			}, s.id + "-" + idx)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 film-grain",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mx-auto max-w-[1200px] w-full px-6 lg:px-12 text-[var(--off-white)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						y: 24,
						opacity: 0
					},
					animate: {
						y: 0,
						opacity: 1
					},
					transition: {
						duration: 1,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "max-w-[640px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-[var(--gold-soft)] mb-5",
							children: "Pokhara, Nepal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "display-xl text-[var(--off-white)]",
							children: "Pom PentHouse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "accent-italic text-xl md:text-2xl mt-4 opacity-90",
							children: "A Lakeside Sanctuary — 180 meters from Phewa Lake"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--gold)]/60 backdrop-blur bg-white/10 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-[var(--gold)]" }), "Freehold"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								className: "btn-primary",
								children: "Schedule a Private Viewing"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: ui.openBooking,
								className: "btn-ghost text-[var(--off-white)]",
								children: "Book a Stay"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-8 left-6 lg:left-12 z-10 text-[var(--off-white)] flex items-center gap-3 text-xs uppercase tracking-[0.2em]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scroll" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block w-px h-12 bg-[var(--off-white)]/70 origin-top animate-[scroll-line_2.4s_ease-in-out_infinite]" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-8 right-6 lg:right-12 z-10 text-[var(--off-white)]/90 text-xs tracking-[0.2em] tabular-nums",
				children: [
					String(i + 1).padStart(2, "0"),
					" / ",
					String(IMAGES.length).padStart(2, "0")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2",
				children: slides.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setI(idx),
					"aria-label": `Slide ${idx + 1}`,
					className: `h-2 rounded-full transition-all ${i === idx ? "w-6 bg-[var(--gold)]" : "w-2 bg-white/50"}`
				}, idx))
			})
		]
	});
}
function About() {
	const pushRef = (0, import_react.useRef)(null);
	const pushInView = useInView(pushRef, {
		once: true,
		amount: .2
	});
	const maskRef = (0, import_react.useRef)(null);
	const maskWrapRef = (0, import_react.useRef)(null);
	const maskInView = useInView(maskWrapRef, {
		once: true,
		amount: .3
	});
	const waveWrapRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = waveWrapRef.current;
		if (!el) return;
		const turb = el.querySelector("feTurbulence");
		const disp = el.querySelector("feDisplacementMap");
		if (!turb || !disp) return;
		const onMove = (e) => {
			const r = el.getBoundingClientRect();
			const x = (e.clientX - r.left) / r.width;
			const y = (e.clientY - r.top) / r.height;
			const dist = Math.hypot(x - .5, y - .5);
			turb.setAttribute("baseFrequency", String(.008 + dist * .02));
			disp.setAttribute("scale", String(Math.min(8, dist * 16)));
		};
		el.addEventListener("mousemove", onMove);
		return () => el.removeEventListener("mousemove", onMove);
	}, []);
	const p4 = photo(4), p5 = photo(5), p6 = photo(6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "relative py-32 md:py-48",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1200px] px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:sticky lg:top-32 lg:self-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-6",
						children: "Lakeside Sanctuary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "h1-lux mb-8",
						children: [
							"Stillness,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"with a view."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 text-lg opacity-85 max-w-[520px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Three bedrooms above Phewa Lake. Floor-to-ceiling glass facing the Annapurnas." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Limestone, cedar, and hand-woven linen. Quiet by design." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "180 meters to the water. Four minutes to Lakeside Street cafés. Twenty-five minutes to Pokhara Airport." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "accent-italic mt-8 text-xl text-[var(--gold)]",
						children: "3 Beds · 3.5 Baths · 2,150 sq ft"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#gallery",
						className: "link-underline mt-8 inline-block text-sm uppercase tracking-[0.2em]",
						children: "View Gallery →"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
							ref: pushRef,
							src: p4.src,
							alt: p4.alt,
							loading: "lazy",
							decoding: "async",
							className: "object-cover w-full h-[260px] sm:h-[320px] md:h-[420px]",
							initial: {
								x: 80,
								scale: .96,
								opacity: 0
							},
							animate: pushInView ? {
								x: 0,
								scale: 1,
								opacity: 1
							} : {},
							transition: {
								duration: 1,
								ease: [
									.22,
									1,
									.36,
									1
								]
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "mt-3 text-sm opacity-60",
							children: "Morning light"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						ref: maskWrapRef,
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 100 100",
								className: "absolute w-0 h-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
									id: "circle-mask",
									clipPathUnits: "objectBoundingBox",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										ref: maskRef,
										cx: "0.5",
										cy: "0.5",
										r: maskInView ? .75 : 0,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
											attributeName: "r",
											from: "0",
											to: "0.75",
											dur: "1.4s",
											begin: maskInView ? "0s" : "indefinite",
											fill: "freeze",
											calcMode: "spline",
											keySplines: "0.22 1 0.36 1"
										})
									})
								}) })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p5.src,
								alt: p5.alt,
								loading: "lazy",
								decoding: "async",
								className: "object-cover w-full h-[260px] sm:h-[320px] md:h-[420px]",
								style: { clipPath: "url(#circle-mask)" }
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "mt-3 text-sm opacity-60",
							children: "Stone bath"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						ref: waveWrapRef,
						className: "relative overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "absolute w-0 h-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
									id: "liquid-distort",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feTurbulence", {
										type: "fractalNoise",
										baseFrequency: "0.012",
										numOctaves: "2",
										seed: "3"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDisplacementMap", {
										in: "SourceGraphic",
										scale: "0"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p6.src,
								alt: p6.alt,
								loading: "lazy",
								decoding: "async",
								className: "object-cover w-full h-[260px] sm:h-[320px] md:h-[420px]",
								style: { filter: "url(#liquid-distort)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
								className: "mt-3 text-sm opacity-60",
								children: "Cedar detail"
							})
						]
					})
				]
			})]
		})
	});
}
function Wipe({ src, alt }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .25
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative overflow-hidden rounded-[28px] h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt,
				loading: "lazy",
				decoding: "async",
				className: "object-cover w-full h-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-y-0 left-0 w-px bg-[var(--gold)]",
				initial: {
					scaleX: 0,
					x: 0
				},
				animate: inView ? { x: ["0%", "100%"] } : {},
				style: {
					originX: 0,
					width: "100%",
					height: "100%",
					background: "linear-gradient(90deg, transparent 0%, transparent 49.9%, var(--gold) 50%, transparent 50.1%, transparent 100%)"
				},
				transition: {
					duration: .9,
					ease: [
						.22,
						1,
						.36,
						1
					]
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-0 bg-[var(--sand-soft)]",
				initial: { x: 0 },
				animate: inView ? { x: "101%" } : {},
				transition: {
					duration: .9,
					ease: [
						.22,
						1,
						.36,
						1
					]
				}
			})
		]
	});
}
function ZoomIn({ src, alt }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative overflow-hidden rounded-[28px] h-full group",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			loading: "lazy",
			decoding: "async",
			className: "object-cover w-full h-full transition-transform duration-[2500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
		})
	});
}
function ZoomOut({ src, alt }) {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: "relative overflow-hidden rounded-[28px] h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
			src,
			alt,
			loading: "lazy",
			decoding: "async",
			style: { scale },
			className: "object-cover w-full h-full"
		})
	});
}
function BlurDissolve({ src, alt }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .25
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: "relative overflow-hidden rounded-[28px] h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
			src,
			alt,
			loading: "lazy",
			decoding: "async",
			className: "object-cover w-full h-full",
			initial: {
				filter: "blur(24px)",
				scale: 1.03
			},
			animate: inView ? {
				filter: "blur(0px)",
				scale: 1
			} : {},
			transition: {
				duration: 1.1,
				ease: [
					.22,
					1,
					.36,
					1
				]
			}
		})
	});
}
function CubeFlip({ src, alt, back }) {
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: (e) => {
			e.stopPropagation();
			setFlipped((f) => !f);
		},
		className: "relative h-full w-full rounded-[28px] overflow-hidden text-left",
		style: { perspective: "1200px" },
		"aria-label": "Flip image",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "relative w-full h-full",
			style: { transformStyle: "preserve-3d" },
			animate: { rotateY: flipped ? 90 : 0 },
			transition: {
				duration: .65,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0",
				style: { backfaceVisibility: "hidden" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt,
					loading: "lazy",
					decoding: "async",
					className: "object-cover w-full h-full"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-3 right-3 text-[11px] md:text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full bg-black/50 text-white",
					children: "Tap to flip"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex items-center justify-center bg-[var(--charcoal)] text-[var(--sand)]",
				style: {
					transform: "rotateY(-90deg) translateZ(1px)",
					backfaceVisibility: "hidden"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: back,
					alt: "Evening view",
					className: "object-cover w-full h-full absolute inset-0 opacity-70"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "relative accent-italic text-2xl",
					children: "Evening view"
				})]
			})]
		})
	});
}
function PageTurn({ src, alt }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-[28px] h-full group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			loading: "lazy",
			decoding: "async",
			className: "object-cover w-full h-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute bottom-0 right-0 w-16 h-16 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-28 group-hover:h-28",
			style: {
				background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.25) 50%, rgba(201,168,108,0.7) 70%, transparent 75%)",
				boxShadow: "inset -6px -6px 12px rgba(0,0,0,0.2)",
				transform: "rotate(0deg)"
			}
		})]
	});
}
function Gallery() {
	const p7 = photo(7), p8 = photo(8), p9 = photo(9), p10 = photo(10), p11 = photo(11), p12 = photo(12), p2 = photo(2);
	const tiles = [
		{
			key: "p7",
			el: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wipe, {
				src: p7.src,
				alt: p7.alt
			}),
			cls: "md:row-span-2 min-h-[220px] md:min-h-0 md:h-full",
			idx: 6,
			label: "Living Room"
		},
		{
			key: "p8",
			el: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, {
				src: p8.src,
				alt: p8.alt
			}),
			cls: "min-h-[200px] md:h-[300px]",
			idx: 7,
			label: "Kitchen"
		},
		{
			key: "p9",
			el: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, {
				src: p9.src,
				alt: p9.alt
			}),
			cls: "min-h-[200px] md:h-[300px]",
			idx: 8,
			label: "Lounge"
		},
		{
			key: "p10",
			el: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlurDissolve, {
				src: p10.src,
				alt: p10.alt
			}),
			cls: "min-h-[220px] md:h-[460px] lg:row-span-2",
			idx: 9,
			label: "Bedroom"
		},
		{
			key: "p11",
			el: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CubeFlip, {
				src: p11.src,
				alt: p11.alt,
				back: p2.src
			}),
			cls: "min-h-[200px] md:h-[300px]",
			idx: 10,
			label: "Terrace"
		},
		{
			key: "p12",
			el: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTurn, {
				src: p12.src,
				alt: p12.alt
			}),
			cls: "min-h-[200px] md:h-[300px]",
			idx: 11,
			label: "Bathroom"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "gallery",
		className: "py-24 md:py-32",
		style: { background: "var(--sand-soft)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1200px] px-6 lg:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-2xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-5",
						children: "In quiet light"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "h1-lux",
						children: [
							"Six frames",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"from the penthouse"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto md:auto-rows-[300px] gap-7",
					children: tiles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `relative group ${t.cls}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative h-full cursor-zoom-in",
							onClick: () => ui.openLightbox(t.idx),
							children: t.el
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 group-hover:bg-black/30 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto rounded-[28px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white/0 group-hover:text-white/90 text-xs tracking-[0.2em] uppercase transition-all duration-500",
								children: t.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: (e) => {
									e.stopPropagation();
									ui.openBooking();
								},
								className: "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 btn-primary text-sm py-2 px-5 pointer-events-auto",
								children: "Book Now"
							})]
						})]
					}, t.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-center text-sm opacity-60 tracking-[0.2em]",
					children: "07 – 12 / 20"
				})
			]
		})
	});
}
function FadeToSolid({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p.src,
				alt: p.alt,
				loading: "lazy",
				decoding: "async",
				className: "object-cover w-full h-full transition-opacity duration-[450ms] group-hover:opacity-0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 bg-[var(--gold)]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-[450ms] flex flex-col justify-end p-7 text-[var(--charcoal)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sunrise, {
						size: 22,
						className: "mb-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "h3-lux",
						children: "Rooftop Terrace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm mt-2 opacity-90",
						children: "Annapurna sunsets. Cedar daybed. Outdoor shower."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 bottom-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-0 transition-opacity",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "h3-lux",
					children: "Rooftop Terrace"
				})
			})
		]
	});
}
function ColorWash({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p.src,
				alt: p.alt,
				loading: "lazy",
				decoding: "async",
				className: "object-cover w-full h-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[var(--lake-blue)] mix-blend-multiply translate-y-full group-hover:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 p-6 text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mountain, {
						size: 22,
						className: "mb-2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "h3-lux",
						children: "Infinity View"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm mt-1 opacity-90",
						children: "Floor-to-ceiling lake glass. No curtains needed."
					})
				]
			})
		]
	});
}
function CardFlip({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "group relative aspect-[4/5] [perspective:1200px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)] [backface-visibility:hidden]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.src,
					alt: p.alt,
					loading: "lazy",
					decoding: "async",
					className: "object-cover w-full h-full"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, {
						size: 22,
						className: "mb-2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "h3-lux",
						children: "Smart Home"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 rounded-[28px] overflow-hidden bg-[var(--charcoal)] text-[var(--sand)] p-7 flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
					size: 22,
					className: "mb-4 text-[var(--gold)]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 font-display text-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Lutron lighting" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Climate zones" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Keyless entry" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sonos" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "600mbps fiber" })
					]
				})]
			})]
		})
	});
}
function GrayscaleColor({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: p.src,
			alt: p.alt,
			loading: "lazy",
			decoding: "async",
			className: "object-cover w-full h-full transition-[filter] duration-[600ms] grayscale contrast-[1.05] group-hover:grayscale-0"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-x-0 bottom-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
					size: 22,
					className: "mb-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "h3-lux",
					children: "Concierge"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm mt-1 opacity-90",
					children: "Airport transfer, trek guides, private chef — on message."
				})
			]
		})]
	});
}
function Amenities() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "amenities",
		className: "py-24 md:py-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1200px] px-6 lg:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-5",
					children: "Service"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "h1-lux",
					children: "Everything, nothing extra"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeToSolid, { p: photo(13) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorWash, { p: photo(14) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFlip, { p: photo(15) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrayscaleColor, { p: photo(16) })
				]
			})]
		})
	});
}
function TiltShift({ p }) {
	const ref = (0, import_react.useRef)(null);
	const mx = useMotionValue(.5);
	const my = useMotionValue(.5);
	const rx = useSpring(useTransform(my, [0, 1], [8, -8]), {
		stiffness: 220,
		damping: 22
	});
	const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), {
		stiffness: 220,
		damping: 22
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		ref,
		onMouseMove: (e) => {
			const r = ref.current.getBoundingClientRect();
			mx.set((e.clientX - r.left) / r.width);
			my.set((e.clientY - r.top) / r.height);
		},
		onMouseLeave: () => {
			mx.set(.5);
			my.set(.5);
		},
		style: {
			rotateX: rx,
			rotateY: ry,
			transformPerspective: 1e3
		},
		className: "relative overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)] aspect-[4/5]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: p.src,
			alt: p.alt,
			loading: "lazy",
			decoding: "async",
			className: "object-cover w-full h-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 pointer-events-none",
			style: { background: "radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)" }
		})]
	});
}
function SplitScreen({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)] aspect-[4/5]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p.src,
				alt: "",
				"aria-hidden": true,
				loading: "lazy",
				decoding: "async",
				className: "absolute inset-0 object-cover w-full h-full",
				style: { filter: "brightness(0.45) saturate(0.8) hue-rotate(210deg)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p.src,
				alt: p.alt,
				loading: "lazy",
				decoding: "async",
				className: "absolute inset-0 object-cover w-full h-full transition-[clip-path] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
				style: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .splitscreen-day { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 transition-all duration-[550ms]",
				style: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 group-hover:[clip-path:polygon(0_0,0_0,0_100%,0_100%)] transition-all duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-cover",
				style: { backgroundImage: `url(${p.src})` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "h3-lux",
					children: "Sunset Lounge"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm mt-1 opacity-90",
					children: "Hover to see night. Low oak sofa. Hand-thrown ceramics. Vinyl."
				})]
			})
		]
	});
}
function Residence() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "residence",
		className: "py-24 md:py-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1200px] px-6 lg:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-2 gap-12 lg:gap-16 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltShift, { p: photo(17) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mb-2",
							children: "Suite"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "h2-lux",
							children: "Master Suite"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 opacity-80 max-w-md",
							children: "King linen bed. Lake-facing glass. Limestone soaking bath. Walk-in cedar closet."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: ui.openBooking,
							className: "btn-primary mt-4 text-sm py-2 px-5",
							children: "Book Now — रू14,850 / night"
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitScreen, { p: photo(18) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mb-2",
							children: "Lounge"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "h2-lux",
							children: "Sunset Lounge"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 opacity-80 max-w-md",
							children: "Hover to see night. Low oak sofa. Hand-thrown ceramics. Vinyl."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: ui.openBooking,
							className: "btn-primary mt-4 text-sm py-2 px-5",
							children: "Book Now — रू25,500 / night"
						})
					]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-20 border-t border-[var(--gold)]/30 pt-10 grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 text-center",
				children: [
					["3", "Beds"],
					["3.5", "Baths"],
					["2,150", "Sq ft"],
					["420", "Terrace sq ft"],
					["2", "Parking"]
				].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-5xl",
					children: n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-[0.2em] mt-2 opacity-60",
					children: l
				})] }, l))
			})]
		})
	});
}
var ROOMS = {
	entire: {
		label: "Entire Penthouse",
		rate: 25500,
		unit: "night",
		blurb: "Full 3-bed penthouse"
	},
	suite: {
		label: "Master Suite Only",
		rate: 14850,
		unit: "night",
		blurb: "King bed + private bath"
	},
	long: {
		label: "Long Stay",
		rate: 525e3,
		unit: "month",
		blurb: "30 days+ · best for remote work"
	}
};
var ADDONS = [
	{
		key: "airport",
		label: "Airport Pickup",
		price: 3500,
		perNight: false
	},
	{
		key: "chef",
		label: "Private Chef (1 evening)",
		price: 8e3,
		perNight: false
	},
	{
		key: "cleaning",
		label: "Daily Cleaning",
		price: 2e3,
		perNight: true
	},
	{
		key: "trek",
		label: "Trek Guide Day",
		price: 6e3,
		perNight: false
	}
];
var CLEANING_FEE = 6e3;
function fmtNPR(n) {
	return `रू ${n.toLocaleString("en-IN")}`;
}
function calcPrice(opts) {
	const room = ROOMS[opts.room];
	const isLong = opts.room === "long";
	const units = isLong ? Math.max(1, Math.ceil(opts.nights / 30)) : opts.nights;
	const base = room.rate * units;
	const cleaningFee = isLong ? 0 : CLEANING_FEE;
	const serviceFeeRate = .08;
	const addonsTotal = ADDONS.reduce((sum, a) => {
		if (!opts.addons[a.key]) return sum;
		const qty = a.perNight ? isLong ? 30 : opts.nights : 1;
		return sum + a.price * qty;
	}, 0);
	const subtotal = base + cleaningFee + addonsTotal;
	const serviceFee = Math.round(subtotal * serviceFeeRate);
	return {
		room,
		units,
		base,
		cleaningFee,
		addonsTotal,
		subtotal,
		serviceFee,
		total: subtotal + serviceFee,
		isLong
	};
}
function differenceInDays$1(a, b) {
	return Math.round((+a - +b) / 864e5);
}
function Stepper$1({ label, value, min, max, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: value <= min,
					onClick: () => onChange(value - 1),
					"aria-label": `Decrease ${label}`,
					className: "w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30 hover:border-[var(--gold)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 13 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-5 text-center tabular-nums text-sm",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: value >= max,
					onClick: () => onChange(value + 1),
					"aria-label": `Increase ${label}`,
					className: "w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30 hover:border-[var(--gold)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 13 })
				})
			]
		})]
	});
}
function Toggle$1({ on, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "switch",
		"aria-checked": on,
		"aria-label": label,
		onClick: () => onChange(!on),
		className: `w-10 h-5 rounded-full transition ${on ? "bg-[var(--gold)]" : "bg-stone-300"} relative flex-shrink-0`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}` })
	});
}
function BookingSection() {
	const [room, setRoom] = (0, import_react.useState)("entire");
	const [range, setRange] = (0, import_react.useState)();
	const [adults, setAdults] = (0, import_react.useState)(2);
	const [children, setChildren] = (0, import_react.useState)(0);
	const [infants, setInfants] = (0, import_react.useState)(0);
	const [addons, setAddons] = (0, import_react.useState)({
		airport: false,
		chef: false,
		cleaning: false,
		trek: false
	});
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const nights = range?.from && range?.to ? Math.max(0, differenceInDays$1(range.to, range.from)) : 0;
	const price = calcPrice({
		room,
		nights: room === "long" ? 30 : nights,
		addons
	});
	const handleBook = (e) => {
		e.preventDefault();
		if (!name.trim() || !email.trim()) return;
		ui.openBooking();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-24 md:py-32",
		style: { background: "var(--sand-soft)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1200px] px-6 lg:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-5",
						children: "Check availability"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "h1-lux",
						children: "Book your stay"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 opacity-70 text-sm",
						children: "Live pricing · No commitment"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 grid lg:grid-cols-2 gap-10 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [
						photo(17),
						photo(18),
						photo(11),
						photo(12)
					].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `overflow-hidden rounded-[20px] ${i === 0 ? "row-span-2" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.src,
							alt: p.alt,
							loading: "lazy",
							className: "object-cover w-full h-full min-h-[160px]"
						})
					}, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
					onSubmit: handleBook,
					className: "rounded-[28px] p-6 md:p-8 space-y-6",
					style: {
						background: "var(--paper)",
						boxShadow: "var(--shadow-soft)"
					},
					initial: {
						opacity: 0,
						y: 24
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						amount: .2
					},
					transition: {
						duration: .7,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "eyebrow mb-3",
							children: "Choose your stay"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: Object.keys(ROOMS).map((k) => {
								const r = ROOMS[k];
								const sel = room === k;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: `flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${sel ? "border-[var(--gold)] bg-[var(--gold)]/5" : "hover:border-[var(--gold)]/40"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "room-section",
										checked: sel,
										onChange: () => setRoom(k),
										className: "mt-1 accent-[var(--gold)]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-sm",
												children: r.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm",
												children: [
													"रू",
													r.rate.toLocaleString("en-IN"),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "opacity-60 text-xs",
														children: ["/ ", r.unit]
													})
												]
											})]
										})
									})]
								}, k);
							})
						})] }),
						room !== "long" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "eyebrow mb-3",
								children: "Dates"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border p-2 overflow-x-auto flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
									mode: "range",
									numberOfMonths: 1,
									disabled: { before: /* @__PURE__ */ new Date() },
									min: 2,
									selected: range,
									onSelect: setRange,
									modifiersClassNames: { festival: "festival" }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs mt-1 opacity-70",
								children: range?.from && range?.to ? `${range.from.toLocaleDateString()} → ${range.to.toLocaleDateString()} · ${nights} nights` : "2-night minimum"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "eyebrow mb-1",
							children: "Guests"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "divide-y",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper$1, {
									label: "Adults",
									value: adults,
									min: 1,
									max: 6,
									onChange: setAdults
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper$1, {
									label: "Children",
									value: children,
									min: 0,
									max: 4,
									onChange: setChildren
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper$1, {
									label: "Infants",
									value: infants,
									min: 0,
									max: 2,
									onChange: setInfants
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "eyebrow mb-3",
							children: "Add-ons"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: ADDONS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: a.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs opacity-60 ml-2",
									children: [
										"रू",
										a.price,
										a.perNight ? " / night" : ""
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle$1, {
									on: addons[a.key],
									onChange: (v) => setAddons({
										...addons,
										[a.key]: v
									}),
									label: a.label
								})]
							}, a.key))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl p-4 text-sm",
							style: { background: "var(--sand-soft)" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Base" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtNPR(price.base) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add-ons" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtNPR(price.addonsTotal) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between mt-1 opacity-70",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fees & service" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtNPR(price.serviceFee + price.cleaningFee) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t mt-2 pt-2 flex justify-between font-medium text-base",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total NPR" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtNPR(price.total) })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "eyebrow mb-3",
							children: "Your details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								placeholder: "Name*",
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none text-sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "email",
								placeholder: "Email*",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none text-sm"
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "btn-primary w-full justify-center text-sm",
							children: ["Continue Booking — ", fmtNPR(price.total)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs opacity-60 text-center",
							children: "You won't be charged yet"
						})
					]
				})]
			})]
		})
	});
}
function Testimonial() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-24",
		style: { background: "var(--sand-soft)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl mx-auto text-center px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "accent-italic text-2xl md:text-3xl leading-relaxed",
				children: "“Waking up to the lake and the mountains in absolute silence. Pom is what luxury should feel like.”"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm opacity-70 tracking-[0.15em] uppercase",
				children: "— Maya R., Kathmandu · 6-night stay"
			})]
		})
	});
}
function LiquidSmooth({ p }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .3
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "group relative aspect-[4/3] rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "absolute w-0 h-0",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
				id: `blob-${p.id}`,
				clipPathUnits: "objectBoundingBox",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
					initial: { d: "M0,0 L1,0 L1,1 L0,1 Z" },
					animate: inView ? { d: [
						"M0,0 L1,0 L1,1 L0,1 Z",
						"M0.02,0.05 C0.3,-0.02 0.7,0.02 1,0.04 L0.98,0.95 C0.7,1.02 0.3,0.98 0.02,0.96 Z",
						"M0,0 L1,0 L1,1 L0,1 Z"
					] } : {},
					transition: {
						duration: .9,
						ease: [
							.22,
							1,
							.36,
							1
						]
					}
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
				id: `turb-${p.id}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feTurbulence", {
					type: "fractalNoise",
					numOctaves: 2,
					baseFrequency: inView ? .024 : .012
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDisplacementMap", {
					in: "SourceGraphic",
					scale: "4"
				})]
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: p.src,
			alt: p.alt,
			loading: "lazy",
			decoding: "async",
			className: "object-cover w-full h-full",
			style: { clipPath: `url(#blob-${p.id})` }
		})]
	});
}
function Location() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "location",
		className: "py-24 md:py-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1200px] px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidSmooth, { p: photo(19) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-5",
					children: "Pokhara Lakeside"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "h1-lux",
					children: "180 meters to the water."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 opacity-85 max-w-lg",
					children: "Four minute walk to Lakeside Street. Cafés, boats, yoga. Twenty-five minutes to Pokhara International Airport. Annapurna trailheads one hour north."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-8 space-y-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "📍 180m Phewa Lake" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "☕ 4 min Lakeside Street" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "✈ 25 min PKR Airport" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "⛰ Annapurna views" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 accent-italic text-xl text-[var(--gold)]",
					children: "Lakeside Road, Pokhara 33700, Nepal"
				})
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-20 max-w-4xl mx-auto px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow text-center mb-6",
				children: "Around Pom"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-3 gap-8 text-center opacity-85 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Boats at dawn — Phewa Lake, 3 min" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Himalayan Java — espresso, 5 min" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "World Peace Pagoda — hike 40 min" })
				]
			})]
		})]
	});
}
function Offer() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
	const p20 = photo(20);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative overflow-hidden py-32 md:py-48 text-[var(--sand)]",
		style: { background: "var(--charcoal)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
				src: p20.src,
				alt: p20.alt,
				loading: "lazy",
				decoding: "async",
				className: "absolute inset-0 object-cover w-full h-[130%] opacity-[0.36]",
				style: { y }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[var(--charcoal)]/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 max-w-2xl mx-auto text-center px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-5",
						children: "Freehold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display-xl mb-3",
						children: "Pom PentHouse"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-5xl text-[var(--gold)]",
						children: "Freehold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 opacity-80",
						children: "Ready to move · Full ownership · Lakeside Road, Pokhara"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap gap-3 justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: ui.openBooking,
							className: "btn-primary",
							children: "Book a Stay"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "btn-ghost text-[var(--sand)]",
							children: "Purchase Inquiry"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm opacity-60 accent-italic",
						children: "Prefer to try before you buy? Book a stay from रू25,500/night."
					})
				]
			})
		]
	});
}
var faqs = [
	{
		q: "Is it freehold?",
		a: "Yes, full freehold ownership. Ready to transfer."
	},
	{
		q: "Can I book nightly stays?",
		a: "Yes, via Book a Stay. 2-night minimum. Instant request."
	},
	{
		q: "How far is the lake really?",
		a: "180 meters, about a 3-minute walk to Phewa Lake."
	},
	{
		q: "Airport transfer?",
		a: "Yes, रू3,500 add-on at booking. 25 minutes from PKR."
	},
	{
		q: "Is the penthouse furnished?",
		a: "Fully. Linen, ceramics, oak, Sonos — move-in ready."
	}
];
function FAQ() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-24 max-w-[720px] mx-auto px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow text-center mb-5",
				children: "FAQ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "h1-lux text-center mb-12",
				children: "Questions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y border-y",
				children: faqs.map((f, i) => {
					const isOpen = open === i;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen(isOpen ? null : i),
						className: "w-full flex justify-between items-center py-5 text-left gap-6",
						"aria-expanded": isOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl md:text-2xl",
							children: f.q
						}), isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						initial: false,
						children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								height: 0,
								opacity: 0
							},
							animate: {
								height: "auto",
								opacity: 1
							},
							exit: {
								height: 0,
								opacity: 0
							},
							transition: {
								duration: .3,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pb-5 opacity-80",
								children: f.a
							})
						})
					})] }, i);
				})
			})
		]
	});
}
function MapSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-24 md:py-32",
		style: { background: "var(--sand-soft)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1200px] px-6 lg:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto mb-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-5",
						children: "Location"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "h1-lux",
						children: "Less than 200 meters from the lake"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 opacity-70 text-sm",
						children: "Pom PentHouse — Lakeside Road, Pokhara"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1606.8902719122848!2d83.9600202093067!3d28.209413397410657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995952ed26a383f%3A0x9b2bdf424583384a!2sPOM's%20Penthouse!5e1!3m2!1sen!2snp!4v1781969596939!5m2!1sen!2snp",
					width: "100%",
					height: "450",
					style: {
						border: 0,
						display: "block"
					},
					allowFullScreen: true,
					loading: "lazy",
					referrerPolicy: "no-referrer-when-downgrade",
					title: "Pom PentHouse location"
				})
			})]
		})
	});
}
function Footer() {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleContact = async (e) => {
		e.preventDefault();
		const form = e.target;
		const fd = new FormData(form);
		setLoading(true);
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: fd.get("name"),
					email: fd.get("email"),
					message: fd.get("message")
				})
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to send");
			toast.success("Message sent. We'll reply within 12h.");
			form.reset();
		} catch (err) {
			toast.error(err?.message || "Failed to send message");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		id: "contact",
		className: "border-t py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1200px] px-6 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleContact,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-2",
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "h2-lux mb-6",
						children: "Write to Pom"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						name: "name",
						placeholder: "Name",
						className: "w-full rounded-xl border px-4 py-3.5 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none transition"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "email",
						name: "email",
						placeholder: "Email",
						className: "w-full rounded-xl border px-4 py-3.5 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none transition"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						name: "message",
						rows: 5,
						placeholder: "Tell us about your stay or purchase interest…",
						className: "w-full rounded-xl border px-4 py-3.5 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none transition resize-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: loading,
						className: "btn-primary w-full justify-center mt-2 disabled:opacity-50",
						children: loading ? "Sending..." : "Send Message"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-3xl",
					children: "Pom PentHouse"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 opacity-80 leading-relaxed",
					children: [
						"Lakeside Road",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Pokhara 33700, Nepal",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"hello@pompenthouse.np",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"+977 61-XXXXXX"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "link-underline",
							href: "#",
							children: "Instagram"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "link-underline",
							href: "#",
							children: "Airbnb"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: ui.openBooking,
							className: "link-underline",
							children: "Check availability →"
						})
					]
				})
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1200px] px-6 lg:px-12 mt-16 pt-8 border-t text-sm opacity-60 flex justify-between flex-wrap gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Pom PentHouse · Designed in Pokhara" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "hello@pompenthouse.np" })]
		})]
	});
}
function getWhatsAppLink(booking) {
	return `https://wa.me/97761XXXXXX?text=${encodeURIComponent(`Hello, I've booked ${booking.penthouseName} from ${booking.checkIn} to ${booking.checkOut} (${booking.nights} nights, रू ${booking.total.toLocaleString("en-IN")}). Looking forward to my stay! — ${booking.guestName}`)}`;
}
function differenceInDays(a, b) {
	return Math.round((+a - +b) / 864e5);
}
function Stepper({ label, value, min, max, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: value <= min,
					onClick: () => onChange(value - 1),
					"aria-label": `Decrease ${label}`,
					className: "w-9 h-9 rounded-full border flex items-center justify-center disabled:opacity-30 hover:border-[var(--gold)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-6 text-center tabular-nums",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: value >= max,
					onClick: () => onChange(value + 1),
					"aria-label": `Increase ${label}`,
					className: "w-9 h-9 rounded-full border flex items-center justify-center disabled:opacity-30 hover:border-[var(--gold)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
				})
			]
		})]
	});
}
function Toggle({ on, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "switch",
		"aria-checked": on,
		"aria-label": label,
		onClick: () => onChange(!on),
		className: `w-11 h-6 rounded-full transition ${on ? "bg-[var(--gold)]" : "bg-stone-300"} relative`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}` })
	});
}
function BookingModal() {
	const { bookingOpen } = useUI();
	const [room, setRoom] = (0, import_react.useState)("entire");
	const [range, setRange] = (0, import_react.useState)();
	const [adults, setAdults] = (0, import_react.useState)(2);
	const [children, setChildren] = (0, import_react.useState)(0);
	const [infants, setInfants] = (0, import_react.useState)(0);
	const [addons, setAddons] = (0, import_react.useState)({
		airport: false,
		chef: false,
		cleaning: false,
		trek: false
	});
	const [form, setForm] = (0, import_react.useState)({
		firstName: "",
		lastName: "",
		email: "",
		phone: "+977 ",
		req: ""
	});
	const [carouselI, setCarouselI] = (0, import_react.useState)(0);
	const previewSrcs = (0, import_react.useMemo)(() => [photo(17).src, photo(18).src], []);
	(0, import_react.useEffect)(() => {
		if (!bookingOpen) return;
		const t = setInterval(() => setCarouselI((p) => (p + 1) % previewSrcs.length), 5e3);
		return () => clearInterval(t);
	}, [bookingOpen, previewSrcs.length]);
	(0, import_react.useEffect)(() => {
		if (!bookingOpen) return;
		const onKey = (e) => {
			if (e.key === "Escape") ui.closeBooking();
		};
		window.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [bookingOpen]);
	const nights = range?.from && range?.to ? Math.max(0, differenceInDays(range.to, range.from)) : 0;
	const price = calcPrice({
		room,
		nights: room === "long" ? 30 : nights,
		addons
	});
	const resetAll = () => {
		setRoom("entire");
		setRange(void 0);
		setAdults(2);
		setChildren(0);
		setInfants(0);
		setAddons({
			airport: false,
			chef: false,
			cleaning: false,
			trek: false
		});
		setForm({
			firstName: "",
			lastName: "",
			email: "",
			phone: "+977 ",
			req: ""
		});
	};
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [whatsappLink, setWhatsappLink] = (0, import_react.useState)("");
	const submit = async (e) => {
		e.preventDefault();
		if (room !== "long" && (!range?.from || !range?.to || nights < 2)) {
			toast.error("Select valid dates — 2-night minimum");
			return;
		}
		if (!form.firstName || !form.lastName || !form.email || !form.phone.trim()) {
			toast.error("Please complete guest details");
			return;
		}
		setSubmitting(true);
		try {
			const res = await fetch("/api/bookings", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					penthouse_name: ROOMS[room].label,
					guest_name: `${form.firstName} ${form.lastName}`,
					guest_email: form.email,
					guest_phone: form.phone,
					check_in: room === "long" ? (/* @__PURE__ */ new Date()).toISOString().split("T")[0] : range.from.toISOString().split("T")[0],
					check_out: room === "long" ? new Date(Date.now() + 30 * 864e5).toISOString().split("T")[0] : range.to.toISOString().split("T")[0],
					nights: room === "long" ? 30 : nights,
					total: price.total,
					guests: adults + children,
					addons,
					notes: form.req
				})
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Booking failed");
			setWhatsappLink(getWhatsAppLink({
				guestName: `${form.firstName} ${form.lastName}`,
				penthouseName: ROOMS[room].label,
				checkIn: room === "long" ? "Flexible" : range.from.toLocaleDateString(),
				checkOut: room === "long" ? "30+ days" : range.to.toLocaleDateString(),
				nights: room === "long" ? 30 : nights,
				total: price.total
			}));
			toast.success("Booking request sent! Check your email for confirmation.", { duration: 6e3 });
			ui.closeBooking();
			resetAll();
			setWhatsappLink("");
		} catch (err) {
			toast.error(err?.message || "Something went wrong. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: bookingOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "fixed inset-0 z-[90] flex items-center justify-center p-2 md:p-6",
		style: {
			background: "rgba(26,26,26,0.44)",
			backdropFilter: "blur(20px)"
		},
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .22 },
		onClick: ui.closeBooking,
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "booking-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-[var(--paper)] shadow-2xl",
			initial: {
				scale: .96,
				y: 16,
				opacity: 0
			},
			animate: {
				scale: 1,
				y: 0,
				opacity: 1
			},
			exit: {
				scale: .96,
				y: 16,
				opacity: 0
			},
			transition: {
				type: "spring",
				stiffness: 320,
				damping: 28
			},
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: ui.closeBooking,
				"aria-label": "Close",
				className: "absolute top-4 right-4 z-10 p-2 rounded-full bg-black/5 hover:bg-black/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[42%_58%]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 md:p-8 order-2 lg:order-1 lg:sticky lg:top-0 self-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[260px] rounded-2xl overflow-hidden relative",
							children: previewSrcs.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: s,
								alt: "Pom Penthouse preview",
								className: `absolute inset-0 object-cover w-full h-full transition-opacity duration-[1500ms] ${i === carouselI ? "opacity-100" : "opacity-0"} kenburns`
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 p-5 rounded-xl",
							style: { background: "var(--sand-soft)" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm opacity-70",
									children: "Pom PentHouse — Entire Place"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-3xl mt-1",
									children: ["रू 25,500 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base opacity-60",
										children: "/ night"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs mt-1 opacity-70",
									children: "★ 4.97 · 42 reviews"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm opacity-80",
							children: "3 Beds · Lake View · Wifi 600mbps · Kitchen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs opacity-70",
							children: "Free cancellation · 48h · Instant confirmation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-[160px] rounded-xl bg-[var(--sand-soft)] flex items-center justify-center text-sm opacity-60",
							children: "Lakeside Road, Pokhara"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs opacity-60",
							children: "Need help? WhatsApp +977 61-XXXXXX"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "p-6 md:p-10 order-1 lg:order-2 space-y-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "booking-title",
							className: "h2-lux",
							children: "Book Pom PentHouse"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-70 mt-1",
							children: "Live pricing · No commitment"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "eyebrow mb-3",
							children: "Stay"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: Object.keys(ROOMS).map((k) => {
								const r = ROOMS[k];
								const sel = room === k;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: `flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${sel ? "border-[var(--gold)] bg-[var(--gold)]/5" : "hover:border-[var(--gold)]/40"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "room",
										checked: sel,
										onChange: () => setRoom(k),
										className: "mt-1 accent-[var(--gold)]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: r.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm",
												children: [
													"रू",
													r.rate.toLocaleString("en-IN"),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "opacity-60",
														children: ["/ ", r.unit]
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs opacity-70 mt-1",
											children: r.blurb
										})]
									})]
								}, k);
							})
						})] }),
						room !== "long" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "eyebrow mb-3",
								children: "Dates"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border p-2 overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
									mode: "range",
									numberOfMonths: typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2,
									disabled: { before: /* @__PURE__ */ new Date() },
									min: 2,
									selected: range,
									onSelect: setRange,
									modifiers: { festival: {
										from: new Date(2026, 11, 28),
										to: new Date(2027, 0, 2)
									} },
									modifiersClassNames: { festival: "festival" }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs mt-2 opacity-70",
								children: range?.from && range?.to ? `${range.from.toLocaleDateString()} → ${range.to.toLocaleDateString()} · ${nights} nights` : "Select dates — 2-night minimum"
							}),
							range?.from && range?.to && nights < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-red-600 mt-1",
								children: "2-night minimum"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "eyebrow mb-1",
							children: "Guests"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "divide-y",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
									label: "Adults",
									value: adults,
									min: 1,
									max: 6,
									onChange: setAdults
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
									label: "Children",
									value: children,
									min: 0,
									max: 4,
									onChange: setChildren
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
									label: "Infants",
									value: infants,
									min: 0,
									max: 2,
									onChange: setInfants
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "eyebrow mb-3",
							children: "Add to your stay"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: ADDONS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: a.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs opacity-60 ml-2",
									children: [
										"रू",
										a.price,
										a.perNight ? " / night" : ""
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									on: addons[a.key],
									onChange: (v) => setAddons({
										...addons,
										[a.key]: v
									}),
									label: a.label
								})]
							}, a.key))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl p-5 text-sm",
							style: { background: "var(--sand-soft)" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: price.isLong ? `रू ${ROOMS.long.rate.toLocaleString("en-IN")} × ${price.units} month` : `रू ${ROOMS[room].rate.toLocaleString("en-IN")} × ${price.units} nights` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtNPR(price.base) })]
								}),
								!price.isLong && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cleaning fee" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtNPR(price.cleaningFee) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add-ons" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtNPR(price.addonsTotal) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between mt-1 opacity-70",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtNPR(price.subtotal) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Service fee 8%" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtNPR(price.serviceFee) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t mt-3 pt-3 flex justify-between font-medium text-base",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total NPR" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtNPR(price.total) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs opacity-60",
									children: "Taxes included. No hidden fees."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "eyebrow mb-3",
							children: "Guest Details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									placeholder: "First Name*",
									value: form.firstName,
									onChange: (e) => setForm({
										...form,
										firstName: e.target.value
									}),
									className: "rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									placeholder: "Last Name*",
									value: form.lastName,
									onChange: (e) => setForm({
										...form,
										lastName: e.target.value
									}),
									className: "rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "email",
									placeholder: "Email*",
									value: form.email,
									onChange: (e) => setForm({
										...form,
										email: e.target.value
									}),
									className: "rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none md:col-span-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									placeholder: "Phone*",
									value: form.phone,
									onChange: (e) => setForm({
										...form,
										phone: e.target.value
									}),
									className: "rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none md:col-span-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 3,
									placeholder: "Special Requests — late check-in, dietary needs, celebration…",
									value: form.req,
									onChange: (e) => setForm({
										...form,
										req: e.target.value
									}),
									className: "rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none md:col-span-2 resize-none"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: submitting,
							className: "btn-primary w-full justify-center disabled:opacity-50",
							children: submitting ? "Submitting..." : `Request to Book — Total ${fmtNPR(price.total)}`
						}),
						whatsappLink && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: whatsappLink,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "block text-center text-sm text-emerald-600 hover:underline mt-2",
							children: "Open WhatsApp to confirm →"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs opacity-60 text-center",
							children: "You won't be charged yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs opacity-60 text-center",
							children: "रू 67.5L purchase inquiries: hello@pompenthouse.np · Free cancellation 48h prior · Check-in 3PM / Check-out 11AM"
						})
					]
				})]
			})]
		})
	}) });
}
function Lightbox() {
	const { lightboxIndex } = useUI();
	const open = lightboxIndex !== null;
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") ui.closeLightbox();
			if (e.key === "ArrowRight") ui.setLightbox((lightboxIndex + 1) % IMAGES.length);
			if (e.key === "ArrowLeft") ui.setLightbox((lightboxIndex - 1 + IMAGES.length) % IMAGES.length);
		};
		window.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [open, lightboxIndex]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[80] bg-black/92 flex items-center justify-center",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: ui.closeLightbox,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: (e) => {
					e.stopPropagation();
					ui.closeLightbox();
				},
				className: "absolute top-5 right-5 text-white p-3 md:p-2",
				"aria-label": "Close",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: (e) => {
					e.stopPropagation();
					ui.setLightbox((lightboxIndex - 1 + IMAGES.length) % IMAGES.length);
				},
				className: "absolute left-4 text-white p-3 md:p-2",
				"aria-label": "Previous",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: (e) => {
					e.stopPropagation();
					ui.setLightbox((lightboxIndex + 1) % IMAGES.length);
				},
				className: "absolute right-4 text-white p-3 md:p-2",
				"aria-label": "Next",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .97,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				exit: {
					scale: .97,
					opacity: 0
				},
				transition: {
					type: "spring",
					stiffness: 300,
					damping: 28
				},
				className: "max-w-[90vw] max-h-[88vh] flex flex-col items-center",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: IMAGES[lightboxIndex].src,
					alt: IMAGES[lightboxIndex].alt,
					className: "max-h-[80vh] w-auto object-contain rounded-xl"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-white/80 text-sm tracking-[0.2em]",
					children: [
						String(lightboxIndex + 1).padStart(2, "0"),
						" /",
						" ",
						String(IMAGES.length).padStart(2, "0"),
						" · ",
						IMAGES[lightboxIndex].alt
					]
				})]
			}, lightboxIndex)
		]
	}) });
}
function FloatingBook() {
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setShow(window.scrollY > 400);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: ui.openBooking,
		className: "md:hidden fixed bottom-5 right-5 z-40 btn-primary !py-3 !px-5 text-sm shadow-[var(--shadow-lift)]",
		children: "Book"
	});
}
function BackToTop() {
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setShow(window.scrollY > 600);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => window.scrollTo({
			top: 0,
			behavior: "smooth"
		}),
		"aria-label": "Back to top",
		className: "hidden md:flex fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[var(--charcoal)] text-[var(--sand)] items-center justify-center shadow-[var(--shadow-lift)] hover:scale-105 transition",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { size: 18 })
	});
}
function SmoothScroll() {
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(pointer: coarse)").matches) return;
		let raf = 0;
		let lenis = null;
		(async () => {
			const { default: Lenis } = await import("../_libs/lenis.mjs").then((n) => n.t);
			lenis = new Lenis({
				lerp: .12,
				duration: 1.2,
				smoothWheel: true
			});
			const loop = (t) => {
				lenis?.raf(t);
				raf = requestAnimationFrame(loop);
			};
			raf = requestAnimationFrame(loop);
		})();
		return () => {
			cancelAnimationFrame(raf);
			lenis?.destroy();
		};
	}, []);
	return null;
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmoothScroll, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amenities, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Residence, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonial, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Location, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Offer, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingModal, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingBook, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToTop, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, { position: "top-center" })
	] });
}
//#endregion
export { Index as component };
