import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime, f as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as ChevronDown, l as Plus, r as Trash2, u as Pencil, y as ArrowLeft } from "../_libs/lucide-react.mjs";
import { A as deleteRestaurant, B as useStore, E as addRestaurantItem, N as householdRating, P as restaurantLocation, R as updateRestaurant, a as EmptyArt, b as TextInput, c as HouseholdReadout, i as ConfirmDelete, j as deleteRestaurantItem, m as RatingDial, n as AppShell, p as Pill, s as Field, v as TagChip, x as WarningNotes, y as TextArea, z as updateRestaurantItem } from "./bits-Disrrj6m.mjs";
import { t as Route } from "./out._id-DZ_3s23H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/out._id-CsqidwYp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RestaurantDetail() {
	const { id } = Route.useParams();
	const { focus } = Route.useSearch();
	const navigate = useNavigate();
	const { restaurants } = useStore();
	const r = restaurants.find((x) => x.id === id);
	const [tab, setTab] = (0, import_react.useState)("food");
	const [newItemId, setNewItemId] = (0, import_react.useState)(null);
	if (!r) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Not found",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/out",
			className: "text-sm text-sienna",
			children: "← Back to Going Out"
		})
	});
	function changeTab(t) {
		setTab(t);
		setNewItemId(null);
	}
	const activeItems = tab === "food" ? r.dishes : r.drinks;
	const activeSection = tab === "food" ? "dishes" : "drinks";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/out",
				className: "inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Going Out"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/new",
					search: {
						type: "restaurant",
						edit: r.id
					},
					className: "inline-flex h-9 items-center gap-1.5 rounded-full bg-cream px-3 text-xs font-semibold text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
					name: r.name,
					onConfirm: () => {
						deleteRestaurant(r.id);
						navigate({ to: "/out" });
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
			kind: "restaurant",
			className: "mb-5 h-44 w-full rounded-3xl"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-[34px] leading-tight text-ink",
			children: r.name
		}),
		(r.city || r.state || r.country) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-ink/60",
			children: ["📍 ", restaurantLocation(r)]
		}),
		r.visitDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-0.5 text-xs text-bone-dim",
			children: ["Visited ", new Date(r.visitDate).toLocaleDateString(void 0, {
				month: "long",
				day: "numeric",
				year: "numeric"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseholdReadout, { r })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 space-y-4 rounded-2xl bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
				label: "Chase",
				value: r.chaseRating,
				onChange: (v) => updateRestaurant(r.id, { chaseRating: v })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
				label: "Chloe",
				value: r.chloeRating,
				onChange: (v) => updateRestaurant(r.id, { chloeRating: v })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Overall notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					defaultValue: r.notes ?? "",
					onBlur: (e) => updateRestaurant(r.id, { notes: e.currentTarget.value }),
					placeholder: "Vibe, service, what to order again…"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				on: !!r.wouldReturn,
				onClick: () => updateRestaurant(r.id, { wouldReturn: !r.wouldReturn }),
				children: r.wouldReturn ? "★ Would return" : "Mark would return"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningNotes, { tags: r.tags })
		}),
		r.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-1.5",
			children: r.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagChip, { tag: t }, t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-7 flex gap-1 rounded-2xl bg-cream p-1",
			children: ["food", "drinks"].map((t) => {
				const isActive = tab === t;
				const count = t === "food" ? r.dishes.length : r.drinks.length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => changeTab(t),
					className: `flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition-colors ${isActive ? "bg-card text-saffron shadow-sm" : "text-bone-dim hover:text-bone"}`,
					children: [t === "food" ? "Food" : "Drinks", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px] font-medium ${isActive ? "bg-saffron/15 text-saffron" : "bg-bone/10 text-bone-dim"}`,
						children: count
					})]
				}, t);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-2",
			children: [
				activeItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "py-8 text-center text-sm text-bone-dim",
					children: [
						"No ",
						tab === "food" ? "dishes" : "drinks",
						" yet — add one below."
					]
				}),
				activeItems.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemRow, {
					item: it,
					restaurantId: r.id,
					section: activeSection,
					initiallyOpen: focus === it.id || newItemId === it.id,
					highlighted: focus === it.id
				}, it.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddItemForm, {
					restaurantId: r.id,
					section: activeSection,
					onAdded: (addedId) => setNewItemId(addedId)
				})
			]
		})
	] });
}
function ItemRow({ item, restaurantId, section, initiallyOpen, highlighted }) {
	const [open, setOpen] = (0, import_react.useState)(initiallyOpen);
	const h = householdRating(item);
	const hasSubline = !!item.notes || item.chaseRating != null || item.chloeRating != null;
	const perPersonLabel = [item.chaseRating != null ? `C ${item.chaseRating.toFixed(1)}` : null, item.chloeRating != null ? `Ch ${item.chloeRating.toFixed(1)}` : null].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-2xl border bg-card transition-colors ${highlighted ? "border-sienna ring-2 ring-sienna/20" : "border-border"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((v) => !v),
			className: "flex w-full items-center gap-3 px-4 py-3 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-display text-base leading-snug text-bone",
						children: item.name
					}), item.wouldOrderAgain && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-[11px] leading-none text-saffron",
						"aria-label": "Would order again",
						children: "★"
					})]
				}), hasSubline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-0.5 flex min-w-0 items-center gap-2",
					children: [item.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 flex-1 truncate text-xs text-bone-dim",
						children: item.notes
					}), perPersonLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tnum ml-auto shrink-0 text-xs text-bone-dim",
						children: perPersonLabel
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tnum rounded-full bg-bone px-2 py-0.5 text-xs font-semibold text-noir",
					children: h != null ? h.toFixed(1) : "—"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 text-bone-dim transition-transform duration-200 ${open ? "rotate-180" : ""}` })]
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 border-t border-border px-4 pb-4 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						defaultValue: item.name,
						onBlur: (e) => updateRestaurantItem(restaurantId, section, item.id, { name: e.currentTarget.value })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Notes",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						defaultValue: item.notes ?? "",
						onBlur: (e) => updateRestaurantItem(restaurantId, section, item.id, { notes: e.currentTarget.value }),
						placeholder: "What stood out…"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 rounded-xl bg-graphite/60 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chase",
						value: item.chaseRating,
						onChange: (v) => updateRestaurantItem(restaurantId, section, item.id, { chaseRating: v })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chloe",
						value: item.chloeRating,
						onChange: (v) => updateRestaurantItem(restaurantId, section, item.id, { chloeRating: v })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						on: !!item.wouldOrderAgain,
						onClick: () => updateRestaurantItem(restaurantId, section, item.id, { wouldOrderAgain: !item.wouldOrderAgain }),
						children: item.wouldOrderAgain ? "★ Would order again" : "Mark would order again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
						name: item.name,
						onConfirm: () => deleteRestaurantItem(restaurantId, section, item.id),
						trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-destructive hover:opacity-80",
							children: "Delete"
						})
					})]
				})
			]
		})]
	});
}
function AddItemForm({ restaurantId, section, onAdded }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [chase, setChase] = (0, import_react.useState)(void 0);
	const [chloe, setChloe] = (0, import_react.useState)(void 0);
	const [wouldOrder, setWouldOrder] = (0, import_react.useState)(false);
	function reset() {
		setName("");
		setNotes("");
		setChase(void 0);
		setChloe(void 0);
		setWouldOrder(false);
	}
	function submit(e) {
		e.preventDefault();
		if (!name.trim()) return;
		onAdded(addRestaurantItem(restaurantId, section, {
			name: name.trim(),
			notes: notes.trim() || void 0,
			chaseRating: chase,
			chloeRating: chloe,
			wouldOrderAgain: wouldOrder
		}).id);
		reset();
		setOpen(false);
	}
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpen(true),
		className: "flex w-full items-center justify-center gap-2 rounded-2xl border border-saffron/20 bg-saffron/10 py-3.5 text-sm font-medium text-saffron transition-colors hover:bg-saffron/15",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), section === "dishes" ? "Add dish" : "Add drink"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-3 rounded-2xl border border-saffron/30 bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-base text-bone",
				children: section === "dishes" ? "New dish" : "New drink"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: name,
					onChange: (e) => setName(e.target.value),
					required: true,
					autoFocus: true,
					placeholder: section === "dishes" ? "Dish name" : "Drink name"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: notes,
					onChange: (e) => setNotes(e.target.value),
					placeholder: "First impressions…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-xl bg-graphite/60 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
					label: "Chase",
					value: chase,
					onChange: setChase
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
					label: "Chloe",
					value: chloe,
					onChange: setChloe
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				on: wouldOrder,
				onClick: () => setWouldOrder((v) => !v),
				children: wouldOrder ? "★ Would order again" : "Mark would order again"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "flex-1 rounded-xl bg-saffron py-2.5 text-sm font-semibold text-noir",
					children: "Save"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						reset();
						setOpen(false);
					},
					className: "rounded-xl border border-bone/15 px-4 py-2.5 text-sm text-bone-dim transition-colors hover:text-bone",
					children: "Cancel"
				})]
			})
		]
	});
}
//#endregion
export { RestaurantDetail as component };
