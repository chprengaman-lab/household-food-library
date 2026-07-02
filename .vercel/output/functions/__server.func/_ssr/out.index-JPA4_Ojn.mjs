import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as Plus } from "../_libs/lucide-react.mjs";
import { B as useStore, N as householdRating, P as restaurantLocation, a as EmptyArt, n as AppShell, u as MiniRating, v as TagChip } from "./bits-Disrrj6m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/out.index-JPA4_Ojn.js
var import_jsx_runtime = require_jsx_runtime();
function GoingOut() {
	const { restaurants } = useStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Going Out",
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/new",
			search: { type: "restaurant" },
			className: "grid h-11 w-11 place-items-center rounded-full bg-saffron text-noir shadow-md shadow-saffron/30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
		}),
		children: restaurants.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-bone",
					children: "No spots yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "folio mt-2",
					children: "Remember a great meal out"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/new",
					search: { type: "restaurant" },
					className: "mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-saffron px-4 text-sm font-semibold text-noir",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add a restaurant"]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-5",
			children: restaurants.map((r) => {
				const topPick = (arr) => arr.slice().sort((a, b) => (householdRating(b) ?? -1) - (householdRating(a) ?? -1))[0];
				const favDish = topPick(r.dishes);
				const favDrink = topPick(r.drinks);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/out/$id",
					params: { id: r.id },
					className: "card-journal block overflow-hidden rounded-lg",
					children: [r.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: r.photo,
						alt: r.name,
						className: "h-40 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "folio",
											children: restaurantLocation(r) ? `📍 ${restaurantLocation(r)}` : "Restaurant"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-1 font-display text-[32px] italic leading-[1] text-bone",
											children: r.name
										}),
										r.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 flex flex-wrap gap-1.5",
											children: r.tags.slice(0, 4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagChip, { tag: t }, t))
										})
									]
								}), !r.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
									kind: "restaurant",
									className: "h-20 w-20 shrink-0 rounded-md"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "brass-rule mt-5 h-px opacity-50" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, { r })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 space-y-1 text-xs text-bone-dim",
								children: [
									favDish && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "folio shrink-0 text-saffron",
											children: "Fav dish"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-bone",
											children: favDish.name
										})]
									}),
									favDrink && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "folio shrink-0 text-saffron",
											children: "Fav drink"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-bone",
											children: favDrink.name
										})]
									}),
									r.wouldReturn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "folio shrink-0 text-saffron",
											children: "Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-bone",
											children: "★ Would return"
										})]
									})
								]
							})
						]
					})]
				}, r.id);
			})
		})
	});
}
//#endregion
export { GoingOut as component };
