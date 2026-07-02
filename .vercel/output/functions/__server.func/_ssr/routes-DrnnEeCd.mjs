import { i as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime, f as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as relTime } from "./cookbook-wjV0bgJQ.mjs";
import { _ as BookOpen, c as Search, i as Store, l as Plus, m as Coffee, o as Sparkles, s as ShoppingBag, t as X, v as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { B as useStore, M as drinkKindLabel, N as householdRating, a as EmptyArt, g as SectionTitle, h as ReviewBadge, n as AppShell, u as MiniRating } from "./bits-Disrrj6m.mjs";
import { n as sortItems, t as matches } from "./search-CKMWn0V_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DrnnEeCd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Library() {
	const { recipes, drinks, restaurants, pantryItems } = useStore();
	const [query, setQuery] = (0, import_react.useState)("");
	if (query.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchResults, {
		query,
		setQuery
	});
	const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, {
		weekday: "long",
		month: "long",
		day: "numeric"
	});
	const totalMade = recipes.reduce((a, r) => a + r.timesMade, 0);
	const recentlyMade = [...recipes].filter((r) => r.lastMade).sort((a, b) => (b.lastMade ?? 0) - (a.lastMade ?? 0)).slice(0, 6);
	const favorites = [
		...recipes.filter((r) => (householdRating(r) ?? 0) >= 4.5),
		...drinks.filter((d) => (householdRating(d) ?? 0) >= 4.5),
		...restaurants.filter((r) => (householdRating(r) ?? 0) >= 4.5)
	].slice(0, 4);
	const continueCooking = [...recipes].filter((r) => r.timesMade <= 1).sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
	const latestDrinks = [...drinks].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);
	const latestRest = [...restaurants].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
	const latestPantry = [...pantryItems].filter((p) => p.wouldBuyAgain || (householdRating(p) ?? 0) >= 4).sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
	const needsReview = [...recipes.filter((r) => r.needsReview), ...drinks.filter((d) => d.needsReview)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "folio mb-4",
					children: dateStr
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-[64px] font-medium leading-[0.9] tracking-[-0.03em] text-bone",
					children: [
						"The",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-saffron",
							children: "Household"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Library."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "brass-rule mt-7 h-px" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-baseline justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "max-w-[62%] text-sm leading-relaxed text-bone-dim",
						children: [
							"Recipes, drinks, espresso notes, and places worth returning to — kept by ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-bone",
								children: "Chloe & Chase"
							}),
							"."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tnum lining font-display text-4xl text-bone",
							children: totalMade
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "folio mt-1",
							children: "Times cooked"
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mb-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-dim/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Search recipes, drinks, places, ingredients…",
				className: "h-12 w-full rounded-md border border-bone/15 bg-graphite pl-11 pr-4 text-sm text-bone shadow-lg shadow-black/30 outline-none ring-saffron/40 placeholder:text-bone-dim/55 focus:ring-2"
			})]
		}),
		recentlyMade.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				kicker: "Lately, on the stove",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TinyLink, {
					to: "/cookbook",
					children: "Cookbook"
				}),
				children: "Recently made"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: recentlyMade.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecipeFeatureCard, {
				r,
				idx: i + 1
			}, r.id)) })]
		}),
		favorites.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				kicker: "Rated 4.5 and above",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TinyLink, {
					to: "/favorites",
					children: "All"
				}),
				children: "Household favorites"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-6 gap-3",
				children: [favorites[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: hrefFor(favorites[0]),
					params: { id: favorites[0].id },
					className: "card-paper col-span-6 block overflow-hidden rounded-lg",
					children: [favorites[0].photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: favorites[0].photo,
						alt: favorites[0].name,
						className: "h-44 w-full rounded-none object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
						kind: artKind(favorites[0]),
						className: "h-44 w-full rounded-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "folio mb-2",
								children: "Top of the list"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-3xl leading-tight text-bone",
								children: favorites[0].name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, { r: favorites[0] })
							})
						]
					})]
				}), favorites.slice(1).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: hrefFor(it),
					params: { id: it.id },
					className: "card-paper col-span-3 block overflow-hidden rounded-lg",
					children: [it.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: it.photo,
						alt: it.name,
						className: "h-24 w-full rounded-none object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
						kind: artKind(it),
						className: "h-24 w-full rounded-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "line-clamp-2 font-display text-base leading-tight text-bone",
							children: it.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, { r: it })
						})]
					})]
				}, it.id))]
			})]
		}),
		continueCooking.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				kicker: "Made once or never",
				children: "Try these next"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "divide-y divide-bone/10",
				children: continueCooking.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cookbook/$id",
					params: { id: r.id },
					className: "grid grid-cols-[40px_1fr_auto] items-center gap-4 py-4 hover:bg-graphite/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tnum lining font-display text-3xl text-saffron/80",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "truncate font-display text-xl leading-tight text-bone",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "folio mt-1",
								children: [
									r.cuisine,
									r.difficulty,
									r.protein && `${r.protein}g protein`
								].filter(Boolean).join(" · ") || "Recipe"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 text-bone-dim/60" })
					]
				}) }, r.id))
			})]
		}),
		latestDrinks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				kicker: "Espresso, coffee, cocktails",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TinyLink, {
					to: "/drinks",
					children: "All"
				}),
				children: "The drink lab"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: latestDrinks.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrinkFeatureCard, { d }, d.id)) })]
		}),
		latestRest.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				kicker: "Restaurants & memorable meals",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TinyLink, {
					to: "/out",
					children: "All"
				}),
				children: "Worth returning to"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: latestRest.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestaurantEditorial, { r }, r.id))
			})]
		}),
		latestPantry.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				kicker: "Products we keep buying",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TinyLink, {
					to: "/pantry",
					children: "All"
				}),
				children: "Pantry staples"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: latestPantry.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PantryCard, { p }, p.id))
			})]
		}),
		needsReview.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				kicker: "Missing fields or AI-estimated",
				children: "Needs review"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1",
				children: needsReview.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: it.kind === "recipe" ? "/cookbook/$id" : "/drinks/$id",
					params: { id: it.id },
					className: "flex items-center justify-between border-b border-dashed border-bone/10 py-3 hover:text-saffron",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-lg text-bone",
							children: it.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "folio mt-0.5",
							children: [it.kind === "recipe" ? "Recipe" : "Drink", " · missing details"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewBadge, {})]
				}, it.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddMenu, {})
	] });
}
function hrefFor(it) {
	if (it.kind === "recipe") return "/cookbook/$id";
	if (it.kind === "drink") return "/drinks/$id";
	if (it.kind === "pantry") return "/pantry/$id";
	return "/out/$id";
}
function artKind(it) {
	if (it.kind === "recipe") return "recipe";
	if (it.kind === "drink") return it.drinkKind === "espresso" ? "espresso" : "drink";
	if (it.kind === "pantry") return "pantry";
	return "restaurant";
}
function TinyLink({ to, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "folio inline-flex items-center gap-1 text-saffron hover:text-bone",
		children: [
			children,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" })
		]
	});
}
function HorizontalScroll({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
		children
	});
}
function SearchResults({ query, setQuery }) {
	const { recipes, drinks, restaurants, pantryItems } = useStore();
	const filters = {
		query,
		section: "all",
		tags: [],
		minRating: 0,
		sort: "newest"
	};
	const q = query.trim().toLowerCase();
	const rRecipes = (0, import_react.useMemo)(() => sortItems(recipes.filter((r) => matches(r, filters)), "household"), [recipes, query]);
	const rDrinks = (0, import_react.useMemo)(() => sortItems(drinks.filter((d) => matches(d, filters)), "household"), [drinks, query]);
	const rRest = (0, import_react.useMemo)(() => {
		const base = restaurants.filter((r) => matches(r, filters));
		const extra = restaurants.filter((r) => !base.includes(r) && (r.dishes.some((d) => d.name.toLowerCase().includes(q) || (d.notes ?? "").toLowerCase().includes(q)) || r.drinks.some((d) => d.name.toLowerCase().includes(q) || (d.notes ?? "").toLowerCase().includes(q))));
		return [...base, ...extra];
	}, [restaurants, query]);
	const rPantry = (0, import_react.useMemo)(() => sortItems(pantryItems.filter((p) => matches(p, filters)), "household"), [pantryItems, query]);
	const total = rRecipes.length + rDrinks.length + rRest.length + rPantry.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		folio: "00",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-dim/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					autoFocus: true,
					value: query,
					onChange: (e) => setQuery(e.target.value),
					className: "h-12 w-full rounded-md border border-bone/15 bg-graphite pl-11 pr-4 text-sm text-bone outline-none ring-saffron/40 focus:ring-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "folio mb-6",
				children: [
					total,
					" ",
					total === 1 ? "result" : "results",
					" · \"",
					query,
					"\""
				]
			}),
			rRecipes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Recipes",
					children: "From the kitchen"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-3",
					children: rRecipes.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecipeFeatureCard, {
						r,
						idx: i + 1,
						full: true
					}, r.id))
				})]
			}),
			rDrinks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Drinks",
					children: "The bar cart"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-3",
					children: rDrinks.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrinkFeatureCard, {
						d,
						full: true
					}, d.id))
				})]
			}),
			rRest.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Places",
					children: "Out & about"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: rRest.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestaurantEditorial, {
						r,
						highlight: q
					}, r.id))
				})]
			}),
			rPantry.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Pantry",
					children: "Household staples"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: rPantry.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PantryCard, { p }, p.id))
				})]
			}),
			total === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mx-auto mb-2 h-5 w-5 text-saffron" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-bone",
						children: "No matches"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "folio mt-2",
						children: "Try a tag, ingredient, or restaurant name"
					})
				]
			})
		]
	});
}
function RecipeFeatureCard({ r, idx, full = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/cookbook/$id",
		params: { id: r.id },
		className: `card-paper group block overflow-hidden rounded-lg transition-transform hover:-translate-y-0.5 ${full ? "w-full" : "w-[230px] shrink-0"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [r.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: r.photo,
				alt: r.name,
				className: "h-32 w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
				kind: "recipe",
				className: "h-32 w-full"
			}), idx != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tnum lining absolute left-3 top-3 font-display text-2xl text-saffron drop-shadow-sm",
				children: String(idx).padStart(2, "0")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "folio mb-1.5",
					children: r.cuisine ?? r.difficulty ?? "Recipe"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "line-clamp-2 font-display text-[20px] leading-tight text-bone",
					children: r.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, { r })
				}),
				r.lastMade && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "folio mt-2 text-bone-dim/60",
					children: ["Made ", relTime(r.lastMade)]
				})
			]
		})]
	});
}
function DrinkFeatureCard({ d, full = false }) {
	const isEsp = d.drinkKind === "espresso";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/drinks/$id",
		params: { id: d.id },
		className: `card-forest block overflow-hidden rounded-lg ${full ? "w-full" : "w-[220px] shrink-0"}`,
		children: [d.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: d.photo,
			alt: d.name,
			className: "h-32 w-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
			kind: isEsp ? "espresso" : "drink",
			className: "h-32 w-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "folio mb-1.5 text-saffron",
					children: drinkKindLabel[d.drinkKind]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "line-clamp-2 font-display text-[20px] leading-tight text-bone",
					children: d.name
				}),
				isEsp && d.espresso && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "tnum lining mt-2 text-[11px] text-bone-dim",
					children: [
						d.espresso.doseG,
						"g → ",
						d.espresso.yieldG,
						"g · ",
						d.espresso.brewTimeSec,
						"s"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, {
						r: d,
						tone: "dark"
					})
				})
			]
		})]
	});
}
function RestaurantEditorial({ r, highlight }) {
	const q = highlight?.trim().toLowerCase();
	const hit = q ? [...r.dishes, ...r.drinks].find((it) => it.name.toLowerCase().includes(q) || (it.notes ?? "").toLowerCase().includes(q)) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/out/$id",
		params: { id: r.id },
		search: hit ? { focus: hit.id } : {},
		className: "card-journal block overflow-hidden rounded-lg p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "folio",
							children: r.location ?? "Restaurant"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-[28px] italic leading-[1] text-bone",
							children: r.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "folio mt-2 text-bone-dim/70",
							children: [
								r.dishes.length,
								" dishes · ",
								r.drinks.length,
								" drinks"
							]
						}),
						hit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs italic text-saffron",
							children: ["↳ ", hit.name]
						})
					]
				}), r.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: r.photo,
					alt: r.name,
					className: "h-16 w-16 shrink-0 rounded-md object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
					kind: "restaurant",
					className: "h-16 w-16 shrink-0 rounded-md"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "brass-rule mt-4 h-px opacity-50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, { r })
			})
		]
	});
}
function PantryCard({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/pantry/$id",
		params: { id: p.id },
		className: "flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-saffron/30",
		children: [
			p.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p.photo,
				alt: p.name,
				className: "h-12 w-12 shrink-0 rounded-lg object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
				kind: "pantry",
				className: "h-12 w-12 shrink-0 rounded-lg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-display text-base text-bone",
						children: p.name
					}), p.wouldBuyAgain && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-[11px] text-saffron",
						children: "★"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "folio",
					children: [p.brand ? `${p.brand} · ` : "", p.category]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, { r: p })
		]
	});
}
function AddMenu() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setOpen(true),
		className: "fixed bottom-24 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-noir shadow-lg shadow-saffron/30 transition-transform hover:scale-[1.03]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add"]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-noir/70 backdrop-blur-sm",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl rounded-t-2xl border-t border-bone/15 bg-graphite p-5 pb-8 shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-bone",
					children: "What are we adding?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(false),
					className: "grid h-9 w-9 place-items-center rounded-full bg-slate text-bone-dim hover:text-bone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddOption, {
						to: "/new",
						search: { type: "recipe" },
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }),
						label: "Add Recipe",
						desc: "Home cooking",
						onClick: () => setOpen(false)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddOption, {
						to: "/new",
						search: { type: "drink" },
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "h-4 w-4" }),
						label: "Add Drink",
						desc: "Espresso, cocktails, wine…",
						onClick: () => setOpen(false)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddOption, {
						to: "/new",
						search: { type: "restaurant" },
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4" }),
						label: "Add Restaurant Visit",
						desc: "With dishes & drinks ordered",
						onClick: () => setOpen(false)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddOption, {
						to: "/new",
						search: { type: "pantry" },
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }),
						label: "Add Pantry Item",
						desc: "Products we'd buy again",
						onClick: () => setOpen(false)
					})
				]
			})]
		})
	})] });
}
function AddOption({ to, search, icon, label, desc, onClick, accent = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		search,
		onClick,
		className: `flex items-center gap-3 rounded-xl border p-4 transition-colors ${accent ? "border-saffron/40 bg-saffron/[0.06] hover:border-saffron" : "border-bone/10 bg-noir/50 hover:border-saffron/40"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `grid h-9 w-9 place-items-center rounded-full ${accent ? "bg-saffron text-noir" : "bg-slate text-saffron"}`,
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-lg text-bone",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "folio",
				children: desc
			})]
		})]
	});
}
//#endregion
export { Library as component };
