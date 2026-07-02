import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as string, i as object, n as zodValidator, r as _enum, t as fallback } from "../_libs/tanstack__zod-adapter+zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-D9M-PFon.js
var $$splitComponentImporter = () => import("./new-knhpJeEZ.mjs");
var search = object({
	type: fallback(_enum([
		"recipe",
		"drink",
		"restaurant",
		"pantry"
	]), "recipe").default("recipe"),
	edit: fallback(string().optional(), void 0).default(void 0)
});
var Route = createFileRoute("/new")({
	validateSearch: zodValidator(search),
	head: () => ({ meta: [{ title: "Add — Chloe & Chase" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
