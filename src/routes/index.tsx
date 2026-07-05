import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, Sparkles, ArrowUpRight, BookOpen, Coffee, Store, ShoppingBag, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MiniRating, EmptyArt, SectionTitle, ReviewBadge } from "@/components/bits";
import {
  useStore,
  drinkKindLabel,
  householdRating,
  restaurantLocation,
  type Recipe,
  type Drink,
  type Restaurant,
  type PantryItem,
} from "@/lib/store";
import { matches, sortItems, type Filters } from "@/lib/search";
import { relTime } from "./cookbook";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Library — Chloe & Chase" },
      { name: "description", content: "A private cookbook of everything we've made, sipped, and eaten out." },
    ],
  }),
  component: Library,
});

function Library() {
  const { recipes, drinks, restaurants, pantryItems } = useStore();
  const [query, setQuery] = useState("");

  if (query.trim()) return <SearchResults query={query} setQuery={setQuery} />;

  const dateStr = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const totalMade = recipes.reduce((a, r) => a + r.timesMade, 0);

  const recentlyMade = [...recipes]
    .filter((r) => r.lastMade)
    .sort((a, b) => (b.lastMade ?? 0) - (a.lastMade ?? 0))
    .slice(0, 6);

  const favorites: (Recipe | Drink | Restaurant)[] = [
    ...recipes.filter((r) => (householdRating(r) ?? 0) >= 4.5),
    ...drinks.filter((d) => (householdRating(d) ?? 0) >= 4.5),
    ...restaurants.filter((r) => (householdRating(r) ?? 0) >= 4.5),
  ].slice(0, 4);

  const continueCooking = [...recipes]
    .filter((r) => r.timesMade <= 1)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4);

  const latestDrinks = [...drinks].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);
  const latestRest = [...restaurants].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
  const latestPantry = [...pantryItems]
    .filter((p) => p.wouldBuyAgain || (householdRating(p) ?? 0) >= 4)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4);

  const needsReview = [
    ...recipes.filter((r) => r.needsReview),
    ...drinks.filter((d) => d.needsReview),
  ];

  return (
    <AppShell>
      {/* === Cover === */}
      <section className="mb-12">
        <p className="folio mb-4">{dateStr}</p>
        <h1 className="font-display text-[64px] font-medium leading-[0.9] tracking-[-0.03em] text-bone">
          The
          <br />
          <span className="italic text-saffron">Household</span>
          <br />
          Library.
        </h1>
        <div className="brass-rule mt-7 h-px" />
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <p className="max-w-[62%] text-sm leading-relaxed text-bone-dim">
            Recipes, drinks, espresso notes, and places worth returning to —
            kept by <span className="text-bone">Chloe &amp; Chase</span>.
          </p>
          <div className="text-right">
            <p className="tnum lining font-display text-4xl text-bone">{totalMade}</p>
            <p className="folio mt-1">Times cooked</p>
          </div>
        </div>
      </section>

      {/* === Search === */}
      <div className="relative mb-12">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-dim/60" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes, drinks, places, ingredients…"
          className="h-12 w-full rounded-md border border-bone/15 bg-graphite pl-11 pr-4 text-sm text-bone shadow-lg shadow-black/30 outline-none ring-saffron/40 placeholder:text-bone-dim/55 focus:ring-2"
        />
      </div>

      {/* === Recently Made === */}
      {recentlyMade.length > 0 && (
        <section className="mb-14">
          <SectionTitle kicker="Lately, on the stove"
            action={<TinyLink to="/cookbook">Cookbook</TinyLink>}>
            Recently made
          </SectionTitle>
          <HorizontalScroll>
            {recentlyMade.map((r, i) => <RecipeFeatureCard key={r.id} r={r} idx={i + 1} />)}
          </HorizontalScroll>
        </section>
      )}

      {/* === Household Favorites === */}
      {favorites.length > 0 && (
        <section className="mb-14">
          <SectionTitle kicker="Rated 4.5 and above"
            action={<TinyLink to="/favorites">All</TinyLink>}>
            Household favorites
          </SectionTitle>
          <div className="grid grid-cols-6 gap-3">
            {favorites[0] && (
              <Link
                to={hrefFor(favorites[0]) as any}
                params={{ id: favorites[0].id } as any}
                className="card-paper col-span-6 block overflow-hidden rounded-lg"
              >
                {favorites[0].photo ? (
                  <img src={favorites[0].photo} alt={favorites[0].name} className="h-44 w-full rounded-none object-cover" />
                ) : (
                  <EmptyArt kind={artKind(favorites[0])} className="h-44 w-full rounded-none" />
                )}
                <div className="p-5">
                  <p className="folio mb-2">Top of the list</p>
                  <h3 className="font-display text-3xl leading-tight text-bone">{favorites[0].name}</h3>
                  <div className="mt-3"><MiniRating r={favorites[0]} /></div>
                </div>
              </Link>
            )}
            {favorites.slice(1).map((it) => (
              <Link
                key={it.id}
                to={hrefFor(it) as any}
                params={{ id: it.id } as any}
                className="card-paper col-span-3 block overflow-hidden rounded-lg"
              >
                {it.photo ? (
                  <img src={it.photo} alt={it.name} className="h-24 w-full rounded-none object-cover" />
                ) : (
                  <EmptyArt kind={artKind(it)} className="h-24 w-full rounded-none" />
                )}
                <div className="p-3">
                  <h4 className="line-clamp-2 font-display text-base leading-tight text-bone">{it.name}</h4>
                  <div className="mt-2"><MiniRating r={it} /></div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* === Continue Cooking === */}
      {continueCooking.length > 0 && (
        <section className="mb-14">
          <SectionTitle kicker="Made once or never">Try these next</SectionTitle>
          <ol className="divide-y divide-bone/10">
            {continueCooking.map((r, i) => (
              <li key={r.id}>
                <Link
                  to="/cookbook/$id"
                  params={{ id: r.id }}
                  className="grid grid-cols-[40px_1fr_auto] items-center gap-4 py-4 hover:bg-graphite/60"
                >
                  <span className="tnum lining font-display text-3xl text-saffron/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-xl leading-tight text-bone">{r.name}</h3>
                    <p className="folio mt-1">
                      {[r.cuisine, r.difficulty, r.protein && `${r.protein}g protein`].filter(Boolean).join(" · ") || "Recipe"}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-bone-dim/60" />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* === Drink Lab === */}
      {latestDrinks.length > 0 && (
        <section className="mb-14">
          <SectionTitle kicker="Espresso, coffee, cocktails"
            action={<TinyLink to="/drinks">All</TinyLink>}>
            The drink lab
          </SectionTitle>
          <HorizontalScroll>
            {latestDrinks.map((d) => <DrinkFeatureCard key={d.id} d={d} />)}
          </HorizontalScroll>
        </section>
      )}

      {/* === Going Out === */}
      {latestRest.length > 0 && (
        <section className="mb-14">
          <SectionTitle kicker="Restaurants & memorable meals"
            action={<TinyLink to="/out">All</TinyLink>}>
            Worth returning to
          </SectionTitle>
          <div className="space-y-4">
            {latestRest.map((r) => <RestaurantEditorial key={r.id} r={r} />)}
          </div>
        </section>
      )}

      {/* === Pantry === */}
      {latestPantry.length > 0 && (
        <section className="mb-14">
          <SectionTitle kicker="Products we keep buying"
            action={<TinyLink to="/pantry">All</TinyLink>}>
            Pantry staples
          </SectionTitle>
          <div className="space-y-2">
            {latestPantry.map((p) => <PantryCard key={p.id} p={p} />)}
          </div>
        </section>
      )}

      {/* === Needs Review === */}
      {needsReview.length > 0 && (
        <section className="mb-14">
          <SectionTitle kicker="Missing fields or AI-estimated">Needs review</SectionTitle>
          <div className="space-y-1">
            {needsReview.map((it) => (
              <Link
                key={it.id}
                to={it.kind === "recipe" ? "/cookbook/$id" : "/drinks/$id"}
                params={{ id: it.id }}
                className="flex items-center justify-between border-b border-dashed border-bone/10 py-3 hover:text-saffron"
              >
                <div className="min-w-0">
                  <p className="truncate font-display text-lg text-bone">{it.name}</p>
                  <p className="folio mt-0.5">{it.kind === "recipe" ? "Recipe" : "Drink"} · missing details</p>
                </div>
                <ReviewBadge />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Add menu */}
      <AddMenu />
    </AppShell>
  );
}

/* ===== Helpers ===== */
function hrefFor(it: Recipe | Drink | Restaurant | PantryItem) {
  if (it.kind === "recipe") return "/cookbook/$id";
  if (it.kind === "drink") return "/drinks/$id";
  if (it.kind === "pantry") return "/pantry/$id";
  return "/out/$id";
}
function artKind(it: Recipe | Drink | Restaurant | PantryItem): "recipe" | "drink" | "espresso" | "restaurant" | "pantry" {
  if (it.kind === "recipe") return "recipe";
  if (it.kind === "drink") return it.drinkKind === "espresso" ? "espresso" : "drink";
  if (it.kind === "pantry") return "pantry";
  return "restaurant";
}

function TinyLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to as any}
      className="folio inline-flex items-center gap-1 text-saffron hover:text-bone"
    >
      {children} <ArrowUpRight className="h-3 w-3" />
    </Link>
  );
}

function HorizontalScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}

/* === Search === */
function SearchResults({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  const { recipes, drinks, restaurants, pantryItems } = useStore();
  const filters: Filters = { query, section: "all", tags: [], minRating: 0, sort: "newest" };
  const q = query.trim().toLowerCase();

  const rRecipes = useMemo(() => sortItems(recipes.filter((r) => matches(r, filters)), "household"), [recipes, query]);
  const rDrinks = useMemo(() => sortItems(drinks.filter((d) => matches(d, filters)), "household"), [drinks, query]);
  const rRest = useMemo(() => {
    const base = restaurants.filter((r) => matches(r, filters));
    const extra = restaurants.filter((r) =>
      !base.includes(r) &&
      (r.dishes.some((d) => d.name.toLowerCase().includes(q) || (d.notes ?? "").toLowerCase().includes(q)) ||
        r.drinks.some((d) => d.name.toLowerCase().includes(q) || (d.notes ?? "").toLowerCase().includes(q)))
    );
    return [...base, ...extra];
  }, [restaurants, query]);
  const rPantry = useMemo(() => sortItems(pantryItems.filter((p) => matches(p, filters)), "household"), [pantryItems, query]);

  const total = rRecipes.length + rDrinks.length + rRest.length + rPantry.length;

  return (
    <AppShell>
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-dim/60" />
        <input
          autoFocus
          aria-label="Search your library"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 w-full rounded-md border border-bone/15 bg-graphite pl-11 pr-4 text-sm text-bone outline-none ring-saffron/40 focus:ring-2"
        />
      </div>
      <p className="folio mb-6">
        {total} {total === 1 ? "result" : "results"} · "{query}"
      </p>

      {rRecipes.length > 0 && (
        <section className="mb-10">
          <SectionTitle kicker="Recipes">From the kitchen</SectionTitle>
          <div className="grid grid-cols-1 gap-3">
            {rRecipes.map((r, i) => <RecipeFeatureCard key={r.id} r={r} idx={i + 1} full />)}
          </div>
        </section>
      )}
      {rDrinks.length > 0 && (
        <section className="mb-10">
          <SectionTitle kicker="Drinks">The bar cart</SectionTitle>
          <div className="grid grid-cols-1 gap-3">
            {rDrinks.map((d) => <DrinkFeatureCard key={d.id} d={d} full />)}
          </div>
        </section>
      )}
      {rRest.length > 0 && (
        <section className="mb-10">
          <SectionTitle kicker="Places">Out & about</SectionTitle>
          <div className="space-y-4">{rRest.map((r) => <RestaurantEditorial key={r.id} r={r} highlight={q} />)}</div>
        </section>
      )}
      {rPantry.length > 0 && (
        <section className="mb-10">
          <SectionTitle kicker="Pantry">Household staples</SectionTitle>
          <div className="space-y-2">{rPantry.map((p) => <PantryCard key={p.id} p={p} />)}</div>
        </section>
      )}
      {total === 0 && (
        <div className="rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center">
          <Sparkles className="mx-auto mb-2 h-5 w-5 text-saffron" />
          <p className="font-display text-2xl text-bone">No matches</p>
          <p className="folio mt-2">Try a tag, ingredient, or restaurant name</p>
        </div>
      )}
    </AppShell>
  );
}

/* ===== Card languages ===== */

/* Cookbook: ivory card, saffron index numeral */
function RecipeFeatureCard({ r, idx, full = false }: { r: Recipe; idx?: number; full?: boolean }) {
  return (
    <Link
      to="/cookbook/$id"
      params={{ id: r.id }}
      className={`card-paper group block overflow-hidden rounded-lg transition-transform hover:-translate-y-0.5 ${full ? "w-full" : "w-[230px] shrink-0"}`}
    >
      <div className="relative">
        {r.photo ? (
          <img src={r.photo} alt={r.name} className="h-32 w-full object-cover" />
        ) : (
          <EmptyArt kind="recipe" className="h-32 w-full" />
        )}
        {idx != null && (
          <span className="tnum lining absolute left-3 top-3 font-display text-2xl text-saffron drop-shadow-sm">
            {String(idx).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="folio mb-1.5">{r.cuisine ?? r.difficulty ?? "Recipe"}</p>
        <h3 className="line-clamp-2 font-display text-[20px] leading-tight text-bone">{r.name}</h3>
        <div className="mt-3"><MiniRating r={r} /></div>
        {r.lastMade && (
          <p className="folio mt-2 text-bone-dim/60">Made {relTime(r.lastMade)}</p>
        )}
      </div>
    </Link>
  );
}

/* Drink Lab: warmer card with saffron radial glow */
function DrinkFeatureCard({ d, full = false }: { d: Drink; full?: boolean }) {
  const isEsp = d.drinkKind === "espresso";
  return (
    <Link
      to="/drinks/$id"
      params={{ id: d.id }}
      className={`card-forest block overflow-hidden rounded-lg ${full ? "w-full" : "w-[220px] shrink-0"}`}
    >
      {d.photo ? (
        <img src={d.photo} alt={d.name} className="h-32 w-full object-cover" />
      ) : (
        <EmptyArt kind={isEsp ? "espresso" : "drink"} className="h-32 w-full" />
      )}
      <div className="p-4">
        <p className="folio mb-1.5 text-saffron">{drinkKindLabel[d.drinkKind]}</p>
        <h3 className="line-clamp-2 font-display text-[20px] leading-tight text-bone">{d.name}</h3>
        {isEsp && d.espresso && (
          <p className="tnum lining mt-2 text-[11px] text-bone-dim">
            {d.espresso.doseG}g → {d.espresso.yieldG}g · {d.espresso.brewTimeSec}s
          </p>
        )}
        <div className="mt-3"><MiniRating r={d} tone="dark" /></div>
      </div>
    </Link>
  );
}

/* Going Out: ruled journal block, italic restaurant name */
function RestaurantEditorial({ r, highlight }: { r: Restaurant; highlight?: string }) {
  const q = highlight?.trim().toLowerCase();
  const hit = q
    ? [...r.dishes, ...r.drinks].find(
        (it) => it.name.toLowerCase().includes(q) || (it.notes ?? "").toLowerCase().includes(q),
      )
    : undefined;
  return (
    <Link
      to="/out/$id"
      params={{ id: r.id }}
      search={hit ? { focus: hit.id } : {}}
      className="card-journal block overflow-hidden rounded-lg p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="folio">{restaurantLocation(r) || "Restaurant"}</p>
          <h3 className="mt-1 font-display text-[28px] italic leading-[1] text-bone">{r.name}</h3>
          <p className="folio mt-2 text-bone-dim/70">
            {r.dishes.length} dishes · {r.drinks.length} drinks
          </p>
          {hit && <p className="mt-2 text-xs italic text-saffron">↳ {hit.name}</p>}
        </div>
        {r.photo ? (
          <img src={r.photo} alt={r.name} className="h-16 w-16 shrink-0 rounded-md object-cover" />
        ) : (
          <EmptyArt kind="restaurant" className="h-16 w-16 shrink-0 rounded-md" />
        )}
      </div>
      <div className="brass-rule mt-4 h-px opacity-50" />
      <div className="mt-4"><MiniRating r={r} /></div>
    </Link>
  );
}

/* ===== Pantry card (used on home + search) ===== */
function PantryCard({ p }: { p: PantryItem }) {
  return (
    <Link
      to="/pantry/$id"
      params={{ id: p.id }}
      className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-saffron/30"
    >
      {p.photo ? (
        <img src={p.photo} alt={p.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
      ) : (
        <EmptyArt kind="pantry" className="h-12 w-12 shrink-0 rounded-lg" />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <p className="truncate font-display text-base text-bone">{p.name}</p>
          {p.wouldBuyAgain && <span className="shrink-0 text-[11px] text-saffron">★</span>}
        </div>
        <p className="folio">{p.brand ? `${p.brand} · ` : ""}{p.category}</p>
      </div>
      <MiniRating r={p} />
    </Link>
  );
}

/* ===== Add menu (FAB + sheet) ===== */
function AddMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-noir shadow-lg shadow-saffron/30 transition-transform hover:scale-[1.03]"
      >
        <Plus className="h-4 w-4" /> Add
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-noir/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-t-2xl border-t border-bone/15 bg-graphite p-5 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-2xl text-bone">What are we adding?</p>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-slate text-bone-dim hover:text-bone">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <AddOption to="/new" search={{ type: "recipe" }} icon={<BookOpen className="h-4 w-4" />} label="Add Recipe" desc="Home cooking" onClick={() => setOpen(false)} />
              <AddOption to="/new" search={{ type: "drink" }} icon={<Coffee className="h-4 w-4" />} label="Add Drink" desc="Espresso, cocktails, wine…" onClick={() => setOpen(false)} />
              <AddOption to="/new" search={{ type: "restaurant" }} icon={<Store className="h-4 w-4" />} label="Add Restaurant Visit" desc="With dishes & drinks ordered" onClick={() => setOpen(false)} />
              <AddOption to="/new" search={{ type: "pantry" }} icon={<ShoppingBag className="h-4 w-4" />} label="Add Pantry Item" desc="Products we'd buy again" onClick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AddOption({ to, search, icon, label, desc, onClick, accent = false }: {
  to: string;
  search: Record<string, string>;
  icon: React.ReactNode;
  label: string;
  desc: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <Link
      to={to as any}
      search={search as any}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
        accent
          ? "border-saffron/40 bg-saffron/[0.06] hover:border-saffron"
          : "border-bone/10 bg-noir/50 hover:border-saffron/40"
      }`}
    >
      <span className={`grid h-9 w-9 place-items-center rounded-full ${accent ? "bg-saffron text-noir" : "bg-slate text-saffron"}`}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg text-bone">{label}</span>
        <span className="folio">{desc}</span>
      </span>
    </Link>
  );
}
