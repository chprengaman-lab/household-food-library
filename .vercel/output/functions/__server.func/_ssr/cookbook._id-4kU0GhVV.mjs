import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as relTime } from "./cookbook-wjV0bgJQ.mjs";
import { t as Route } from "./cookbook._id-BuQZr9tc.mjs";
import { r as Trash2, u as Pencil, y as ArrowLeft } from "../_libs/lucide-react.mjs";
import { B as useStore, L as updateRecipe, N as householdRating, _ as Stepper, a as EmptyArt, c as HouseholdReadout, h as ReviewBadge, i as ConfirmDelete, k as deleteRecipe, m as RatingDial, n as AppShell, o as FavoriteBadges, p as Pill, s as Field, t as AiBadge, v as TagChip, x as WarningNotes, y as TextArea } from "./bits-Disrrj6m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cookbook._id-4kU0GhVV.js
var import_jsx_runtime = require_jsx_runtime();
function RecipeDetail() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const { recipes } = useStore();
	const r = recipes.find((x) => x.id === id);
	if (!r) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Not found",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/cookbook",
			className: "text-sm text-sienna",
			children: "← Back to Cookbook"
		})
	});
	const h = householdRating(r);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/cookbook",
				className: "inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Cookbook"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/new",
					search: {
						type: "recipe",
						edit: r.id
					},
					className: "inline-flex h-9 items-center gap-1.5 rounded-full bg-cream px-3 text-xs font-semibold text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
					name: r.name,
					onConfirm: () => {
						deleteRecipe(r.id);
						navigate({ to: "/cookbook" });
					},
					trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "grid h-9 w-9 place-items-center rounded-full bg-cream text-ink/60 hover:text-destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})
				})]
			})]
		}),
		r.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: r.photo,
			alt: r.name,
			className: "mb-5 h-56 w-full rounded-3xl object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
			kind: "recipe",
			className: "mb-5 h-44 w-full rounded-3xl"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1 flex items-baseline gap-2",
			children: r.needsReview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewBadge, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-[34px] leading-tight text-ink",
			children: r.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-ink/60 tnum",
			children: [
				r.cuisine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.cuisine }),
				r.calories != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [
						r.calories,
						" cal",
						r.aiGeneratedFields?.includes("calories") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiBadge, {})
					]
				}),
				r.protein != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [
						r.protein,
						"g protein",
						r.aiGeneratedFields?.includes("protein") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiBadge, {})
					]
				}),
				r.difficulty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.difficulty }),
				r.portion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.portion })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteBadges, { r })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-cream p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-wider text-ink/50",
						children: "Household"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tnum font-display text-3xl text-sienna",
						children: h != null ? h.toFixed(1) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[11px] text-ink/55 tnum",
						children: [
							"Chase ",
							r.chaseRating?.toFixed(1) ?? "—",
							" · Chloe ",
							r.chloeRating?.toFixed(1) ?? "—"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-cream p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-wider text-ink/50",
						children: "Times made"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 flex items-center justify-between gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
							value: r.timesMade,
							onChange: (v) => updateRecipe(r.id, {
								timesMade: v,
								lastMade: v > r.timesMade ? Date.now() : r.lastMade
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] text-ink/55",
						children: r.lastMade ? `Last ${relTime(r.lastMade)}` : "Never made"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningNotes, { tags: r.tags })
		}),
		r.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-1.5",
			children: r.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagChip, { tag: t }, t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				on: !!r.wouldMakeAgain,
				onClick: () => updateRecipe(r.id, { wouldMakeAgain: !r.wouldMakeAgain }),
				children: r.wouldMakeAgain ? "★ Would make again" : "Mark would make again"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Ingredients",
			children: r.ingredients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink/50",
				children: "None yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1.5",
				children: r.ingredients.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sienna",
						children: "·"
					}), it]
				}, i))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Instructions",
			children: r.instructions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink/50",
				children: "None yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-3",
				children: r.instructions.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 text-sm leading-relaxed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tnum mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sienna/10 text-[11px] font-bold text-sienna",
						children: i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it })]
				}, i))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Notes",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesEditor, {
				label: "",
				value: r.notes ?? "",
				onSave: (v) => updateRecipe(r.id, { notes: v }),
				placeholder: "Anything to remember about this one…"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "What to change next time",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesEditor, {
				label: "",
				value: r.nextTimeNotes ?? "",
				onSave: (v) => updateRecipe(r.id, { nextTimeNotes: v }),
				placeholder: "More garlic. Less salt. Try sourdough crumbs."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Ratings",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-2xl bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chase",
						value: r.chaseRating,
						onChange: (v) => updateRecipe(r.id, { chaseRating: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chloe",
						value: r.chloeRating,
						onChange: (v) => updateRecipe(r.id, { chloeRating: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseholdReadout, { r })
				]
			})
		})
	] });
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-xl text-ink",
			children: title
		}), children]
	});
}
function NotesEditor({ value, onSave, placeholder, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
			defaultValue: value,
			placeholder,
			onBlur: (e) => onSave(e.currentTarget.value)
		})
	});
}
//#endregion
export { RecipeDetail as component };
