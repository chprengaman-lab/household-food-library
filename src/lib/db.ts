import { supabase } from "./supabase";
import type { Recipe, Drink, Restaurant, PantryItem } from "./store";

export const HOUSEHOLD = "prengaman";

// ── Mappers ───────────────────────────────────────────────────────────────────

export function recipeToRow(r: Recipe, email: string) {
  return {
    id: r.id,
    household_id: HOUSEHOLD,
    created_by: email,
    updated_by: email,
    created_at: new Date(r.createdAt).toISOString(),
    updated_at: new Date().toISOString(),
    name: r.name,
    photo: r.photo ?? null,
    ingredients: r.ingredients,
    instructions: r.instructions,
    notes: r.notes ?? null,
    next_time_notes: r.nextTimeNotes ?? null,
    calories: r.calories ?? null,
    protein: r.protein ?? null,
    difficulty: r.difficulty ?? null,
    portion: r.portion ?? null,
    cuisine: r.cuisine ?? null,
    tags: r.tags,
    chase_rating: r.chaseRating ?? null,
    chloe_rating: r.chloeRating ?? null,
    times_made: r.timesMade,
    last_made: r.lastMade != null ? new Date(r.lastMade).toISOString() : null,
    would_make_again: r.wouldMakeAgain ?? false,
    needs_review: r.needsReview ?? null,
    ai_generated_fields: r.aiGeneratedFields ?? null,
    ai_meta: r.aiMeta ?? null,
  };
}

export function rowToRecipe(row: any): Recipe {
  return {
    id: row.id,
    kind: "recipe",
    name: row.name,
    photo: row.photo ?? undefined,
    ingredients: row.ingredients ?? [],
    instructions: row.instructions ?? [],
    notes: row.notes ?? undefined,
    nextTimeNotes: row.next_time_notes ?? undefined,
    calories: row.calories ?? undefined,
    protein: row.protein ?? undefined,
    difficulty: row.difficulty ?? undefined,
    portion: row.portion ?? undefined,
    cuisine: row.cuisine ?? undefined,
    tags: row.tags ?? [],
    chaseRating: row.chase_rating ?? undefined,
    chloeRating: row.chloe_rating ?? undefined,
    timesMade: row.times_made ?? 0,
    lastMade: row.last_made != null ? new Date(row.last_made).getTime() : undefined,
    wouldMakeAgain: row.would_make_again ?? undefined,
    needsReview: row.needs_review ?? undefined,
    aiGeneratedFields: row.ai_generated_fields ?? undefined,
    aiMeta: row.ai_meta ?? undefined,
    createdAt: new Date(row.created_at).getTime(),
  };
}

export function drinkToRow(d: Drink, email: string) {
  return {
    id: d.id,
    household_id: HOUSEHOLD,
    created_by: email,
    updated_by: email,
    created_at: new Date(d.createdAt).toISOString(),
    updated_at: new Date().toISOString(),
    name: d.name,
    photo: d.photo ?? null,
    drink_kind: d.drinkKind,
    taste_notes: d.tasteNotes ?? null,
    ingredients: d.ingredients ?? null,
    instructions: d.instructions ?? null,
    tags: d.tags,
    chase_rating: d.chaseRating ?? null,
    chloe_rating: d.chloeRating ?? null,
    espresso: d.espresso ?? null,
    needs_review: d.needsReview ?? null,
    ai_generated_fields: d.aiGeneratedFields ?? null,
    ai_meta: d.aiMeta ?? null,
  };
}

export function rowToDrink(row: any): Drink {
  return {
    id: row.id,
    kind: "drink",
    drinkKind: row.drink_kind,
    name: row.name,
    photo: row.photo ?? undefined,
    ingredients: row.ingredients ?? undefined,
    instructions: row.instructions ?? undefined,
    tasteNotes: row.taste_notes ?? undefined,
    espresso: row.espresso ?? undefined,
    tags: row.tags ?? [],
    chaseRating: row.chase_rating ?? undefined,
    chloeRating: row.chloe_rating ?? undefined,
    needsReview: row.needs_review ?? undefined,
    aiGeneratedFields: row.ai_generated_fields ?? undefined,
    aiMeta: row.ai_meta ?? undefined,
    createdAt: new Date(row.created_at).getTime(),
  };
}

export function restaurantToRow(r: Restaurant, email: string) {
  return {
    id: r.id,
    household_id: HOUSEHOLD,
    created_by: email,
    updated_by: email,
    created_at: new Date(r.createdAt).toISOString(),
    updated_at: new Date().toISOString(),
    name: r.name,
    photo: r.photo ?? null,
    city: r.city ?? null,
    state: r.state ?? null,
    country: r.country ?? null,
    visit_date: r.visitDate != null ? new Date(r.visitDate).toISOString() : null,
    notes: r.notes ?? null,
    tags: r.tags,
    chase_rating: r.chaseRating ?? null,
    chloe_rating: r.chloeRating ?? null,
    would_return: r.wouldReturn ?? false,
    dishes: r.dishes,
    drinks: r.drinks,
  };
}

export function rowToRestaurant(row: any): Restaurant {
  return {
    id: row.id,
    kind: "restaurant",
    name: row.name,
    photo: row.photo ?? undefined,
    city: row.city ?? undefined,
    state: row.state ?? undefined,
    country: row.country ?? undefined,
    visitDate: row.visit_date != null ? new Date(row.visit_date).getTime() : undefined,
    notes: row.notes ?? undefined,
    tags: row.tags ?? [],
    chaseRating: row.chase_rating ?? undefined,
    chloeRating: row.chloe_rating ?? undefined,
    wouldReturn: row.would_return ?? undefined,
    dishes: row.dishes ?? [],
    drinks: row.drinks ?? [],
    createdAt: new Date(row.created_at).getTime(),
  };
}

export function pantryToRow(p: PantryItem, email: string) {
  return {
    id: p.id,
    household_id: HOUSEHOLD,
    created_by: email,
    updated_by: email,
    created_at: new Date(p.createdAt).toISOString(),
    updated_at: new Date().toISOString(),
    name: p.name,
    photo: p.photo ?? null,
    brand: p.brand ?? null,
    stores: p.stores,
    category: p.category,
    notes: p.notes ?? null,
    tags: p.tags,
    chase_rating: p.chaseRating ?? null,
    chloe_rating: p.chloeRating ?? null,
    would_buy_again: p.wouldBuyAgain ?? false,
    ai_generated_fields: p.aiGeneratedFields ?? null,
    ai_meta: p.aiMeta ?? null,
  };
}

export function rowToPantry(row: any): PantryItem {
  return {
    id: row.id,
    kind: "pantry",
    name: row.name,
    photo: row.photo ?? undefined,
    brand: row.brand ?? undefined,
    stores: row.stores ?? [],
    category: row.category,
    notes: row.notes ?? undefined,
    tags: row.tags ?? [],
    chaseRating: row.chase_rating ?? undefined,
    chloeRating: row.chloe_rating ?? undefined,
    wouldBuyAgain: row.would_buy_again ?? undefined,
    aiGeneratedFields: row.ai_generated_fields ?? undefined,
    aiMeta: row.ai_meta ?? undefined,
    createdAt: new Date(row.created_at).getTime(),
  };
}

// ── CloudStore ────────────────────────────────────────────────────────────────

export interface CloudStore {
  recipes: Recipe[];
  drinks: Drink[];
  restaurants: Restaurant[];
  pantryItems: PantryItem[];
}

// ── Fetch all ─────────────────────────────────────────────────────────────────

export async function fetchAllData(): Promise<CloudStore> {
  if (!supabase) throw new Error("[db] supabase client not initialized");

  const [recipesRes, drinksRes, restaurantsRes, pantryRes] = await Promise.all([
    supabase.from("recipes").select("*").eq("household_id", HOUSEHOLD).order("created_at", { ascending: false }),
    supabase.from("drinks").select("*").eq("household_id", HOUSEHOLD).order("created_at", { ascending: false }),
    supabase.from("restaurants").select("*").eq("household_id", HOUSEHOLD).order("created_at", { ascending: false }),
    supabase.from("pantry_items").select("*").eq("household_id", HOUSEHOLD).order("created_at", { ascending: false }),
  ]);

  if (recipesRes.error) throw recipesRes.error;
  if (drinksRes.error) throw drinksRes.error;
  if (restaurantsRes.error) throw restaurantsRes.error;
  if (pantryRes.error) throw pantryRes.error;

  return {
    recipes: (recipesRes.data ?? []).map(rowToRecipe),
    drinks: (drinksRes.data ?? []).map(rowToDrink),
    restaurants: (restaurantsRes.data ?? []).map(rowToRestaurant),
    pantryItems: (pantryRes.data ?? []).map(rowToPantry),
  };
}

// ── Sync functions ────────────────────────────────────────────────────────────

export async function dbUpsertRecipe(r: Recipe, email: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from("recipes").upsert(recipeToRow(r, email));
  if (error) console.error("[db] dbUpsertRecipe failed:", error.message);
}

export async function dbDeleteRecipe(id: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from("recipes").delete().eq("id", id);
  if (error) console.error("[db] dbDeleteRecipe failed:", error.message);
}

export async function dbUpsertDrink(d: Drink, email: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from("drinks").upsert(drinkToRow(d, email));
  if (error) console.error("[db] dbUpsertDrink failed:", error.message);
}

export async function dbDeleteDrink(id: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from("drinks").delete().eq("id", id);
  if (error) console.error("[db] dbDeleteDrink failed:", error.message);
}

export async function dbUpsertRestaurant(r: Restaurant, email: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from("restaurants").upsert(restaurantToRow(r, email));
  if (error) console.error("[db] dbUpsertRestaurant failed:", error.message);
}

export async function dbDeleteRestaurant(id: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from("restaurants").delete().eq("id", id);
  if (error) console.error("[db] dbDeleteRestaurant failed:", error.message);
}

export async function dbUpsertPantry(p: PantryItem, email: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from("pantry_items").upsert(pantryToRow(p, email));
  if (error) console.error("[db] dbUpsertPantry failed:", error.message);
}

export async function dbDeletePantry(id: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from("pantry_items").delete().eq("id", id);
  if (error) console.error("[db] dbDeletePantry failed:", error.message);
}

export async function dbClearAll(): Promise<void> {
  if (!supabase) return;
  await Promise.all([
    supabase.from("recipes").delete().eq("household_id", HOUSEHOLD),
    supabase.from("drinks").delete().eq("household_id", HOUSEHOLD),
    supabase.from("restaurants").delete().eq("household_id", HOUSEHOLD),
    supabase.from("pantry_items").delete().eq("household_id", HOUSEHOLD),
  ]);
}

export async function dbSeedAll(
  data: { recipes: Recipe[]; drinks: Drink[]; restaurants: Restaurant[]; pantryItems: PantryItem[] },
  email: string,
): Promise<void> {
  if (!supabase) return;
  const results = await Promise.allSettled([
    ...data.recipes.map((r) => supabase!.from("recipes").upsert(recipeToRow(r, email))),
    ...data.drinks.map((d) => supabase!.from("drinks").upsert(drinkToRow(d, email))),
    ...data.restaurants.map((r) => supabase!.from("restaurants").upsert(restaurantToRow(r, email))),
    ...data.pantryItems.map((p) => supabase!.from("pantry_items").upsert(pantryToRow(p, email))),
  ]);
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error("[db] dbSeedAll item", i, "failed:", r.reason);
  });
}
