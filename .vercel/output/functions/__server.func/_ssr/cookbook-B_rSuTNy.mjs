import { f as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cookbook-B_rSuTNy.js
var import_jsx_runtime = require_jsx_runtime();
function relTime(ts) {
	const days = Math.floor((Date.now() - ts) / 864e5);
	if (days <= 0) return "today";
	if (days === 1) return "yesterday";
	if (days < 14) return `${days}d ago`;
	if (days < 60) return `${Math.floor(days / 7)}w ago`;
	return `${Math.floor(days / 30)}mo ago`;
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
//#endregion
export { SplitComponent as component, relTime };
