import { i as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime, f as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as useStore, M as drinkKindLabel, N as householdRating, P as restaurantLocation, a as EmptyArt, g as SectionTitle, n as AppShell, u as MiniRating } from "./bits-Disrrj6m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-Cp7ujJlX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Favorites() {
	const { recipes, drinks, restaurants, pantryItems } = useStore();
	const favs = (0, import_react.useMemo)(() => {
		return {
			fr: recipes.filter((r) => (householdRating(r) ?? 0) >= 4.5 || r.wouldMakeAgain),
			fd: drinks.filter((d) => (householdRating(d) ?? 0) >= 4.5),
			fres: restaurants.filter((r) => (householdRating(r) ?? 0) >= 4.5 || [...r.dishes, ...r.drinks].some((i) => i.wouldOrderAgain)),
			fp: pantryItems.filter((p) => (householdRating(p) ?? 0) >= 4.5 || p.wouldBuyAgain)
		};
	}, [
		recipes,
		drinks,
		restaurants,
		pantryItems
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Favorites",
		children: favs.fr.length + favs.fd.length + favs.fres.length + favs.fp.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl text-bone",
				children: "No favorites yet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "folio mt-2",
				children: "Rate 4.5+ or mark \"would make/buy again\""
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			favs.fr.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Recipes",
					number: "01",
					children: "From the kitchen"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "divide-y divide-bone/10",
					children: favs.fr.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cookbook/$id",
						params: { id: r.id },
						className: "grid grid-cols-[44px_1fr_auto] items-center gap-4 py-4 hover:bg-graphite/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tnum lining font-display text-2xl text-saffron/80",
								children: String(i + 1).padStart(2, "0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "truncate font-display text-xl text-bone",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "folio mt-1",
									children: [
										"Made ",
										r.timesMade,
										"×"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, { r })
						]
					}) }, r.id))
				})]
			}),
			favs.fd.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Drinks",
					number: "02",
					children: "The bar cart"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
					children: favs.fd.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/drinks/$id",
						params: { id: d.id },
						className: "card-forest block overflow-hidden rounded-lg",
						children: [d.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: d.photo,
							alt: d.name,
							className: "h-28 w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
							kind: d.drinkKind === "espresso" ? "espresso" : "drink",
							className: "h-28 w-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "folio mb-1 text-saffron",
									children: drinkKindLabel[d.drinkKind]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg text-bone",
									children: d.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, {
										r: d,
										tone: "dark"
									})
								})
							]
						})]
					}, d.id))
				})]
			}),
			favs.fres.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Places",
					number: "03",
					children: "Worth returning to"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: favs.fres.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/out/$id",
						params: { id: r.id },
						className: "card-journal block overflow-hidden rounded-lg p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "folio",
								children: restaurantLocation(r) || r.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-2xl italic text-bone",
								children: r.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "brass-rule mt-4 h-px opacity-50" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, { r })
							})
						]
					}, r.id))
				})]
			}),
			favs.fp.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Pantry",
					number: "04",
					children: "Worth buying again"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: favs.fp.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
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
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
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
					}, p.id))
				})]
			})
		] })
	});
}
//#endregion
export { Favorites as component };
