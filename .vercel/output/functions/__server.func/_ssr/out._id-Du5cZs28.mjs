import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as string, i as object, n as zodValidator, t as fallback } from "../_libs/tanstack__zod-adapter+zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/out._id-Du5cZs28.js
var $$splitComponentImporter = () => import("./out._id-B2VxCsOQ.mjs");
var search = object({ focus: fallback(string().optional(), void 0).default(void 0) });
var Route = createFileRoute("/out/$id")({
	validateSearch: zodValidator(search),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
