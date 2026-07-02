import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EmptyArt, MiniRating, TagChip } from "@/components/bits";
import { useStore, householdRating, restaurantLocation, type RestaurantItem } from "@/lib/store";

export const Route = createFileRoute("/out/")({
  head: () => ({
    meta: [
      { title: "Going Out — Chloe & Chase" },
      { name: "description", content: "Restaurants we love, dishes we crave." },
    ],
  }),
  component: GoingOut,
});

function GoingOut() {
  const { restaurants } = useStore();
  return (
    <AppShell
      title="Going Out"
      right={
        <Link to="/new" search={{ type: "restaurant" }}
          className="grid h-11 w-11 place-items-center rounded-full bg-saffron text-noir shadow-md shadow-saffron/30">
          <Plus className="h-5 w-5" />
        </Link>
      }
    >
      {restaurants.length === 0 ? (
        <div className="rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center">
          <p className="font-display text-2xl text-bone">No spots yet</p>
          <p className="folio mt-2">Remember a great meal out</p>
          <Link to="/new" search={{ type: "restaurant" }} className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-saffron px-4 text-sm font-semibold text-noir">
            <Plus className="h-4 w-4" /> Add a restaurant
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {restaurants.map((r) => {
            const topPick = (arr: RestaurantItem[]) =>
              arr.slice().sort((a, b) => (householdRating(b) ?? -1) - (householdRating(a) ?? -1))[0];
            const favDish = topPick(r.dishes);
            const favDrink = topPick(r.drinks);
            return (
              <Link
                key={r.id}
                to="/out/$id"
                params={{ id: r.id }}
                className="card-journal block overflow-hidden rounded-lg"
              >
                {r.photo && (
                  <img src={r.photo} alt={r.name} className="h-40 w-full object-cover" />
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="folio">{restaurantLocation(r) ? `📍 ${restaurantLocation(r)}` : "Restaurant"}</p>
                      <h3 className="mt-1 font-display text-[32px] italic leading-[1] text-bone">{r.name}</h3>
                      {r.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {r.tags.slice(0, 4).map((t) => <TagChip key={t} tag={t} />)}
                        </div>
                      )}
                    </div>
                    {!r.photo && <EmptyArt kind="restaurant" className="h-20 w-20 shrink-0 rounded-md" />}
                  </div>
                  <div className="brass-rule mt-5 h-px opacity-50" />
                  <div className="mt-4"><MiniRating r={r} /></div>
                  <dl className="mt-4 space-y-1 text-xs text-bone-dim">
                    {favDish && (
                      <div className="flex gap-2"><dt className="folio shrink-0 text-saffron">Fav dish</dt><dd className="text-bone">{favDish.name}</dd></div>
                    )}
                    {favDrink && (
                      <div className="flex gap-2"><dt className="folio shrink-0 text-saffron">Fav drink</dt><dd className="text-bone">{favDrink.name}</dd></div>
                    )}
                    {r.wouldReturn && (
                      <div className="flex gap-2"><dt className="folio shrink-0 text-saffron">Status</dt><dd className="text-bone">★ Would return</dd></div>
                    )}
                  </dl>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
