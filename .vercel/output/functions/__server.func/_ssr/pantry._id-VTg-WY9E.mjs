import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime, f as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as Plus, f as Pencil, r as Trash2, t as X, x as ArrowLeft } from "../_libs/lucide-react.mjs";
import { C as useStore, t as AppShell, u as deletePantryItem, y as updatePantryItem } from "./store-XR4yUmbQ.mjs";
import { _ as TextArea, a as FavoriteBadges, d as Pill, f as RatingDial, g as TagChip, i as EmptyArt, l as MiniRating, o as Field, r as ConfirmDelete, s as HouseholdReadout, v as TextInput } from "./bits-CjCQ2eAY.mjs";
import { t as Route } from "./pantry._id-Dwtrhtxn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pantry._id-VTg-WY9E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PantryDetail() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const { pantryItems } = useStore();
	const p = pantryItems.find((x) => x.id === id);
	const [storeInput, setStoreInput] = (0, import_react.useState)("");
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Not found",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/pantry",
			className: "text-sm text-sienna",
			children: "← Back to Pantry"
		})
	});
	function addStore(e) {
		e.preventDefault();
		const val = storeInput.trim();
		if (!val || p.stores.includes(val)) return;
		updatePantryItem(p.id, { stores: [...p.stores, val] });
		setStoreInput("");
	}
	function removeStore(s) {
		updatePantryItem(p.id, { stores: p.stores.filter((x) => x !== s) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/pantry",
				className: "inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Pantry"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/new",
					search: {
						type: "pantry",
						edit: p.id
					},
					className: "inline-flex h-9 items-center gap-1.5 rounded-full bg-cream px-3 text-xs font-semibold text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
					name: p.name,
					onConfirm: () => {
						deletePantryItem(p.id);
						navigate({ to: "/pantry" });
					},
					trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "grid h-9 w-9 place-items-center rounded-full bg-cream text-ink/60 hover:text-destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})
				})]
			})]
		}),
		p.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: p.photo,
			alt: p.name,
			className: "mb-5 h-56 w-full rounded-3xl object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
			kind: "pantry",
			className: "mb-5 h-44 w-full rounded-3xl"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "folio rounded-full bg-saffron/10 px-2.5 py-0.5 text-saffron",
				children: p.category
			}), p.wouldBuyAgain && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "folio text-saffron",
				children: "★ Buy again"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-[34px] leading-tight text-ink",
			children: p.name
		}),
		p.brand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-ink/60",
			children: p.brand
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteBadges, { r: p })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseholdReadout, { r: p })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 space-y-4 rounded-2xl bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
				label: "Chase",
				value: p.chaseRating,
				onChange: (v) => updatePantryItem(p.id, { chaseRating: v })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
				label: "Chloe",
				value: p.chloeRating,
				onChange: (v) => updatePantryItem(p.id, { chloeRating: v })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				on: !!p.wouldBuyAgain,
				onClick: () => updatePantryItem(p.id, { wouldBuyAgain: !p.wouldBuyAgain }),
				children: p.wouldBuyAgain ? "★ Would buy again" : "Mark would buy again"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					defaultValue: p.notes ?? "",
					onBlur: (e) => updatePantryItem(p.id, { notes: e.currentTarget.value }),
					placeholder: "What makes this a household staple…"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
				label: "Available At",
				children: [p.stores.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 flex flex-wrap gap-1.5",
					children: p.stores.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full border border-bone/15 bg-graphite px-2.5 py-1 text-xs text-bone",
						children: [s, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => removeStore(s),
							className: "text-bone-dim hover:text-saffron",
							"aria-label": `Remove ${s}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
						})]
					}, s))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: addStore,
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: storeInput,
						onChange: (e) => setStoreInput(e.target.value),
						placeholder: "Whole Foods, Amazon, Costco…"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-saffron text-noir",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
					})]
				})]
			})
		}),
		p.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-1.5",
			children: p.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagChip, { tag: t }, t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, { r: p })
		})
	] });
}
//#endregion
export { PantryDetail as component };
