import { h as householdRating } from "./store-XR4yUmbQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-Cgeedtg-.js
var difficultyRank = {
	easy: 0,
	medium: 1,
	hard: 2
};
function recipeText(r) {
	return [
		r.name,
		r.cuisine,
		r.difficulty,
		r.notes,
		r.nextTimeNotes,
		r.tags.join(" "),
		r.ingredients.join(" "),
		r.instructions.join(" ")
	].filter(Boolean).join(" ").toLowerCase();
}
function drinkText(d) {
	return [
		d.name,
		d.drinkKind,
		d.tasteNotes,
		d.tags.join(" "),
		d.ingredients?.join(" "),
		d.instructions?.join(" "),
		d.espresso?.bean,
		d.espresso?.milk
	].filter(Boolean).join(" ").toLowerCase();
}
function restaurantText(r) {
	return [
		r.name,
		r.city,
		r.state,
		r.country,
		r.notes,
		r.tags.join(" "),
		...r.dishes.map((d) => `${d.name} ${d.notes ?? ""}`),
		...r.drinks.map((d) => `${d.name} ${d.notes ?? ""}`)
	].filter(Boolean).join(" ").toLowerCase();
}
function pantryText(p) {
	return [
		p.name,
		p.brand,
		p.category,
		p.notes,
		p.tags.join(" "),
		p.stores.join(" ")
	].filter(Boolean).join(" ").toLowerCase();
}
function itemText(it) {
	if (it.kind === "recipe") return recipeText(it);
	if (it.kind === "drink") return drinkText(it);
	if (it.kind === "pantry") return pantryText(it);
	return restaurantText(it);
}
function matches(it, f) {
	if (f.section !== "all" && it.kind !== f.section) return false;
	if (f.tags.length && !f.tags.every((t) => it.tags.includes(t))) return false;
	if (f.minRating > 0) {
		const h = householdRating(it);
		if (h == null || h < f.minRating) return false;
	}
	if (f.query.trim()) {
		const q = f.query.trim().toLowerCase();
		if (!itemText(it).includes(q)) return false;
	}
	return true;
}
function sortItems(items, sort) {
	const arr = [...items];
	arr.sort((a, b) => {
		switch (sort) {
			case "household": return (householdRating(b) ?? -1) - (householdRating(a) ?? -1);
			case "chase": return (b.chaseRating ?? -1) - (a.chaseRating ?? -1);
			case "chloe": return (b.chloeRating ?? -1) - (a.chloeRating ?? -1);
			case "lowest-cal": return (a.kind === "recipe" ? a.calories ?? Infinity : Infinity) - (b.kind === "recipe" ? b.calories ?? Infinity : Infinity);
			case "highest-protein": {
				const av = a.kind === "recipe" ? a.protein ?? -1 : -1;
				return (b.kind === "recipe" ? b.protein ?? -1 : -1) - av;
			}
			case "easiest": return (a.kind === "recipe" ? difficultyRank[a.difficulty ?? ""] ?? 9 : 9) - (b.kind === "recipe" ? difficultyRank[b.difficulty ?? ""] ?? 9 : 9);
			case "most-made": {
				const av = a.kind === "recipe" ? a.timesMade : 0;
				return (b.kind === "recipe" ? b.timesMade : 0) - av;
			}
			case "newest": return b.createdAt - a.createdAt;
			case "alpha": return a.name.localeCompare(b.name);
		}
	});
	return arr;
}
var sortOptions = [
	{
		value: "household",
		label: "Household rating"
	},
	{
		value: "chase",
		label: "Chase rating"
	},
	{
		value: "chloe",
		label: "Chloe rating"
	},
	{
		value: "lowest-cal",
		label: "Lowest calories"
	},
	{
		value: "highest-protein",
		label: "Highest protein"
	},
	{
		value: "easiest",
		label: "Easiest"
	},
	{
		value: "most-made",
		label: "Most made"
	},
	{
		value: "newest",
		label: "Newest"
	},
	{
		value: "alpha",
		label: "A–Z"
	}
];
//#endregion
export { sortItems as n, sortOptions as r, matches as t };
