import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { EmptyArt, MiniRating, SectionTitle } from "@/components/bits";
import { useStore, householdRating, drinkKindLabel } from "@/lib/store";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favorites — Chloe & Chase" },
      { name: "description", content: "Our highest-rated and most-loved items." },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { recipes, drinks, restaurants } = useStore();

  const favs = useMemo(() => {
    const fr = recipes.filter((r) => (householdRating(r) ?? 0) >= 4.5 || r.wouldMakeAgain);
    const fd = drinks.filter((d) => (householdRating(d) ?? 0) >= 4.5);
    const fres = restaurants.filter(
      (r) =>
        (householdRating(r) ?? 0) >= 4.5 ||
        [...r.dishes, ...r.drinks].some((i) => i.wouldOrderAgain),
    );
    return { fr, fd, fres };
  }, [recipes, drinks, restaurants]);

  const total = favs.fr.length + favs.fd.length + favs.fres.length;

  return (
    <AppShell title="Favorites">
      {total === 0 ? (
        <div className="rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center">
          <p className="font-display text-2xl text-bone">No favorites yet</p>
          <p className="folio mt-2">Rate 4.5+ or mark "would make again"</p>
        </div>
      ) : (
        <>
          {favs.fr.length > 0 && (
            <section className="mb-12">
              <SectionTitle kicker="Recipes" number="01">From the kitchen</SectionTitle>
              <ol className="divide-y divide-bone/10">
                {favs.fr.map((r, i) => (
                  <li key={r.id}>
                    <Link
                      to="/cookbook/$id"
                      params={{ id: r.id }}
                      className="grid grid-cols-[44px_1fr_auto] items-center gap-4 py-4 hover:bg-graphite/50"
                    >
                      <span className="tnum lining font-display text-2xl text-saffron/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-xl text-bone">{r.name}</h3>
                        <p className="folio mt-1">Made {r.timesMade}×</p>
                      </div>
                      <MiniRating r={r} />
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {favs.fd.length > 0 && (
            <section className="mb-12">
              <SectionTitle kicker="Drinks" number="02">The bar cart</SectionTitle>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {favs.fd.map((d) => (
                  <Link
                    key={d.id}
                    to="/drinks/$id"
                    params={{ id: d.id }}
                    className="card-forest block overflow-hidden rounded-lg"
                  >
                    <EmptyArt kind={d.drinkKind === "espresso" ? "espresso" : "drink"} className="h-28 w-full" />
                    <div className="p-4">
                      <p className="folio mb-1 text-saffron">{drinkKindLabel[d.drinkKind]}</p>
                      <h3 className="font-display text-lg text-bone">{d.name}</h3>
                      <div className="mt-2"><MiniRating r={d} tone="dark" /></div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {favs.fres.length > 0 && (
            <section className="mb-12">
              <SectionTitle kicker="Places" number="03">Worth returning to</SectionTitle>
              <div className="space-y-4">
                {favs.fres.map((r) => (
                  <Link
                    key={r.id}
                    to="/out/$id"
                    params={{ id: r.id }}
                    className="card-journal block overflow-hidden rounded-lg p-5"
                  >
                    <p className="folio">{r.location}</p>
                    <h3 className="mt-1 font-display text-2xl italic text-bone">{r.name}</h3>
                    <div className="brass-rule mt-4 h-px opacity-50" />
                    <div className="mt-3"><MiniRating r={r} /></div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </AppShell>
  );
}
