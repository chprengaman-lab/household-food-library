import { i as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime, f as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as relTime } from "./cookbook-wjV0bgJQ.mjs";
import { d as Plus } from "../_libs/lucide-react.mjs";
import { C as useStore, t as AppShell } from "./store-XR4yUmbQ.mjs";
import { g as TagChip, i as EmptyArt, l as MiniRating, p as ReviewBadge } from "./bits-CjCQ2eAY.mjs";
import { n as sortItems, r as sortOptions } from "./search-Cgeedtg-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cookbook.index-B0qdXNA-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Cookbook() {
	const { recipes } = useStore();
	const [sort, setSort] = (0, import_react.useState)("most-made");
	const [tag, setTag] = (0, import_react.useState)(null);
	const allTags = (0, import_react.useMemo)(() => Array.from(new Set(recipes.flatMap((r) => r.tags))).sort(), [recipes]);
	const list = (0, import_react.useMemo)(() => {
		return sortItems(tag ? recipes.filter((r) => r.tags.includes(tag)) : recipes, sort);
	}, [
		recipes,
		sort,
		tag
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Cookbook",
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/new",
			search: { type: "recipe" },
			className: "grid h-11 w-11 place-items-center rounded-full bg-saffron text-noir shadow-md shadow-saffron/30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: sort,
					onChange: (e) => setSort(e.target.value),
					className: "h-9 rounded-md border border-bone/15 bg-graphite px-3 text-xs text-bone",
					children: sortOptions.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: o.value,
						children: o.label
					}, o.value))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "folio",
					children: [list.length, " recipes"]
				})]
			}),
			allTags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "-mx-5 mb-6 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagChip, {
					tag: "all",
					on: !tag,
					onClick: () => setTag(null)
				}), allTags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagChip, {
					tag: t,
					on: tag === t,
					onClick: () => setTag(tag === t ? null : t)
				}, t))]
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "divide-y divide-bone/10",
				children: list.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cookbook/$id",
					params: { id: r.id },
					className: "grid grid-cols-[44px_1fr_auto] items-start gap-4 py-5 transition-colors hover:bg-graphite/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tnum lining mt-1 font-display text-3xl text-saffron/85",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-[24px] leading-tight text-bone",
										children: r.name
									}), r.needsReview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewBadge, {})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "folio mt-1.5",
									children: [
										r.cuisine,
										r.difficulty,
										r.calories && `${r.calories} cal`,
										r.protein && `${r.protein}g protein`
									].filter(Boolean).join(" · ") || "Recipe"
								}),
								r.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-1.5",
									children: r.tags.slice(0, 4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagChip, { tag: t }, t))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniRating, { r })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "folio mt-2 text-bone-dim/55",
									children: [
										"Made ",
										r.timesMade,
										"× ",
										r.lastMade ? `· last ${relTime(r.lastMade)}` : ""
									]
								})
							]
						}),
						r.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: r.photo,
							alt: r.name,
							className: "h-20 w-20 shrink-0 rounded-md object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
							kind: "recipe",
							className: "h-20 w-20 shrink-0 rounded-md"
						})
					]
				}) }, r.id))
			})
		]
	});
}
function EmptyState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl text-bone",
				children: "No recipes yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "folio mt-2",
				children: "Start your shared cookbook"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/new",
				search: { type: "recipe" },
				className: "mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-saffron px-4 text-sm font-semibold text-noir",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add a recipe"]
			})
		]
	});
}
//#endregion
export { Cookbook as component };
