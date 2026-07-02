import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EmptyArt, MiniRating } from "@/components/bits";
import { useStore, householdRating, PANTRY_CATEGORIES, type PantryCategory } from "@/lib/store";

export const Route = createFileRoute("/pantry/")({
  head: () => ({
    meta: [
      { title: "Pantry — Chloe & Chase" },
      { name: "description", content: "Products we recommend buying again." },
    ],
  }),
  component: PantryList,
});

function PantryList() {
  const { pantryItems } = useStore();
  const [cat, setCat] = useState<PantryCategory | "All">("All");

  const filtered = useMemo(() => {
    const items = cat === "All" ? pantryItems : pantryItems.filter((p) => p.category === cat);
    return [...items].sort((a, b) => (householdRating(b) ?? -1) - (householdRating(a) ?? -1));
  }, [pantryItems, cat]);

  return (
    <AppShell
      kicker="The household"
      title="Pantry"
      right={
        <Link
          to="/new"
          search={{ type: "pantry" }}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-saffron px-3 text-xs font-bold uppercase tracking-[0.14em] text-noir"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </Link>
      }
    >
      {/* Category filter row */}
      <div className="-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {(["All", ...PANTRY_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              cat === c
                ? "bg-saffron text-noir"
                : "border border-bone/10 bg-graphite text-bone-dim hover:text-bone"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center">
          <p className="font-display text-2xl text-bone">
            {cat === "All" ? "Nothing here yet" : `No ${cat} items yet`}
          </p>
          <p className="folio mt-2">Add products you'd buy again</p>
          {cat === "All" && (
            <Link to="/new" search={{ type: "pantry" }} className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-saffron px-4 text-sm font-semibold text-noir">
              <Plus className="h-4 w-4" /> Add a pantry item
            </Link>
          )}
        </div>
      )}

      <div className="mt-5 space-y-2">
        {filtered.map((p) => (
          <Link
            key={p.id}
            to="/pantry/$id"
            params={{ id: p.id }}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-saffron/30"
          >
            {p.photo ? (
              <img src={p.photo} alt={p.name} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
            ) : (
              <EmptyArt kind="pantry" className="h-14 w-14 shrink-0 rounded-lg" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5">
                <p className="truncate font-display text-base text-bone">{p.name}</p>
                {p.wouldBuyAgain && (
                  <span className="shrink-0 text-[11px] text-saffron" aria-label="Would buy again">★</span>
                )}
              </div>
              {p.brand && <p className="folio truncate">{p.brand}</p>}
              <p className="folio">
                {p.category}
                {p.stores.length > 0 ? ` · ${p.stores[0]}` : ""}
              </p>
            </div>
            <MiniRating r={p} />
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
