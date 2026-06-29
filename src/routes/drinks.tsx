import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EmptyArt, MiniRating, TagChip } from "@/components/bits";
import { useStore, drinkKindLabel, type DrinkKind } from "@/lib/store";

export const Route = createFileRoute("/drinks")({
  head: () => ({
    meta: [
      { title: "Drink Lab — Chloe & Chase" },
      { name: "description", content: "Espresso, coffee, cocktails, and pours." },
    ],
  }),
  component: DrinkLab,
});

const tabs: { value: DrinkKind | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "espresso", label: "Espresso" },
  { value: "coffee", label: "Coffee" },
  { value: "cocktail", label: "Cocktails" },
  { value: "mocktail", label: "Mocktails" },
  { value: "beer", label: "Beer" },
  { value: "wine", label: "Wine" },
];

function DrinkLab() {
  const { drinks } = useStore();
  const [kind, setKind] = useState<DrinkKind | "all">("all");

  const list = useMemo(
    () => (kind === "all" ? drinks : drinks.filter((d) => d.drinkKind === kind)),
    [drinks, kind],
  );

  return (
    <AppShell
      title="Drink Lab"
      right={
        <Link to="/new" search={{ type: "drink" }}
          className="grid h-11 w-11 place-items-center rounded-full bg-saffron text-noir shadow-md shadow-saffron/30">
          <Plus className="h-5 w-5" />
        </Link>
      }
    >
      <div className="-mx-5 mb-6 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setKind(t.value)}
            className={`folio shrink-0 rounded-full px-3.5 py-2 transition-colors ${
              kind === t.value
                ? "bg-saffron text-noir"
                : "bg-slate text-bone-dim hover:text-bone"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center">
          <p className="font-display text-2xl text-bone">Empty glass</p>
          <p className="folio mt-2">Save a drink to remember the recipe</p>
          <Link to="/new" search={{ type: "drink" }} className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-saffron px-4 text-sm font-semibold text-noir">
            <Plus className="h-4 w-4" /> Add a drink
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {list.map((d) => {
            const isEsp = d.drinkKind === "espresso";
            return (
              <Link key={d.id} to="/drinks/$id" params={{ id: d.id }}
                className="card-forest block overflow-hidden rounded-lg">
                {d.photo ? (
                  <img src={d.photo} alt={d.name} className="h-36 w-full object-cover" />
                ) : (
                  <EmptyArt kind={isEsp ? "espresso" : "drink"} className="h-36 w-full" />
                )}
                <div className="p-4">
                  <p className="folio mb-1.5 text-saffron">{drinkKindLabel[d.drinkKind]}</p>
                  <h3 className="font-display text-[22px] leading-tight text-bone">{d.name}</h3>
                  {isEsp && d.espresso && (
                    <div className="mt-3 grid grid-cols-4 gap-1.5 rounded-md border border-bone/10 bg-noir/40 p-2 text-center">
                      <Param k="Dose" v={d.espresso.doseG != null ? `${d.espresso.doseG}g` : "—"} />
                      <Param k="Yield" v={d.espresso.yieldG != null ? `${d.espresso.yieldG}g` : "—"} />
                      <Param k="Time" v={d.espresso.brewTimeSec != null ? `${d.espresso.brewTimeSec}s` : "—"} />
                      <Param k="Grind" v={d.espresso.grindSetting ?? "—"} />
                    </div>
                  )}
                  <div className="mt-3"><MiniRating r={d} tone="dark" /></div>
                  {d.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {d.tags.slice(0, 4).map((t) => <TagChip key={t} tag={t} />)}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}

function Param({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="folio text-brass">{k}</p>
      <p className="tnum lining mt-0.5 text-sm font-semibold text-bone">{v}</p>
    </div>
  );
}
