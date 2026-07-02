import { i as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime, f as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as Plus } from "../_libs/lucide-react.mjs";
import { B as useStore, M as drinkKindLabel, a as EmptyArt, n as AppShell, u as MiniRating, v as TagChip } from "./bits-Disrrj6m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drinks.index-BO8HstWl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	{
		value: "all",
		label: "All"
	},
	{
		value: "espresso",
		label: "Espresso"
	},
	{
		value: "coffee",
		label: "Coffee"
	},
	{
		value: "cocktail",
		label: "Cocktails"
	},
	{
		value: "mocktail",
		label: "Mocktails"
	},
	{
		value: "beer",
		label: "Beer"
	},
	{
		value: "wine",
		label: "Wine"
	}
];
function DrinkLab() {
	const { drinks } = useStore();
	const [kind, setKind] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => kind === "all" ? drinks : drinks.filter((d) => d.drinkKind === kind), [drinks, kind]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Drink Lab",
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/new",
			search: { type: "drink" },
			className: "grid h-11 w-11 place-items-center rounded-full bg-saffron text-noir shadow-md shadow-saffron/30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-5 mb-6 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
			children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setKind(t.value),
				className: `folio shrink-0 rounded-full px-3.5 py-2 transition-colors ${kind === t.value ? "bg-saffron text-noir" : "bg-slate text-bone-dim hover:text-bone"}`,
				children: t.label
			}, t.value))
		}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-bone",
					children: "Empty glass"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "folio mt-2",
					children: "Save a drink to remember the recipe"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/new",
					search: { type: "drink" },
					className: "mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-saffron px-4 text-sm font-semibold text-noir",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add a drink"]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
			children: list.map((d) => {
				const isEsp = d.drinkKind === "espresso";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/drinks/$id",
					params: { id: d.id },
					className: "card-forest block overflow-hidden rounded-lg",
					children: [d.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: d.photo,
						alt: d.name,
						className: "h-36 w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
						kind: isEsp ? "espresso" : "drink",
						className: "h-36 w-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "folio mb-1.5 text-saffron",
								children: drinkKindLabel[d.drinkKind]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-[22px] leading-tight text-bone",
								children: d.name
							}),
							isEsp && d.espresso && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-4 gap-1.5 rounded-md border border-bone/10 bg-noir/40 p-2 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Param, {
										k: "Dose",
										v: d.espresso.doseG != null ? `${d.espresso.doseG}g` : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Param, {
										k: "Yield",
										v: d.espresso.yieldG != null ? `${d.espresso.yieldG}g` : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Param, {
										k: "Time",
										v: d.espresso.brewTimeSec != null ? `${d.espresso.brewTimeSec}s` : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Param, {
										k: "Grind",
										v: d.espresso.grindSetting ?? "—"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, {
									r: d,
									tone: "dark"
								})
							}),
							d.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: d.tags.slice(0, 4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagChip, { tag: t }, t))
							})
						]
					})]
				}, d.id);
			})
		})]
	});
}
function Param({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "folio text-brass",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "tnum lining mt-0.5 text-sm font-semibold text-bone",
		children: v
	})] });
}
//#endregion
export { DrinkLab as component };
