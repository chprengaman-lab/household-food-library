import { i as __toESM } from "../_runtime.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as require_jsx_runtime, f as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as Settings, g as Coffee, h as Heart, m as Library, n as Utensils, s as ShoppingBag, y as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-XR4yUmbQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	{
		to: "/",
		label: "Library",
		icon: Library
	},
	{
		to: "/cookbook",
		label: "Cookbook",
		icon: BookOpen
	},
	{
		to: "/drinks",
		label: "Drinks",
		icon: Coffee
	},
	{
		to: "/out",
		label: "Going Out",
		icon: Utensils
	},
	{
		to: "/pantry",
		label: "Pantry",
		icon: ShoppingBag
	},
	{
		to: "/favorites",
		label: "Favorites",
		icon: Heart
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function AppShell({ children, kicker, title, right }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pb-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl px-5 pt-8",
			children: [(title || kicker || right) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [kicker && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "folio mb-3 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-7 bg-saffron/70" }), kicker]
						}), title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-[52px] font-medium leading-[0.9] tracking-[-0.025em] text-bone",
							children: title
						})]
					}), right && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shrink-0 pt-1",
						children: right
					})]
				}), title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "brass-rule mt-6 h-px" })]
			}), children]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "fixed inset-x-0 bottom-0 z-40 border-t border-bone/12 bg-noir/92 backdrop-blur-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-2xl items-stretch justify-around px-2 py-2.5",
				children: tabs.map((t) => {
					const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
					const Icon = t.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: t.to,
						className: `group relative flex flex-1 flex-col items-center gap-1 py-1.5 transition-colors ${active ? "text-saffron" : "text-bone-dim/70 hover:text-bone"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "h-[18px] w-[18px]",
								strokeWidth: active ? 2.2 : 1.6
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold tracking-wide",
								children: t.label
							}),
							active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-[10px] h-[2px] w-10 bg-saffron" })
						]
					}, t.to);
				})
			})
		})]
	});
}
var PANTRY_CATEGORIES = [
	"Coffee",
	"Dairy",
	"Meat",
	"Sauce",
	"Bread",
	"Produce",
	"Frozen",
	"Pantry",
	"Beverage",
	"Seasoning",
	"Other"
];
var KEY = "cookbook-v1";
function uid() {
	return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}
function seed() {
	const now = Date.now();
	return {
		recipes: [
			{
				id: uid(),
				kind: "recipe",
				name: "Garlicky Lemon Chicken",
				ingredients: [
					"4 chicken thighs",
					"6 garlic cloves",
					"1 lemon",
					"2 tbsp olive oil",
					"Parsley",
					"Salt & pepper"
				],
				instructions: [
					"Sear thighs skin-down 7 min.",
					"Flip, add garlic + lemon.",
					"Finish in oven 12 min at 400°F."
				],
				notes: "Pairs great with rice pilaf.",
				nextTimeNotes: "Try with capers.",
				calories: 520,
				protein: 42,
				difficulty: "easy",
				portion: "normal",
				cuisine: "Mediterranean",
				tags: [
					"chicken",
					"weeknight",
					"gluten free"
				],
				chaseRating: 5,
				chloeRating: 4.5,
				timesMade: 3,
				lastMade: now - 1e3 * 60 * 60 * 24 * 5,
				wouldMakeAgain: true,
				createdAt: now
			},
			{
				id: uid(),
				kind: "recipe",
				name: "Thai Basil Shrimp",
				ingredients: [
					"1 lb shrimp",
					"Thai basil",
					"Garlic",
					"Thai chili",
					"Fish sauce",
					"Soy sauce"
				],
				instructions: [
					"Sear shrimp 2 min.",
					"Add aromatics.",
					"Toss with basil, plate over rice."
				],
				notes: "Pretty spicy, balance with extra rice.",
				calories: 410,
				protein: 38,
				difficulty: "easy",
				portion: "normal",
				cuisine: "Thai",
				tags: [
					"seafood",
					"spicy",
					"shrimp"
				],
				chaseRating: 3.5,
				chloeRating: 3,
				timesMade: 1,
				lastMade: now - 1e3 * 60 * 60 * 24 * 22,
				wouldMakeAgain: true,
				createdAt: now - 1e3
			},
			{
				id: uid(),
				kind: "recipe",
				name: "Roasted Squash & Lentil Bowl",
				ingredients: [
					"1 delicata squash",
					"1 cup lentils",
					"Tahini",
					"Lemon",
					"Pomegranate",
					"Mint"
				],
				instructions: [
					"Roast squash at 425°F for 25 min.",
					"Simmer lentils 20 min.",
					"Whisk tahini-lemon dressing.",
					"Assemble bowl."
				],
				notes: "",
				calories: 460,
				protein: 22,
				difficulty: "easy",
				portion: "filling",
				cuisine: "Levantine",
				tags: ["vegetarian", "meal prep"],
				chloeRating: 4.5,
				timesMade: 2,
				lastMade: now - 1e3 * 60 * 60 * 24 * 12,
				wouldMakeAgain: true,
				createdAt: now - 2e3
			}
		],
		drinks: [{
			id: uid(),
			kind: "drink",
			drinkKind: "espresso",
			name: "Morning Cortado",
			espresso: {
				bean: "Onyx Monarch",
				doseG: 18,
				yieldG: 36,
				brewTimeSec: 28,
				grindSetting: "3.2",
				milk: "Whole"
			},
			tasteNotes: "Chocolatey, low acid. Dial 1:2.",
			tags: ["morning"],
			chaseRating: 5,
			chloeRating: 4.5,
			createdAt: now
		}, {
			id: uid(),
			kind: "drink",
			drinkKind: "cocktail",
			name: "Mezcal Paloma",
			ingredients: [
				"2 oz mezcal",
				"0.75 oz lime",
				"Grapefruit soda",
				"Salt rim"
			],
			instructions: [
				"Salt the rim.",
				"Build over ice.",
				"Top with grapefruit soda."
			],
			tasteNotes: "Smoky, bright.",
			tags: ["alcohol", "summer"],
			chaseRating: 4.5,
			chloeRating: 5,
			createdAt: now - 500
		}],
		restaurants: [{
			id: uid(),
			kind: "restaurant",
			name: "Carbone",
			city: "New York",
			state: "NY",
			notes: "Worth the hype. Save for special nights.",
			tags: ["italian", "date night"],
			chaseRating: 5,
			chloeRating: 5,
			dishes: [{
				id: uid(),
				name: "Spicy Rigatoni alla Vodka",
				notes: "Order extra bread.",
				chaseRating: 5,
				chloeRating: 5,
				wouldOrderAgain: true
			}, {
				id: uid(),
				name: "Veal Parmesan",
				notes: "Huge portion, split it.",
				chaseRating: 4.5,
				chloeRating: 4,
				wouldOrderAgain: true
			}],
			drinks: [{
				id: uid(),
				name: "Negroni",
				notes: "Classic, perfectly stirred.",
				chaseRating: 4.5,
				chloeRating: 4,
				wouldOrderAgain: true
			}],
			createdAt: now
		}, {
			id: uid(),
			kind: "restaurant",
			name: "Kann",
			city: "Portland",
			state: "OR",
			notes: "Live-fire Haitian. Get a counter seat.",
			tags: ["haitian", "seafood"],
			chaseRating: 3.5,
			chloeRating: 5,
			dishes: [{
				id: uid(),
				name: "Grilled Whole Fish",
				notes: "Smoky, perfect char.",
				chaseRating: 3,
				chloeRating: 5,
				wouldOrderAgain: false
			}, {
				id: uid(),
				name: "Plantain Gnocchi",
				notes: "Surprise of the night.",
				chaseRating: 5,
				chloeRating: 5,
				wouldOrderAgain: true
			}],
			drinks: [],
			createdAt: now - 800
		}],
		pantryItems: [{
			id: uid(),
			kind: "pantry",
			name: "Onyx Monarch",
			brand: "Onyx Coffee Lab",
			stores: ["Whole Foods", "onyx website"],
			category: "Coffee",
			notes: "Our go-to espresso bean. Sweet, chocolatey, pulls beautifully at 1:2.",
			tags: ["espresso", "light roast"],
			chaseRating: 5,
			chloeRating: 4.5,
			wouldBuyAgain: true,
			createdAt: now
		}, {
			id: uid(),
			kind: "pantry",
			name: "Calabrian Chili Paste",
			brand: "Tutto Calabria",
			stores: ["Eataly", "Amazon"],
			category: "Sauce",
			notes: "Goes in everything — pasta, eggs, grilled meats. Fruity heat.",
			tags: ["spicy", "italian"],
			chaseRating: 5,
			chloeRating: 4,
			wouldBuyAgain: true,
			createdAt: now - 500
		}]
	};
}
function load() {
	if (typeof window === "undefined") return {
		recipes: [],
		drinks: [],
		restaurants: [],
		pantryItems: []
	};
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) {
			const seeded = seed();
			localStorage.setItem(KEY, JSON.stringify(seeded));
			return seeded;
		}
		const p = JSON.parse(raw);
		return {
			recipes: p.recipes ?? [],
			drinks: p.drinks ?? [],
			restaurants: (p.restaurants ?? []).map((r) => {
				if (!r.city && r.location) {
					const parts = r.location.split(",").map((s) => s.trim());
					return {
						...r,
						city: parts[0] ?? r.location,
						state: parts[1] ?? void 0
					};
				}
				return r;
			}),
			pantryItems: p.pantryItems ?? []
		};
	} catch {
		return {
			recipes: [],
			drinks: [],
			restaurants: [],
			pantryItems: []
		};
	}
}
var cache = null;
var listeners = /* @__PURE__ */ new Set();
function snap() {
	if (cache === null) cache = load();
	return cache;
}
var emptyServer = {
	recipes: [],
	drinks: [],
	restaurants: [],
	pantryItems: []
};
function persist() {
	if (cache && typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(cache));
	listeners.forEach((l) => l());
}
function useStore() {
	return (0, import_react.useSyncExternalStore)((cb) => {
		listeners.add(cb);
		return () => listeners.delete(cb);
	}, snap, () => emptyServer);
}
function addRecipe(r) {
	const item = {
		...r,
		id: uid(),
		kind: "recipe",
		createdAt: Date.now(),
		timesMade: r.timesMade ?? 0,
		tags: r.tags ?? [],
		ingredients: r.ingredients ?? [],
		instructions: r.instructions ?? []
	};
	cache = {
		...snap(),
		recipes: [item, ...snap().recipes]
	};
	persist();
	return item;
}
function updateRecipe(id, patch) {
	cache = {
		...snap(),
		recipes: snap().recipes.map((r) => r.id === id ? {
			...r,
			...patch
		} : r)
	};
	persist();
}
function deleteRecipe(id) {
	cache = {
		...snap(),
		recipes: snap().recipes.filter((r) => r.id !== id)
	};
	persist();
}
function addDrink(d) {
	const item = {
		...d,
		id: uid(),
		kind: "drink",
		createdAt: Date.now(),
		tags: d.tags ?? []
	};
	cache = {
		...snap(),
		drinks: [item, ...snap().drinks]
	};
	persist();
	return item;
}
function updateDrink(id, patch) {
	cache = {
		...snap(),
		drinks: snap().drinks.map((d) => d.id === id ? {
			...d,
			...patch
		} : d)
	};
	persist();
}
function deleteDrink(id) {
	cache = {
		...snap(),
		drinks: snap().drinks.filter((d) => d.id !== id)
	};
	persist();
}
function addRestaurant(r) {
	const item = {
		...r,
		id: uid(),
		kind: "restaurant",
		createdAt: Date.now(),
		tags: r.tags ?? [],
		dishes: [],
		drinks: []
	};
	cache = {
		...snap(),
		restaurants: [item, ...snap().restaurants]
	};
	persist();
	return item;
}
function updateRestaurant(id, patch) {
	cache = {
		...snap(),
		restaurants: snap().restaurants.map((r) => r.id === id ? {
			...r,
			...patch
		} : r)
	};
	persist();
}
function deleteRestaurant(id) {
	cache = {
		...snap(),
		restaurants: snap().restaurants.filter((r) => r.id !== id)
	};
	persist();
}
function addRestaurantItem(restaurantId, section, item) {
	const next = {
		...item,
		id: uid()
	};
	const r = snap().restaurants.find((x) => x.id === restaurantId);
	if (!r) return next;
	updateRestaurant(restaurantId, { [section]: [...r[section], next] });
	return next;
}
function updateRestaurantItem(restaurantId, section, itemId, patch) {
	const r = snap().restaurants.find((x) => x.id === restaurantId);
	if (!r) return;
	updateRestaurant(restaurantId, { [section]: r[section].map((it) => it.id === itemId ? {
		...it,
		...patch
	} : it) });
}
function deleteRestaurantItem(restaurantId, section, itemId) {
	const r = snap().restaurants.find((x) => x.id === restaurantId);
	if (!r) return;
	updateRestaurant(restaurantId, { [section]: r[section].filter((it) => it.id !== itemId) });
}
function addPantryItem(p) {
	const item = {
		...p,
		id: uid(),
		kind: "pantry",
		createdAt: Date.now(),
		tags: p.tags ?? [],
		stores: p.stores ?? []
	};
	cache = {
		...snap(),
		pantryItems: [item, ...snap().pantryItems]
	};
	persist();
	return item;
}
function updatePantryItem(id, patch) {
	cache = {
		...snap(),
		pantryItems: snap().pantryItems.map((p) => p.id === id ? {
			...p,
			...patch
		} : p)
	};
	persist();
}
function deletePantryItem(id) {
	cache = {
		...snap(),
		pantryItems: snap().pantryItems.filter((p) => p.id !== id)
	};
	persist();
}
function clearAll() {
	cache = {
		recipes: [],
		drinks: [],
		restaurants: [],
		pantryItems: []
	};
	persist();
}
function restoreSeed() {
	cache = seed();
	persist();
}
function householdRating(r) {
	const c = r.chaseRating, l = r.chloeRating;
	if (c != null && l != null) return Math.round((c + l) / 2 * 10) / 10;
	return c ?? l;
}
function restaurantLocation(r) {
	return [
		r.city,
		r.state,
		r.country
	].filter(Boolean).join(", ");
}
var DISLIKES = [{
	person: "Chase",
	tag: "seafood"
}, {
	person: "Chloe",
	tag: "spicy"
}];
function warningsFor(tags) {
	const set = new Set(tags.map((t) => t.toLowerCase()));
	return DISLIKES.filter((d) => set.has(d.tag)).map((d) => `${d.person} may not enjoy this.`);
}
var drinkKindLabel = {
	espresso: "Espresso",
	coffee: "Coffee",
	cocktail: "Cocktail",
	mocktail: "Mocktail",
	beer: "Beer",
	wine: "Wine"
};
//#endregion
export { useStore as C, updateRestaurantItem as S, restoreSeed as _, addRecipe as a, updateRecipe as b, clearAll as c, deleteRecipe as d, deleteRestaurant as f, restaurantLocation as g, householdRating as h, addPantryItem as i, deleteDrink as l, drinkKindLabel as m, PANTRY_CATEGORIES as n, addRestaurant as o, deleteRestaurantItem as p, addDrink as r, addRestaurantItem as s, AppShell as t, deletePantryItem as u, updateDrink as v, warningsFor as w, updateRestaurant as x, updatePantryItem as y };
