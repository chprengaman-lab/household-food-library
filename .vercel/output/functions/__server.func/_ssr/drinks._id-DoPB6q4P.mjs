import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as Trash2, u as Pencil, y as ArrowLeft } from "../_libs/lucide-react.mjs";
import { B as useStore, D as deleteDrink, F as updateDrink, M as drinkKindLabel, a as EmptyArt, c as HouseholdReadout, h as ReviewBadge, i as ConfirmDelete, m as RatingDial, n as AppShell, o as FavoriteBadges, s as Field, v as TagChip, x as WarningNotes, y as TextArea } from "./bits-Disrrj6m.mjs";
import { t as Route } from "./drinks._id-COBiJgLt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drinks._id-DoPB6q4P.js
var import_jsx_runtime = require_jsx_runtime();
function DrinkDetail() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const { drinks } = useStore();
	const d = drinks.find((x) => x.id === id);
	if (!d) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Not found",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/drinks",
			className: "text-sm text-sienna",
			children: "← Back to Drink Lab"
		})
	});
	const isEsp = d.drinkKind === "espresso";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/drinks",
				className: "inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Drink Lab"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/new",
					search: {
						type: "drink",
						edit: d.id
					},
					className: "inline-flex h-9 items-center gap-1.5 rounded-full bg-cream px-3 text-xs font-semibold text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
					name: d.name,
					onConfirm: () => {
						deleteDrink(d.id);
						navigate({ to: "/drinks" });
					},
					trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "grid h-9 w-9 place-items-center rounded-full bg-cream text-ink/60 hover:text-destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})
				})]
			})]
		}),
		d.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: d.photo,
			alt: d.name,
			className: "mb-5 h-56 w-full rounded-3xl object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
			kind: isEsp ? "espresso" : "drink",
			className: "mb-5 h-44 w-full rounded-3xl"
		}),
		d.needsReview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewBadge, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-sienna",
			children: drinkKindLabel[d.drinkKind]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-[34px] leading-tight text-ink",
			children: d.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteBadges, { r: d })
		}),
		isEsp && d.espresso && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl",
				children: "Dial-in"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 tnum",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Bean",
						v: d.espresso.bean ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Milk",
						v: d.espresso.milk ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Dose",
						v: d.espresso.doseG != null ? `${d.espresso.doseG} g` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Yield",
						v: d.espresso.yieldG != null ? `${d.espresso.yieldG} g` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Brew time",
						v: d.espresso.brewTimeSec != null ? `${d.espresso.brewTimeSec} s` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Grind",
						v: d.espresso.grindSetting ?? "—"
					})
				]
			})]
		}),
		(d.ingredients?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl",
				children: "Ingredients"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1.5",
				children: d.ingredients.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sienna",
						children: "·"
					}), i]
				}, idx))
			})]
		}),
		(d.instructions?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl",
				children: "Method"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-3",
				children: d.instructions.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 text-sm leading-relaxed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tnum mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sienna/10 text-[11px] font-bold text-sienna",
						children: idx + 1
					}), i]
				}, idx))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tasting notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					defaultValue: d.tasteNotes ?? "",
					onBlur: (e) => updateDrink(d.id, { tasteNotes: e.currentTarget.value }),
					placeholder: "Mouthfeel, balance, surprises…"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningNotes, { tags: d.tags })
		}),
		d.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-1.5",
			children: d.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagChip, { tag: t }, t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl",
				children: "Ratings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-2xl bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chase",
						value: d.chaseRating,
						onChange: (v) => updateDrink(d.id, { chaseRating: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chloe",
						value: d.chloeRating,
						onChange: (v) => updateDrink(d.id, { chloeRating: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseholdReadout, { r: d })
				]
			})]
		})
	] });
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-cream p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] font-semibold uppercase tracking-wider text-ink/45",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-base font-semibold text-ink",
			children: v
		})]
	});
}
//#endregion
export { DrinkDetail as component };
