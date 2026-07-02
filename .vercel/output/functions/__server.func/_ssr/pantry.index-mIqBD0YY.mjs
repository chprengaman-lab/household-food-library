import { i as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime, f as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as Plus } from "../_libs/lucide-react.mjs";
import { C as useStore, h as householdRating, n as PANTRY_CATEGORIES, t as AppShell } from "./store-XR4yUmbQ.mjs";
import { i as EmptyArt, l as MiniRating } from "./bits-CjCQ2eAY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pantry.index-mIqBD0YY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PantryList() {
	const { pantryItems } = useStore();
	const [cat, setCat] = (0, import_react.useState)("All");
	const filtered = (0, import_react.useMemo)(() => {
		return [...cat === "All" ? pantryItems : pantryItems.filter((p) => p.category === cat)].sort((a, b) => (householdRating(b) ?? -1) - (householdRating(a) ?? -1));
	}, [pantryItems, cat]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		kicker: "The household",
		title: "Pantry",
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/new",
			search: { type: "pantry" },
			className: "inline-flex h-9 items-center gap-1.5 rounded-full bg-saffron px-3 text-xs font-bold uppercase tracking-[0.14em] text-noir",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
				children: ["All", ...PANTRY_CATEGORIES].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCat(c),
					className: `shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${cat === c ? "bg-saffron text-noir" : "border border-bone/10 bg-graphite text-bone-dim hover:text-bone"}`,
					children: c
				}, c))
			}),
			filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-bone",
						children: cat === "All" ? "Nothing here yet" : `No ${cat} items yet`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "folio mt-2",
						children: "Add products you'd buy again"
					}),
					cat === "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/new",
						search: { type: "pantry" },
						className: "mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-saffron px-4 text-sm font-semibold text-noir",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add a pantry item"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 space-y-2",
				children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/pantry/$id",
					params: { id: p.id },
					className: "flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-saffron/30",
					children: [
						p.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.photo,
							alt: p.name,
							className: "h-14 w-14 shrink-0 rounded-lg object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
							kind: "pantry",
							className: "h-14 w-14 shrink-0 rounded-lg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display text-base text-bone",
										children: p.name
									}), p.wouldBuyAgain && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-[11px] text-saffron",
										"aria-label": "Would buy again",
										children: "★"
									})]
								}),
								p.brand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "folio truncate",
									children: p.brand
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "folio",
									children: [p.category, p.stores.length > 0 ? ` · ${p.stores[0]}` : ""]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, { r: p })
					]
				}, p.id))
			})
		]
	});
}
//#endregion
export { PantryList as component };
