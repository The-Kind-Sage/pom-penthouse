import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { D as Check, S as Download, t as X, u as Search, x as Eye } from "../_libs/lucide-react.mjs";
import { l as useUpdateBooking, r as useBookings } from "./hooks-jthhuE6S.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.bookings-C1Q-NZpA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusStyles = {
	pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
	confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
	declined: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
	cancelled: "bg-stone-100 text-stone-600 dark:bg-stone-900/30 dark:text-stone-400",
	completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
};
var paymentStyles = {
	paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
	unpaid: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
	refunded: "bg-stone-100 text-stone-600 dark:bg-stone-900/30 dark:text-stone-400"
};
function Badge({ label, style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-block text-xs px-2 py-1 rounded-full font-medium ${style}`,
		children: label
	});
}
function BookingsPage() {
	const { data: bookings = [], isLoading } = useBookings();
	const updateBooking = useUpdateBooking();
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [selectedBooking, setSelectedBooking] = (0, import_react.useState)(null);
	const filtered = bookings.filter((b) => {
		if (statusFilter !== "all" && b.status !== statusFilter) return false;
		if (search && !b.guest_name.toLowerCase().includes(search.toLowerCase()) && !(b.penthouse_name || "").toLowerCase().includes(search.toLowerCase())) return false;
		return true;
	});
	const handleUpdateStatus = async (id, status) => {
		try {
			await updateBooking.mutateAsync({
				id,
				status
			});
			toast.success(`Booking ${status}`);
		} catch {
			toast.error("Failed to update booking");
		}
	};
	const downloadCSV = () => {
		if (filtered.length === 0) {
			toast.error("No bookings to export");
			return;
		}
		const headers = "ID,Guest,Penthouse,Check-in,Check-out,Total,Status\n";
		const rows = filtered.map((b) => `${b.id},${b.guest_name},${b.penthouse_name || ""},${b.check_in},${b.check_out},${b.total},${b.status}`).join("\n");
		const blob = new Blob([headers + rows], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "bookings.csv";
		a.click();
		URL.revokeObjectURL(url);
		toast.success("Bookings exported");
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20 text-sm text-foreground/60",
		children: "Loading bookings..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between flex-wrap gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold",
					children: "Bookings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-foreground/60",
					children: "Manage all reservations"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: downloadCSV,
						className: "flex items-center gap-2 text-sm border rounded-lg px-3 py-2 hover:bg-muted transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " Export"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 text-sm flex-1 min-w-[200px] max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 16,
						className: "text-foreground/40"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "Search guest or penthouse...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "bg-transparent outline-none w-full"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: statusFilter,
					onChange: (e) => setStatusFilter(e.target.value),
					className: "border rounded-lg px-3 py-2 text-sm bg-transparent outline-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "pending",
							children: "Pending"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "confirmed",
							children: "Confirmed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "completed",
							children: "Completed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "cancelled",
							children: "Cancelled"
						})
					]
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
									children: "Guest"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Penthouse"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Check-in"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Check-out"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Total"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Payment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y",
							children: filtered.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/30 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: b.guest_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-foreground/60",
											children: b.guest_email
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: b.penthouse_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: b.check_in
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: b.check_out
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3",
										children: ["रू", b.total.toLocaleString("en-IN")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											label: b.status,
											style: statusStyles[b.status]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											label: b.payment_status,
											style: paymentStyles[b.payment_status]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setSelectedBooking(b),
													className: "p-1.5 rounded-lg hover:bg-muted transition",
													title: "View",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 15 })
												}),
												b.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleUpdateStatus(b.id, "confirmed"),
													className: "p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-600 transition",
													title: "Approve",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleUpdateStatus(b.id, "declined"),
													className: "p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition",
													title: "Decline",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
												})] }),
												b.status === "confirmed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleUpdateStatus(b.id, "cancelled"),
													className: "p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition",
													title: "Cancel",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
												})
											]
										})
									})
								]
							}, b.id))
						})]
					})
				}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center py-8 text-sm text-foreground/60",
					children: "No bookings yet"
				})]
			}),
			selectedBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/40",
				onClick: () => setSelectedBooking(null)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-paper border rounded-2xl p-6 max-w-md w-full shadow-xl",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-lg",
								children: selectedBooking.guest_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-foreground/60",
								children: selectedBooking.guest_email
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								label: selectedBooking.status,
								style: statusStyles[selectedBooking.status]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/60",
										children: "Penthouse"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedBooking.penthouse_name })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/60",
										children: "Check-in"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedBooking.check_in })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/60",
										children: "Check-out"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedBooking.check_out })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/60",
										children: "Nights"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedBooking.nights })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/60",
										children: "Guests"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedBooking.guests })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between font-medium border-t pt-2 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["रू", selectedBooking.total.toLocaleString("en-IN")] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 mt-4",
							children: [selectedBooking.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									handleUpdateStatus(selectedBooking.id, "confirmed");
									setSelectedBooking(null);
								},
								className: "flex-1 btn-primary justify-center text-sm py-2",
								children: "Approve"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									handleUpdateStatus(selectedBooking.id, "declined");
									setSelectedBooking(null);
								},
								className: "flex-1 border rounded-full py-2 text-sm hover:bg-muted transition",
								children: "Decline"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedBooking(null),
								className: "flex-1 border rounded-full py-2 text-sm hover:bg-muted transition",
								children: "Close"
							})]
						})
					]
				})
			})] })
		]
	});
}
//#endregion
export { BookingsPage as component };
