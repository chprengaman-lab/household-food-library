import { i as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime, f as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Route$10 } from "./cookbook-wjV0bgJQ.mjs";
import { t as Route$11 } from "./cookbook._id-BuQZr9tc.mjs";
import { t as Route$12 } from "./drinks._id-COBiJgLt.mjs";
import { t as Route$13 } from "./new-5-fccoUK.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$14 } from "./out._id-DZ_3s23H.mjs";
import { t as Route$15 } from "./pantry._id-CiT9ZS_r.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C0vdO9sf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BlRFQr_6.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "The Library — Chloe & Chase" },
			{
				name: "description",
				content: "A private household food and drink library."
			},
			{
				property: "og:title",
				content: "The Library"
			},
			{
				property: "og:description",
				content: "A private household food and drink library."
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,600;1,9..144,900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			richColors: true,
			position: "top-center"
		})]
	});
}
var $$splitComponentImporter$8 = () => import("./pantry-Bubf-M-J.mjs");
var Route$8 = createFileRoute("/pantry")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./out-DVgPe4xx.mjs");
var Route$7 = createFileRoute("/out")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./favorites-Cp7ujJlX.mjs");
var Route$6 = createFileRoute("/favorites")({
	head: () => ({ meta: [{ title: "Favorites — Chloe & Chase" }, {
		name: "description",
		content: "Our highest-rated and most-loved items."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./drinks-9C77a_xd.mjs");
var Route$5 = createFileRoute("/drinks")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./routes-DrnnEeCd.mjs");
var Route$4 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "The Library — Chloe & Chase" }, {
		name: "description",
		content: "A private cookbook of everything we've made, sipped, and eaten out."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./pantry.index-ENnT8esr.mjs");
var Route$3 = createFileRoute("/pantry/")({
	head: () => ({ meta: [{ title: "Pantry — Chloe & Chase" }, {
		name: "description",
		content: "Products we recommend buying again."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./out.index-JPA4_Ojn.mjs");
var Route$2 = createFileRoute("/out/")({
	head: () => ({ meta: [{ title: "Going Out — Chloe & Chase" }, {
		name: "description",
		content: "Restaurants we love, dishes we crave."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./drinks.index-BO8HstWl.mjs");
var Route$1 = createFileRoute("/drinks/")({
	head: () => ({ meta: [{ title: "Drink Lab — Chloe & Chase" }, {
		name: "description",
		content: "Espresso, coffee, cocktails, and pours."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./cookbook.index-B1dausVs.mjs");
var Route = createFileRoute("/cookbook/")({
	head: () => ({ meta: [{ title: "Cookbook — Chloe & Chase" }, {
		name: "description",
		content: "Home recipes we've cooked together."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var PantryRoute = Route$8.update({
	id: "/pantry",
	path: "/pantry",
	getParentRoute: () => Route$9
});
var OutRoute = Route$7.update({
	id: "/out",
	path: "/out",
	getParentRoute: () => Route$9
});
var NewRoute = Route$13.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => Route$9
});
var FavoritesRoute = Route$6.update({
	id: "/favorites",
	path: "/favorites",
	getParentRoute: () => Route$9
});
var DrinksRoute = Route$5.update({
	id: "/drinks",
	path: "/drinks",
	getParentRoute: () => Route$9
});
var CookbookRoute = Route$10.update({
	id: "/cookbook",
	path: "/cookbook",
	getParentRoute: () => Route$9
});
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var PantryIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => PantryRoute
});
var OutIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => OutRoute
});
var DrinksIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => DrinksRoute
});
var CookbookIndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => CookbookRoute
});
var PantryIdRoute = Route$15.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => PantryRoute
});
var OutIdRoute = Route$14.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => OutRoute
});
var DrinksIdRoute = Route$12.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => DrinksRoute
});
var CookbookRouteChildren = {
	CookbookIdRoute: Route$11.update({
		id: "/$id",
		path: "/$id",
		getParentRoute: () => CookbookRoute
	}),
	CookbookIndexRoute
};
var CookbookRouteWithChildren = CookbookRoute._addFileChildren(CookbookRouteChildren);
var DrinksRouteChildren = {
	DrinksIdRoute,
	DrinksIndexRoute
};
var DrinksRouteWithChildren = DrinksRoute._addFileChildren(DrinksRouteChildren);
var OutRouteChildren = {
	OutIdRoute,
	OutIndexRoute
};
var OutRouteWithChildren = OutRoute._addFileChildren(OutRouteChildren);
var PantryRouteChildren = {
	PantryIdRoute,
	PantryIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	CookbookRoute: CookbookRouteWithChildren,
	DrinksRoute: DrinksRouteWithChildren,
	FavoritesRoute,
	NewRoute,
	OutRoute: OutRouteWithChildren,
	PantryRoute: PantryRoute._addFileChildren(PantryRouteChildren)
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
