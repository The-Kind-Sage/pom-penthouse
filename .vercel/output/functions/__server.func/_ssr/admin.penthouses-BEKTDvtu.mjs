import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Trash2, d as Plus, i as Upload, p as Pencil, t as X } from "../_libs/lucide-react.mjs";
import { a as useDeletePenthouse, i as useCreatePenthouse, o as usePenthouses, u as useUpdatePenthouse } from "./hooks-jthhuE6S.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.penthouses-BEKTDvtu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusStyles = {
	available: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
	booked: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
	maintenance: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
};
function Badge({ label, style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-block text-xs px-2 py-1 rounded-full font-medium ${style}`,
		children: label
	});
}
function PenthousesPage() {
	const { data: penthouses = [], isLoading } = usePenthouses();
	const createPenthouse = useCreatePenthouse();
	const updatePenthouse = useUpdatePenthouse();
	const deletePenthouse = useDeletePenthouse();
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		location: "",
		price_per_night: 0,
		description: "",
		max_guests: 2,
		bedrooms: 1,
		bathrooms: 1,
		status: "available",
		amenities: "",
		rules: ""
	});
	const [imageUrls, setImageUrls] = (0, import_react.useState)([]);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const openNew = () => {
		setEditing(null);
		setForm({
			name: "",
			location: "",
			price_per_night: 0,
			description: "",
			max_guests: 2,
			bedrooms: 1,
			bathrooms: 1,
			status: "available",
			amenities: "",
			rules: ""
		});
		setImageUrls([]);
		setShowForm(true);
	};
	const openEdit = (p) => {
		setEditing(p);
		setForm({
			name: p.name,
			location: p.location || "",
			price_per_night: p.price_per_night,
			description: p.description || "",
			max_guests: p.max_guests,
			bedrooms: p.bedrooms,
			bathrooms: p.bathrooms,
			status: p.status,
			amenities: p.amenities?.join(", ") || "",
			rules: p.rules?.join(", ") || ""
		});
		setImageUrls(p.images || []);
		setShowForm(true);
	};
	const handleUpload = async (e) => {
		const files = e.target.files;
		if (!files?.length) return;
		setUploading(true);
		try {
			const urls = [];
			for (const file of Array.from(files)) {
				const fd = new FormData();
				fd.append("file", file);
				fd.append("folder", "pom-penthouse");
				const data = await (await fetch("/api/upload", {
					method: "POST",
					body: fd
				})).json();
				if (data.url) urls.push(data.url);
			}
			setImageUrls((prev) => [...prev, ...urls]);
			toast.success(`${urls.length} image(s) uploaded`);
		} catch {
			toast.error("Upload failed");
		} finally {
			setUploading(false);
		}
	};
	const handleSave = async () => {
		if (!form.name.trim()) {
			toast.error("Name is required");
			return;
		}
		const payload = {
			name: form.name,
			location: form.location,
			price_per_night: form.price_per_night,
			description: form.description,
			max_guests: form.max_guests,
			bedrooms: form.bedrooms,
			bathrooms: form.bathrooms,
			status: form.status,
			amenities: form.amenities.split(",").map((s) => s.trim()).filter(Boolean),
			rules: form.rules.split(",").map((s) => s.trim()).filter(Boolean),
			image: imageUrls[0] || null,
			images: imageUrls
		};
		try {
			if (editing) {
				await updatePenthouse.mutateAsync({
					id: editing.id,
					...payload
				});
				toast.success("Penthouse updated");
			} else {
				await createPenthouse.mutateAsync(payload);
				toast.success("Penthouse added");
			}
			setShowForm(false);
		} catch {
			toast.error("Failed to save penthouse");
		}
	};
	const handleDelete = async (id) => {
		try {
			await deletePenthouse.mutateAsync(id);
			toast.success("Penthouse removed");
		} catch {
			toast.error("Failed to delete penthouse");
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20 text-sm text-foreground/60",
		children: "Loading penthouses..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between flex-wrap gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold",
					children: "Penthouses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-foreground/60",
					children: "Manage your property inventory"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openNew,
					className: "btn-primary text-sm py-2 px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Add Penthouse"]
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-12 px-4 py-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Location"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Price / Night"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Guests"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-4 py-3 font-medium",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y",
							children: penthouses.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/30 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: p.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: p.image,
											alt: p.name,
											className: "w-10 h-10 rounded-lg object-cover"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 rounded-lg bg-muted" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-medium",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-foreground/60",
										children: p.location
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3",
										children: ["रू", p.price_per_night.toLocaleString("en-IN")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											label: p.status,
											style: statusStyles[p.status]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: p.max_guests
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => openEdit(p),
												className: "p-1.5 rounded-lg hover:bg-muted transition",
												title: "Edit",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 15 })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleDelete(p.id),
												className: "p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition",
												title: "Delete",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 15 })
											})]
										})
									})
								]
							}, p.id))
						})]
					})
				}), penthouses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center py-8 text-sm text-foreground/60",
					children: "No penthouses yet — add your first one"
				})]
			}),
			showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/40",
				onClick: () => setShowForm(false)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-paper border rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-lg mb-4",
							children: editing ? "Edit Penthouse" : "Add Penthouse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Name*",
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									}),
									className: "w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Location",
									value: form.location,
									onChange: (e) => setForm({
										...form,
										location: e.target.value
									}),
									className: "w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											placeholder: "Price",
											value: form.price_per_night || "",
											onChange: (e) => setForm({
												...form,
												price_per_night: Number(e.target.value)
											}),
											className: "rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											placeholder: "Guests",
											value: form.max_guests || "",
											onChange: (e) => setForm({
												...form,
												max_guests: Number(e.target.value)
											}),
											className: "rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: form.status,
											onChange: (e) => setForm({
												...form,
												status: e.target.value
											}),
											className: "rounded-xl border px-4 py-3 bg-transparent outline-none text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "available",
													children: "Available"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "booked",
													children: "Booked"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "maintenance",
													children: "Maintenance"
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										placeholder: "Bedrooms",
										value: form.bedrooms || "",
										onChange: (e) => setForm({
											...form,
											bedrooms: Number(e.target.value)
										}),
										className: "rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										placeholder: "Bathrooms",
										value: form.bathrooms || "",
										onChange: (e) => setForm({
											...form,
											bathrooms: Number(e.target.value)
										}),
										className: "rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									placeholder: "Description",
									rows: 3,
									value: form.description,
									onChange: (e) => setForm({
										...form,
										description: e.target.value
									}),
									className: "w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm resize-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Amenities (comma separated)",
									value: form.amenities,
									onChange: (e) => setForm({
										...form,
										amenities: e.target.value
									}),
									className: "w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Rules (comma separated)",
									value: form.rules,
									onChange: (e) => setForm({
										...form,
										rules: e.target.value
									}),
									className: "w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium mb-1 block",
										children: "Property Images"
									}),
									imageUrls.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2 mb-3",
										children: imageUrls.map((url, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: url,
												alt: "",
												className: "w-20 h-20 rounded-lg object-cover"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setImageUrls((prev) => prev.filter((_, j) => j !== i)),
												className: "absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 10 })
											})]
										}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted/30 transition block",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
												multiple: true,
												onChange: handleUpload,
												className: "hidden"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
												size: 24,
												className: "mx-auto text-foreground/40 mb-2"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-foreground/60",
												children: uploading ? "Uploading..." : "Click or drag to upload images"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-foreground/40 mt-1",
												children: "Max 10MB per image"
											})
										]
									})
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSave,
								disabled: createPenthouse.isPending || updatePenthouse.isPending,
								className: "flex-1 btn-primary justify-center text-sm py-2 disabled:opacity-50",
								children: [editing ? "Update" : "Add", " Penthouse"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowForm(false),
								className: "flex-1 border rounded-full py-2 text-sm hover:bg-muted transition",
								children: "Cancel"
							})]
						})
					]
				})
			})] })
		]
	});
}
//#endregion
export { PenthousesPage as component };
