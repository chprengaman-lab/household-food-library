import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Pencil, Plus, Trash2, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  EmptyArt, Field, FavoriteBadges, HouseholdReadout, MiniRating, Pill,
  RatingDial, TagChip, TextArea, TextInput, ConfirmDelete,
} from "@/components/bits";
import {
  deletePantryItem, updatePantryItem, useStore,
} from "@/lib/store";

export const Route = createFileRoute("/pantry/$id")({
  component: PantryDetail,
});

function PantryDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { pantryItems } = useStore();
  const p = pantryItems.find((x) => x.id === id);
  const [storeInput, setStoreInput] = useState("");

  if (!p) {
    return (
      <AppShell title="Not found">
        <Link to="/pantry" className="text-sm text-sienna">← Back to Pantry</Link>
      </AppShell>
    );
  }

  function addStore(e: React.FormEvent) {
    e.preventDefault();
    const val = storeInput.trim();
    if (!val || p!.stores.includes(val)) return;
    updatePantryItem(p!.id, { stores: [...p!.stores, val] });
    setStoreInput("");
  }

  function removeStore(s: string) {
    updatePantryItem(p!.id, { stores: p!.stores.filter((x) => x !== s) });
  }

  return (
    <AppShell>
      {/* Back + actions */}
      <div className="mb-4 flex items-center justify-between">
        <Link to="/pantry" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> Pantry
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/new"
            search={{ type: "pantry", edit: p.id }}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-cream px-3 text-xs font-semibold text-ink"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Link>
          <ConfirmDelete
            name={p.name}
            onConfirm={() => { deletePantryItem(p.id); navigate({ to: "/pantry" }); }}
            trigger={
              <button aria-label="Delete item" className="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink/60 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            }
          />
        </div>
      </div>

      {/* Hero */}
      {p.photo ? (
        <img src={p.photo} alt={p.name} className="mb-5 h-56 w-full rounded-3xl object-cover" />
      ) : (
        <EmptyArt kind="pantry" className="mb-5 h-44 w-full rounded-3xl" />
      )}

      {/* Category pill + buy-again */}
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="folio rounded-full bg-saffron/10 px-2.5 py-0.5 text-saffron">{p.category}</span>
        {p.wouldBuyAgain && <span className="folio text-saffron">★ Buy again</span>}
      </div>

      <h1 className="font-display text-[34px] leading-tight text-ink">{p.name}</h1>
      {p.brand && <p className="mt-1 text-sm text-ink/60">{p.brand}</p>}
      <div className="mt-3"><FavoriteBadges r={p} /></div>

      {/* Household score */}
      <div className="mt-4"><HouseholdReadout r={p} /></div>

      {/* Per-person dials */}
      <section className="mt-4 space-y-4 rounded-2xl bg-card p-4">
        <RatingDial
          label="Chase"
          value={p.chaseRating}
          onChange={(v) => updatePantryItem(p.id, { chaseRating: v })}
        />
        <RatingDial
          label="Chloe"
          value={p.chloeRating}
          onChange={(v) => updatePantryItem(p.id, { chloeRating: v })}
        />
      </section>

      {/* Would buy again */}
      <div className="mt-4">
        <Pill
          on={!!p.wouldBuyAgain}
          onClick={() => updatePantryItem(p.id, { wouldBuyAgain: !p.wouldBuyAgain })}
        >
          {p.wouldBuyAgain ? "★ Would buy again" : "Mark would buy again"}
        </Pill>
      </div>

      {/* Notes */}
      <section className="mt-5">
        <Field label="Notes">
          <TextArea
            defaultValue={p.notes ?? ""}
            onBlur={(e) => updatePantryItem(p.id, { notes: e.currentTarget.value })}
            placeholder="What makes this a household staple…"
          />
        </Field>
      </section>

      {/* Where to buy */}
      <section className="mt-5">
        <Field label="Available At">
          {p.stores.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {p.stores.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-full border border-bone/15 bg-graphite px-2.5 py-1 text-xs text-bone"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeStore(s)}
                    className="text-bone-dim hover:text-saffron"
                    aria-label={`Remove ${s}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <form onSubmit={addStore} className="flex gap-2">
            <TextInput
              value={storeInput}
              onChange={(e) => setStoreInput(e.target.value)}
              placeholder="Whole Foods, Amazon, Costco…"
            />
            <button
              type="submit"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-saffron text-noir"
            >
              <Plus className="h-4 w-4" />
            </button>
          </form>
        </Field>
      </section>

      {/* Tags */}
      {p.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => <TagChip key={t} tag={t} />)}
        </div>
      )}

      {/* Summary rating at bottom */}
      <div className="mt-6">
        <MiniRating r={p} />
      </div>
    </AppShell>
  );
}
