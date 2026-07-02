import { a as Overlay2, c as Title2, d as require_jsx_runtime, i as Description2, l as Trigger2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as Trash2, u as RotateCcw } from "../_libs/lucide-react.mjs";
import { _ as restoreSeed, c as clearAll, t as AppShell } from "./store-XR4yUmbQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Bv3LutkT.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Settings",
		kicker: "Preferences",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-bone",
							children: "Demo Data"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "folio mt-1 text-bone-dim",
							children: "The app ships with sample content for browsing. Clear it when you're ready to start your own library, or restore it for portfolio demos."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-5 w-5 text-destructive" }),
						label: "Reset Demo Data",
						description: "Remove all sample content and start fresh",
						dialog: {
							title: "Reset demo data?",
							body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["This will permanently remove all sample recipes, drinks, restaurants, pantry items, dishes, and drinks.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "mt-2 block text-bone",
								children: "This cannot be undone."
							})] }),
							confirmLabel: "Reset",
							confirmClass: "bg-destructive text-white hover:opacity-90",
							onConfirm: () => {
								clearAll();
								toast.success("Done — you're starting fresh.");
							}
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-5 w-5 text-saffron" }),
						label: "Restore Demo Data",
						description: "Reload the original sample content — useful for portfolio demos",
						dialog: {
							title: "Restore demo data?",
							body: "This will replace all current content with the original sample recipes, drinks, restaurants, and pantry items. Any entries you've added will be lost.",
							confirmLabel: "Restore",
							confirmClass: "bg-saffron text-noir hover:opacity-90",
							onConfirm: () => {
								restoreSeed();
								toast.success("Demo data restored.");
							}
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "brass-rule mt-10 h-px opacity-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "folio mt-6 text-center text-bone-dim/60",
				children: "Household Library · built by Chase & Chloe"
			})
		]
	});
}
function ActionRow({ icon, label, description, dialog }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger2, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "flex w-full items-center gap-4 rounded-2xl border border-bone/10 bg-graphite px-5 py-4 text-left transition-colors hover:border-bone/20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-noir/60",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-bone",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-bone-dim",
					children: description
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, { className: "fixed inset-0 z-50 bg-noir/70 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
		className: "fixed left-1/2 top-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-bone/15 bg-graphite p-6 shadow-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
				className: "font-display text-xl text-bone",
				children: dialog.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-bone-dim",
					children: dialog.body
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
					className: "rounded-xl border border-bone/15 px-4 py-2.5 text-sm font-medium text-bone-dim transition-colors hover:text-bone",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					onClick: dialog.onConfirm,
					className: `rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity ${dialog.confirmClass}`,
					children: dialog.confirmLabel
				})]
			})
		]
	})] })] });
}
//#endregion
export { SettingsPage as component };
