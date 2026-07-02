import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cookbook-wjV0bgJQ.js
var $$splitComponentImporter = () => import("./cookbook-B_rSuTNy.mjs");
var Route = createFileRoute("/cookbook")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
function relTime(ts) {
	const days = Math.floor((Date.now() - ts) / 864e5);
	if (days <= 0) return "today";
	if (days === 1) return "yesterday";
	if (days < 14) return `${days}d ago`;
	if (days < 60) return `${Math.floor(days / 7)}w ago`;
	return `${Math.floor(days / 30)}mo ago`;
}
//#endregion
export { relTime as n, Route as t };
