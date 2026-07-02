import { householdRating, type AnyItem, type Drink, type PantryItem, type Recipe, type Restaurant } from "./store";

export type SortKey =
  | "household" | "chase" | "chloe" | "lowest-cal" | "highest-protein"
  | "easiest" | "most-made" | "newest" | "alpha";

export type SectionFilter = "all" | "recipe" | "drink" | "restaurant" | "pantry";

export interface Filters {
  query: string;
  section: SectionFilter;
  tags: string[];
  minRating: number; // 0|3|4|5
  sort: SortKey;
}

const difficultyRank: Record<string, number> = { easy: 0, medium: 1, hard: 2 };

function recipeText(r: Recipe): string {
  return [r.name, r.cuisine, r.difficulty, r.notes, r.nextTimeNotes, r.tags.join(" "),
    r.ingredients.join(" "), r.instructions.join(" ")].filter(Boolean).join(" ").toLowerCase();
}
function drinkText(d: Drink): string {
  return [d.name, d.drinkKind, d.tasteNotes, d.tags.join(" "),
    d.ingredients?.join(" "), d.instructions?.join(" "),
    d.espresso?.bean, d.espresso?.milk].filter(Boolean).join(" ").toLowerCase();
}
function restaurantText(r: Restaurant): string {
  return [r.name, r.city, r.state, r.country, r.notes, r.tags.join(" "),
    ...r.dishes.map((d) => `${d.name} ${d.notes ?? ""}`),
    ...r.drinks.map((d) => `${d.name} ${d.notes ?? ""}`),
  ].filter(Boolean).join(" ").toLowerCase();
}

function pantryText(p: PantryItem): string {
  return [p.name, p.brand, p.category, p.notes, p.tags.join(" "), p.stores.join(" ")]
    .filter(Boolean).join(" ").toLowerCase();
}

export function itemText(it: AnyItem): string {
  if (it.kind === "recipe") return recipeText(it);
  if (it.kind === "drink") return drinkText(it);
  if (it.kind === "pantry") return pantryText(it);
  return restaurantText(it);
}

export function matches(it: AnyItem, f: Filters): boolean {
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

export function sortItems<T extends AnyItem>(items: T[], sort: SortKey): T[] {
  const arr = [...items];
  arr.sort((a, b) => {
    switch (sort) {
      case "household": return (householdRating(b) ?? -1) - (householdRating(a) ?? -1);
      case "chase": return (b.chaseRating ?? -1) - (a.chaseRating ?? -1);
      case "chloe": return (b.chloeRating ?? -1) - (a.chloeRating ?? -1);
      case "lowest-cal": {
        const av = a.kind === "recipe" ? (a.calories ?? Infinity) : Infinity;
        const bv = b.kind === "recipe" ? (b.calories ?? Infinity) : Infinity;
        return av - bv;
      }
      case "highest-protein": {
        const av = a.kind === "recipe" ? (a.protein ?? -1) : -1;
        const bv = b.kind === "recipe" ? (b.protein ?? -1) : -1;
        return bv - av;
      }
      case "easiest": {
        const av = a.kind === "recipe" ? (difficultyRank[a.difficulty ?? ""] ?? 9) : 9;
        const bv = b.kind === "recipe" ? (difficultyRank[b.difficulty ?? ""] ?? 9) : 9;
        return av - bv;
      }
      case "most-made": {
        const av = a.kind === "recipe" ? a.timesMade : 0;
        const bv = b.kind === "recipe" ? b.timesMade : 0;
        return bv - av;
      }
      case "newest": return b.createdAt - a.createdAt;
      case "alpha": return a.name.localeCompare(b.name);
    }
  });
  return arr;
}

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "household", label: "Household rating" },
  { value: "chase", label: "Chase rating" },
  { value: "chloe", label: "Chloe rating" },
  { value: "lowest-cal", label: "Lowest calories" },
  { value: "highest-protein", label: "Highest protein" },
  { value: "easiest", label: "Easiest" },
  { value: "most-made", label: "Most made" },
  { value: "newest", label: "Newest" },
  { value: "alpha", label: "A–Z" },
];
