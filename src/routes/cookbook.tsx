import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EmptyArt, MiniRating, ReviewBadge, TagChip } from "@/components/bits";
import { useStore } from "@/lib/store";
import { sortItems, sortOptions, type SortKey } from "@/lib/search";

export const Route = createFileRoute("/cookbook")({
  head: () => ({
    meta: [
      { title: "Cookbook — Chloe & Chase" },
      { name: "description", content: "Home recipes we've cooked together." },
    ],
  }),
  component: Cookbook,
});

function Cookbook() {
  const { recipes } = useStore();
  const [sort, setSort] = useState<SortKey>("most-made");
  const [tag, setTag] = useState<string | null>(null);

  const allTags = useMemo(() => Array.from(new Set(recipes.flatMap((r) => r.tags))).sort(), [recipes]);
  const list = useMemo(() => {
    const filtered = tag ? recipes.filter((r) => r.tags.includes(tag)) : recipes;
    return sortItems(filtered, sort);
  }, [recipes, sort, tag]);

  return (
    <AppShell
      title="Cookbook"
      right={
        <Link to="/new" search={{ type: "recipe" }}
          className="grid h-11 w-11 place-items-center rounded-full bg-saffron text-noir shadow-md shadow-saffron/30">
          <Plus className="h-5 w-5" />
        </Link>
      }
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="h-9 rounded-md border border-bone/15 bg-graphite px-3 text-xs text-bone"
        >
          {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <p className="folio">{list.length} recipes</p>
      </div>

      {allTags.length > 0 && (
        <div className="-mx-5 mb-6 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TagChip tag="all" on={!tag} onClick={() => setTag(null)} />
          {allTags.map((t) => <TagChip key={t} tag={t} on={tag === t} onClick={() => setTag(tag === t ? null : t)} />)}
        </div>
      )}

      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <ol className="divide-y divide-bone/10">
          {list.map((r, i) => (
            <li key={r.id}>
              <Link
                to="/cookbook/$id"
                params={{ id: r.id }}
                className="grid grid-cols-[44px_1fr_auto] items-start gap-4 py-5 transition-colors hover:bg-graphite/50"
              >
                <span className="tnum lining mt-1 font-display text-3xl text-saffron/85">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-[24px] leading-tight text-bone">{r.name}</h3>
                    {r.needsReview && <ReviewBadge />}
                  </div>
                  <p className="folio mt-1.5">
                    {[r.cuisine, r.difficulty, r.calories && `${r.calories} cal`, r.protein && `${r.protein}g protein`]
                      .filter(Boolean).join(" · ") || "Recipe"}
                  </p>
                  {r.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {r.tags.slice(0, 4).map((t) => <TagChip key={t} tag={t} />)}
                    </div>
                  )}
                  <div className="mt-3"><MiniRating r={r} /></div>
                  <p className="folio mt-2 text-bone-dim/55">
                    Made {r.timesMade}× {r.lastMade ? `· last ${relTime(r.lastMade)}` : ""}
                  </p>
                </div>
                {r.photo ? (
                  <img src={r.photo} alt={r.name} className="h-20 w-20 shrink-0 rounded-md object-cover" />
                ) : (
                  <EmptyArt kind="recipe" className="h-20 w-20 shrink-0 rounded-md" />
                )}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </AppShell>
  );
}

function EmptyState() {
  return (
    <div className="rounded-md border border-dashed border-bone/15 bg-graphite/60 p-12 text-center">
      <p className="font-display text-2xl text-bone">No recipes yet</p>
      <p className="folio mt-2">Start your shared cookbook</p>
      <Link to="/new" search={{ type: "recipe" }} className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-saffron px-4 text-sm font-semibold text-noir">
        <Plus className="h-4 w-4" /> Add a recipe
      </Link>
    </div>
  );
}

export function relTime(ts: number): string {
  const days = Math.floor((Date.now() - ts) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 14) return `${days}d ago`;
  if (days < 60) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
