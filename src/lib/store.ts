import { useSyncExternalStore } from "react";
import { supabase } from "./supabase";
import {
  fetchAllData, dbUpsertRecipe, dbDeleteRecipe,
  dbUpsertDrink, dbDeleteDrink, dbUpsertRestaurant,
  dbDeleteRestaurant, dbUpsertPantry, dbDeletePantry,
  dbClearAll, dbSeedAll,
} from "./db";

export type Difficulty = "easy" | "medium" | "hard";
export type Portion = "light" | "normal" | "filling";
export type DrinkKind = "espresso" | "coffee" | "cocktail" | "mocktail" | "beer" | "wine";

export interface Ratings {
  chaseRating?: number; // 0..5 in 0.5 steps
  chloeRating?: number;
}

export interface AiMeta {
  generatedAt: number;
  generatedBy: "Anthropic";
  model: string;
  promptVersion: number;
}

export interface Recipe extends Ratings {
  id: string;
  kind: "recipe";
  name: string;
  photo?: string;
  ingredients: string[];
  instructions: string[];
  notes?: string;
  nextTimeNotes?: string;
  calories?: number;
  protein?: number;
  difficulty?: Difficulty;
  portion?: Portion;
  cuisine?: string;
  tags: string[];
  timesMade: number;
  lastMade?: number;
  wouldMakeAgain?: boolean;
  needsReview?: boolean;
  aiGeneratedFields?: string[];
  aiMeta?: AiMeta;
  createdAt: number;
}

export interface EspressoFields {
  bean?: string;
  doseG?: number;
  yieldG?: number;
  brewTimeSec?: number;
  grindSetting?: string;
  milk?: string;
}

export interface Drink extends Ratings {
  id: string;
  kind: "drink";
  drinkKind: DrinkKind;
  name: string;
  photo?: string;
  ingredients?: string[];
  instructions?: string[];
  tasteNotes?: string;
  espresso?: EspressoFields;
  tags: string[];
  needsReview?: boolean;
  aiGeneratedFields?: string[];
  aiMeta?: AiMeta;
  createdAt: number;
}

export interface RestaurantItem extends Ratings {
  id: string;
  name: string;
  notes?: string;
  wouldOrderAgain?: boolean;
}

export interface Restaurant extends Ratings {
  id: string;
  kind: "restaurant";
  name: string;
  /** @deprecated use city/state/country */ location?: string;
  city?: string;
  state?: string;
  country?: string;
  visitDate?: number;
  photo?: string;
  notes?: string;
  tags: string[];
  wouldReturn?: boolean;
  dishes: RestaurantItem[];
  drinks: RestaurantItem[];
  createdAt: number;
}

export type PantryCategory =
  | "Coffee" | "Dairy" | "Meat" | "Sauce" | "Bread"
  | "Produce" | "Frozen" | "Pantry" | "Beverage" | "Seasoning" | "Other";

export const PANTRY_CATEGORIES: PantryCategory[] = [
  "Coffee", "Dairy", "Meat", "Sauce", "Bread",
  "Produce", "Frozen", "Pantry", "Beverage", "Seasoning", "Other",
];

export interface PantryItem extends Ratings {
  id: string;
  kind: "pantry";
  name: string;
  photo?: string;
  brand?: string;
  stores: string[];
  category: PantryCategory;
  notes?: string;
  tags: string[];
  wouldBuyAgain?: boolean;
  aiGeneratedFields?: string[];
  aiMeta?: AiMeta;
  createdAt: number;
}

export type AnyItem = Recipe | Drink | Restaurant | PantryItem;

const KEY = "cookbook-v1";

function uid() {
  return (typeof crypto !== "undefined" && crypto.randomUUID)
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

let _currentEmail = "";
let _cloudLoadTriggered = false;

export function setCurrentUser(email: string) {
  _currentEmail = email;
}

export async function loadFromCloud(): Promise<void> {
  if (!supabase || _cloudLoadTriggered) return;
  _cloudLoadTriggered = true;
  try {
    const data = await fetchAllData();
    cache = data;
    persist();
    console.log("[store] loaded from cloud — recipes:", data.recipes.length,
      "drinks:", data.drinks.length, "restaurants:", data.restaurants.length,
      "pantry:", data.pantryItems.length);
  } catch (e) {
    _cloudLoadTriggered = false;
    console.error("[store] loadFromCloud failed — keeping local data:", e);
  }
}

const _restaurantSyncTimer = new Map<string, ReturnType<typeof setTimeout>>();

function scheduleSyncRestaurant(id: string) {
  const prev = _restaurantSyncTimer.get(id);
  if (prev) clearTimeout(prev);
  const t = setTimeout(() => {
    _restaurantSyncTimer.delete(id);
    const r = cache?.restaurants.find((x) => x.id === id);
    if (r && _currentEmail) void dbUpsertRestaurant(r, _currentEmail);
  }, 300);
  _restaurantSyncTimer.set(id, t);
}

function seed(): { recipes: Recipe[]; drinks: Drink[]; restaurants: Restaurant[]; pantryItems: PantryItem[] } {
  const now = Date.now();
  return {
    recipes: [
      {
        id: uid(), kind: "recipe", name: "Garlicky Lemon Chicken",
        ingredients: ["4 chicken thighs", "6 garlic cloves", "1 lemon", "2 tbsp olive oil", "Parsley", "Salt & pepper"],
        instructions: ["Sear thighs skin-down 7 min.", "Flip, add garlic + lemon.", "Finish in oven 12 min at 400°F."],
        notes: "Pairs great with rice pilaf.",
        nextTimeNotes: "Try with capers.",
        calories: 520, protein: 42, difficulty: "easy", portion: "normal", cuisine: "Mediterranean",
        tags: ["chicken", "weeknight", "gluten free"],
        chaseRating: 5, chloeRating: 4.5,
        timesMade: 3, lastMade: now - 1000 * 60 * 60 * 24 * 5, wouldMakeAgain: true,
        createdAt: now,
      },
      {
        id: uid(), kind: "recipe", name: "Thai Basil Shrimp",
        ingredients: ["1 lb shrimp", "Thai basil", "Garlic", "Thai chili", "Fish sauce", "Soy sauce"],
        instructions: ["Sear shrimp 2 min.", "Add aromatics.", "Toss with basil, plate over rice."],
        notes: "Pretty spicy, balance with extra rice.",
        calories: 410, protein: 38, difficulty: "easy", portion: "normal", cuisine: "Thai",
        tags: ["seafood", "spicy", "shrimp"],
        chaseRating: 3.5, chloeRating: 3,
        timesMade: 1, lastMade: now - 1000 * 60 * 60 * 24 * 22, wouldMakeAgain: true,
        createdAt: now - 1000,
      },
      {
        id: uid(), kind: "recipe", name: "Roasted Squash & Lentil Bowl",
        ingredients: ["1 delicata squash", "1 cup lentils", "Tahini", "Lemon", "Pomegranate", "Mint"],
        instructions: ["Roast squash at 425°F for 25 min.", "Simmer lentils 20 min.", "Whisk tahini-lemon dressing.", "Assemble bowl."],
        notes: "",
        calories: 460, protein: 22, difficulty: "easy", portion: "filling", cuisine: "Levantine",
        tags: ["vegetarian", "meal prep"],
        chloeRating: 4.5,
        timesMade: 2, lastMade: now - 1000 * 60 * 60 * 24 * 12, wouldMakeAgain: true,
        createdAt: now - 2000,
      },
    ],
    drinks: [
      {
        id: uid(), kind: "drink", drinkKind: "espresso", name: "Morning Cortado",
        espresso: { bean: "Onyx Monarch", doseG: 18, yieldG: 36, brewTimeSec: 28, grindSetting: "3.2", milk: "Whole" },
        tasteNotes: "Chocolatey, low acid. Dial 1:2.",
        tags: ["morning"], chaseRating: 5, chloeRating: 4.5, createdAt: now,
      },
      {
        id: uid(), kind: "drink", drinkKind: "cocktail", name: "Mezcal Paloma",
        ingredients: ["2 oz mezcal", "0.75 oz lime", "Grapefruit soda", "Salt rim"],
        instructions: ["Salt the rim.", "Build over ice.", "Top with grapefruit soda."],
        tasteNotes: "Smoky, bright.",
        tags: ["alcohol", "summer"], chaseRating: 4.5, chloeRating: 5, createdAt: now - 500,
      },
    ],
    restaurants: [
      {
        id: uid(), kind: "restaurant", name: "Carbone", city: "New York", state: "NY",
        notes: "Worth the hype. Save for special nights.",
        tags: ["italian", "date night"],
        chaseRating: 5, chloeRating: 5,
        dishes: [
          { id: uid(), name: "Spicy Rigatoni alla Vodka", notes: "Order extra bread.", chaseRating: 5, chloeRating: 5, wouldOrderAgain: true },
          { id: uid(), name: "Veal Parmesan", notes: "Huge portion, split it.", chaseRating: 4.5, chloeRating: 4, wouldOrderAgain: true },
        ],
        drinks: [
          { id: uid(), name: "Negroni", notes: "Classic, perfectly stirred.", chaseRating: 4.5, chloeRating: 4, wouldOrderAgain: true },
        ],
        createdAt: now,
      },
      {
        id: uid(), kind: "restaurant", name: "Kann", city: "Portland", state: "OR",
        notes: "Live-fire Haitian. Get a counter seat.",
        tags: ["haitian", "seafood"],
        chaseRating: 3.5, chloeRating: 5,
        dishes: [
          { id: uid(), name: "Grilled Whole Fish", notes: "Smoky, perfect char.", chaseRating: 3, chloeRating: 5, wouldOrderAgain: false },
          { id: uid(), name: "Plantain Gnocchi", notes: "Surprise of the night.", chaseRating: 5, chloeRating: 5, wouldOrderAgain: true },
        ],
        drinks: [],
        createdAt: now - 800,
      },
    ],
    pantryItems: [
      {
        id: uid(), kind: "pantry", name: "Onyx Monarch",
        brand: "Onyx Coffee Lab",
        stores: ["Whole Foods", "onyx website"],
        category: "Coffee",
        notes: "Our go-to espresso bean. Sweet, chocolatey, pulls beautifully at 1:2.",
        tags: ["espresso", "light roast"],
        chaseRating: 5, chloeRating: 4.5, wouldBuyAgain: true,
        createdAt: now,
      },
      {
        id: uid(), kind: "pantry", name: "Calabrian Chili Paste",
        brand: "Tutto Calabria",
        stores: ["Eataly", "Amazon"],
        category: "Sauce",
        notes: "Goes in everything — pasta, eggs, grilled meats. Fruity heat.",
        tags: ["spicy", "italian"],
        chaseRating: 5, chloeRating: 4, wouldBuyAgain: true,
        createdAt: now - 500,
      },
    ],
  };
}

interface Store {
  recipes: Recipe[];
  drinks: Drink[];
  restaurants: Restaurant[];
  pantryItems: PantryItem[];
}

function load(): Store {
  if (typeof window === "undefined") return { recipes: [], drinks: [], restaurants: [], pantryItems: [] };
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
      restaurants: (p.restaurants ?? []).map((r: any) => {
        if (!r.city && r.location) {
          const parts = (r.location as string).split(",").map((s: string) => s.trim());
          return { ...r, city: parts[0] ?? r.location, state: parts[1] ?? undefined };
        }
        return r;
      }),
      pantryItems: p.pantryItems ?? [],
    };
  } catch {
    return { recipes: [], drinks: [], restaurants: [], pantryItems: [] };
  }
}

let cache: Store | null = null;
const listeners = new Set<() => void>();

function snap(): Store {
  if (cache === null) cache = load();
  return cache;
}
const emptyServer: Store = { recipes: [], drinks: [], restaurants: [], pantryItems: [] };

function persist() {
  if (cache && typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(cache));
  listeners.forEach((l) => l());
}

export function useStore() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    snap,
    () => emptyServer,
  );
}

// === Mutations ===
export function addRecipe(r: Omit<Recipe, "id" | "kind" | "createdAt" | "timesMade" | "tags"> & { tags?: string[]; timesMade?: number }): Recipe {
  const item: Recipe = {
    ...r,
    id: uid(), kind: "recipe", createdAt: Date.now(),
    timesMade: r.timesMade ?? 0,
    tags: r.tags ?? [],
    ingredients: r.ingredients ?? [],
    instructions: r.instructions ?? [],
  };
  cache = { ...snap(), recipes: [item, ...snap().recipes] };
  persist();
  if (_currentEmail) void dbUpsertRecipe(item, _currentEmail);
  return item;
}

export function updateRecipe(id: string, patch: Partial<Recipe>) {
  cache = { ...snap(), recipes: snap().recipes.map((r) => r.id === id ? { ...r, ...patch } : r) };
  persist();
  const updated = cache!.recipes.find((r) => r.id === id);
  if (updated && _currentEmail) void dbUpsertRecipe(updated, _currentEmail);
}

export function deleteRecipe(id: string) {
  cache = { ...snap(), recipes: snap().recipes.filter((r) => r.id !== id) };
  persist();
  void dbDeleteRecipe(id);
}

export function bumpTimesMade(id: string, delta: number) {
  const r = snap().recipes.find((x) => x.id === id);
  if (!r) return;
  const next = Math.max(0, r.timesMade + delta);
  updateRecipe(id, { timesMade: next, lastMade: delta > 0 ? Date.now() : r.lastMade });
}

export function addDrink(d: Omit<Drink, "id" | "kind" | "createdAt" | "tags"> & { tags?: string[] }): Drink {
  const item: Drink = { ...d, id: uid(), kind: "drink", createdAt: Date.now(), tags: d.tags ?? [] };
  cache = { ...snap(), drinks: [item, ...snap().drinks] };
  persist();
  if (_currentEmail) void dbUpsertDrink(item, _currentEmail);
  return item;
}

export function updateDrink(id: string, patch: Partial<Drink>) {
  cache = { ...snap(), drinks: snap().drinks.map((d) => d.id === id ? { ...d, ...patch } : d) };
  persist();
  const updated = cache!.drinks.find((d) => d.id === id);
  if (updated && _currentEmail) void dbUpsertDrink(updated, _currentEmail);
}

export function deleteDrink(id: string) {
  cache = { ...snap(), drinks: snap().drinks.filter((d) => d.id !== id) };
  persist();
  void dbDeleteDrink(id);
}

export function addRestaurant(r: Omit<Restaurant, "id" | "kind" | "createdAt" | "tags" | "dishes" | "drinks"> & { tags?: string[] }): Restaurant {
  const item: Restaurant = {
    ...r, id: uid(), kind: "restaurant", createdAt: Date.now(),
    tags: r.tags ?? [], dishes: [], drinks: [],
  };
  cache = { ...snap(), restaurants: [item, ...snap().restaurants] };
  persist();
  if (_currentEmail) scheduleSyncRestaurant(item.id);
  return item;
}

export function updateRestaurant(id: string, patch: Partial<Restaurant>) {
  cache = { ...snap(), restaurants: snap().restaurants.map((r) => r.id === id ? { ...r, ...patch } : r) };
  persist();
  if (_currentEmail) scheduleSyncRestaurant(id);
}

export function deleteRestaurant(id: string) {
  cache = { ...snap(), restaurants: snap().restaurants.filter((r) => r.id !== id) };
  persist();
  void dbDeleteRestaurant(id);
}

export function addRestaurantItem(restaurantId: string, section: "dishes" | "drinks", item: Omit<RestaurantItem, "id">) {
  const next: RestaurantItem = { ...item, id: uid() };
  const r = snap().restaurants.find((x) => x.id === restaurantId);
  if (!r) return next;
  updateRestaurant(restaurantId, { [section]: [...r[section], next] } as Partial<Restaurant>);
  return next;
}

export function updateRestaurantItem(restaurantId: string, section: "dishes" | "drinks", itemId: string, patch: Partial<RestaurantItem>) {
  const r = snap().restaurants.find((x) => x.id === restaurantId);
  if (!r) return;
  updateRestaurant(restaurantId, { [section]: r[section].map((it) => it.id === itemId ? { ...it, ...patch } : it) } as Partial<Restaurant>);
}

export function deleteRestaurantItem(restaurantId: string, section: "dishes" | "drinks", itemId: string) {
  const r = snap().restaurants.find((x) => x.id === restaurantId);
  if (!r) return;
  updateRestaurant(restaurantId, { [section]: r[section].filter((it) => it.id !== itemId) } as Partial<Restaurant>);
}

export function addPantryItem(
  p: Omit<PantryItem, "id" | "kind" | "createdAt" | "tags" | "stores"> & { tags?: string[]; stores?: string[] },
): PantryItem {
  const item: PantryItem = {
    ...p, id: uid(), kind: "pantry", createdAt: Date.now(),
    tags: p.tags ?? [], stores: p.stores ?? [],
  };
  cache = { ...snap(), pantryItems: [item, ...snap().pantryItems] };
  persist();
  if (_currentEmail) void dbUpsertPantry(item, _currentEmail);
  return item;
}

export function updatePantryItem(id: string, patch: Partial<PantryItem>) {
  cache = { ...snap(), pantryItems: snap().pantryItems.map((p) => p.id === id ? { ...p, ...patch } : p) };
  persist();
  const updated = cache!.pantryItems.find((p) => p.id === id);
  if (updated && _currentEmail) void dbUpsertPantry(updated, _currentEmail);
}

export function deletePantryItem(id: string) {
  cache = { ...snap(), pantryItems: snap().pantryItems.filter((p) => p.id !== id) };
  persist();
  void dbDeletePantry(id);
}

export async function clearAll(): Promise<void> {
  cache = { recipes: [], drinks: [], restaurants: [], pantryItems: [] };
  persist();
  await dbClearAll();
}

export async function restoreSeed(): Promise<void> {
  const seedData = seed();
  cache = seedData;
  persist();
  await dbClearAll();
  if (_currentEmail) await dbSeedAll(seedData, _currentEmail);
}

// === Helpers ===
export function householdRating(r: Ratings): number | undefined {
  const c = r.chaseRating, l = r.chloeRating;
  if (c != null && l != null) return Math.round(((c + l) / 2) * 10) / 10;
  return c ?? l;
}

export function restaurantLocation(r: Pick<Restaurant, "city" | "state" | "country">): string {
  return [r.city, r.state, r.country].filter(Boolean).join(", ");
}

export const DISLIKES: { person: "Chase" | "Chloe"; tag: string }[] = [
  { person: "Chase", tag: "seafood" },
  { person: "Chloe", tag: "spicy" },
];

export function warningsFor(tags: string[]): string[] {
  const set = new Set(tags.map((t) => t.toLowerCase()));
  return DISLIKES.filter((d) => set.has(d.tag)).map((d) => `${d.person} may not enjoy this.`);
}

export const drinkKindLabel: Record<DrinkKind, string> = {
  espresso: "Espresso", coffee: "Coffee", cocktail: "Cocktail",
  mocktail: "Mocktail", beer: "Beer", wine: "Wine",
};
