import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Pencil, Trash2, Plus } from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { AppShell } from "@/components/AppShell";
import {
  EmptyArt, HouseholdReadout, MiniRating, RatingDial, TagChip, WarningNotes,
  Field, TextArea, TextInput, Pill,
} from "@/components/bits";
import {
  addRestaurantItem, deleteRestaurant, deleteRestaurantItem, updateRestaurant, updateRestaurantItem,
  useStore, householdRating, type RestaurantItem,
} from "@/lib/store";

const search = z.object({ focus: fallback(z.string().optional(), undefined).default(undefined) });

export const Route = createFileRoute("/out/$id")({
  validateSearch: zodValidator(search),
  component: RestaurantDetail,
});

function RestaurantDetail() {
  const { id } = Route.useParams();
  const { focus } = Route.useSearch();
  const navigate = useNavigate();
  const { restaurants } = useStore();
  const r = restaurants.find((x) => x.id === id);
  const [tab, setTab] = useState<"food" | "drinks">("food");
  // Track the id of a just-added item so its row auto-opens.
  const [newItemId, setNewItemId] = useState<string | null>(null);

  if (!r) {
    return (
      <AppShell title="Not found">
        <Link to="/out" className="text-sm text-sienna">← Back to Going Out</Link>
      </AppShell>
    );
  }

  function changeTab(t: "food" | "drinks") {
    setTab(t);
    setNewItemId(null);
  }

  const activeItems = tab === "food" ? r.dishes : r.drinks;
  const activeSection: "dishes" | "drinks" = tab === "food" ? "dishes" : "drinks";

  return (
    <AppShell>
      <div className="mb-4 flex items-center justify-between">
        <Link to="/out" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> Going Out
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/new"
            search={{ type: "restaurant", edit: r.id }}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-cream px-3 text-xs font-semibold text-ink"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Link>
          <button
            onClick={() => {
              if (confirm("Delete this restaurant?")) {
                deleteRestaurant(r.id);
                navigate({ to: "/out" });
              }
            }}
            className="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink/60 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {r.photo ? (
        <img src={r.photo} alt={r.name} className="mb-5 h-56 w-full rounded-3xl object-cover" />
      ) : (
        <EmptyArt kind="restaurant" className="mb-5 h-44 w-full rounded-3xl" />
      )}

      <h1 className="font-display text-[34px] leading-tight text-ink">{r.name}</h1>
      <p className="mt-1 text-sm text-ink/60">{r.location}</p>

      <div className="mt-4"><HouseholdReadout r={r} /></div>

      <section className="mt-4 space-y-4 rounded-2xl bg-card p-4">
        <RatingDial label="Chase" value={r.chaseRating} onChange={(v) => updateRestaurant(r.id, { chaseRating: v })} />
        <RatingDial label="Chloe" value={r.chloeRating} onChange={(v) => updateRestaurant(r.id, { chloeRating: v })} />
      </section>

      <section className="mt-5">
        <Field label="Overall notes">
          <TextArea
            defaultValue={r.notes ?? ""}
            onBlur={(e) => updateRestaurant(r.id, { notes: e.currentTarget.value })}
            placeholder="Vibe, service, what to order again…"
          />
        </Field>
      </section>

      <div className="mt-4">
        <Pill on={!!r.wouldReturn} onClick={() => updateRestaurant(r.id, { wouldReturn: !r.wouldReturn })}>
          {r.wouldReturn ? "★ Would return" : "Mark would return"}
        </Pill>
      </div>

      <div className="mt-4"><WarningNotes tags={r.tags} /></div>
      {r.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {r.tags.map((t) => <TagChip key={t} tag={t} />)}
        </div>
      )}

      {/* ── Food / Drinks tabs ── */}
      <div className="mt-7 flex gap-1 rounded-2xl bg-cream p-1">
        <button
          onClick={() => changeTab("food")}
          className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-colors ${tab === "food" ? "bg-card text-ink shadow-sm" : "text-ink/55"}`}
        >
          Food ({r.dishes.length})
        </button>
        <button
          onClick={() => changeTab("drinks")}
          className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-colors ${tab === "drinks" ? "bg-card text-ink shadow-sm" : "text-ink/55"}`}
        >
          Drinks ({r.drinks.length})
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {activeItems.length === 0 && (
          <p className="py-6 text-center text-sm text-ink/40">
            No {tab === "food" ? "dishes" : "drinks"} added yet.
          </p>
        )}

        {activeItems.map((it) => (
          <ItemRow
            key={it.id}
            item={it}
            restaurantId={r.id}
            section={activeSection}
            initiallyOpen={focus === it.id || newItemId === it.id}
            highlighted={focus === it.id}
          />
        ))}

        <AddItemForm
          restaurantId={r.id}
          section={activeSection}
          onAdded={(addedId) => setNewItemId(addedId)}
        />
      </div>
    </AppShell>
  );
}

// ── Item row (view + inline edit) ──────────────────────────────────────────

function ItemRow({
  item,
  restaurantId,
  section,
  initiallyOpen,
  highlighted,
}: {
  item: RestaurantItem;
  restaurantId: string;
  section: "dishes" | "drinks";
  initiallyOpen: boolean;
  highlighted: boolean;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  const h = householdRating(item);

  return (
    <div
      className={`rounded-2xl border bg-card transition-colors ${
        highlighted ? "border-sienna ring-2 ring-sienna/20" : "border-border"
      }`}
    >
      {/* Collapsed header — tap to expand / collapse */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg text-ink">{item.name}</p>
          {item.notes && (
            <p className="mt-0.5 truncate text-xs text-ink/55">{item.notes}</p>
          )}
        </div>
        <span className="tnum rounded-full bg-bone px-2 py-0.5 text-xs font-semibold text-noir">
          {h != null ? h.toFixed(1) : "—"}
        </span>
      </button>

      {/* Expanded edit fields */}
      {open && (
        <div className="space-y-3 border-t border-border p-4">
          <Field label="Name">
            <TextInput
              defaultValue={item.name}
              onBlur={(e) =>
                updateRestaurantItem(restaurantId, section, item.id, { name: e.currentTarget.value })
              }
            />
          </Field>

          <Field label="Notes">
            <TextArea
              defaultValue={item.notes ?? ""}
              onBlur={(e) =>
                updateRestaurantItem(restaurantId, section, item.id, { notes: e.currentTarget.value })
              }
              placeholder="What stood out…"
            />
          </Field>

          <div className="space-y-3 rounded-xl bg-graphite/60 p-3">
            <RatingDial
              label="Chase"
              value={item.chaseRating}
              onChange={(v) => updateRestaurantItem(restaurantId, section, item.id, { chaseRating: v })}
            />
            <RatingDial
              label="Chloe"
              value={item.chloeRating}
              onChange={(v) => updateRestaurantItem(restaurantId, section, item.id, { chloeRating: v })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Pill
              on={!!item.wouldOrderAgain}
              onClick={() =>
                updateRestaurantItem(restaurantId, section, item.id, { wouldOrderAgain: !item.wouldOrderAgain })
              }
            >
              {item.wouldOrderAgain ? "★ Would order again" : "Mark would order again"}
            </Pill>
            <button
              onClick={() => {
                if (confirm(`Delete "${item.name}"?`)) {
                  deleteRestaurantItem(restaurantId, section, item.id);
                }
              }}
              className="text-xs text-destructive hover:opacity-80"
            >
              Delete
            </button>
          </div>

          <MiniRating r={item} />
        </div>
      )}
    </div>
  );
}

// ── Add item form (collapsed button → full form) ────────────────────────────

function AddItemForm({
  restaurantId,
  section,
  onAdded,
}: {
  restaurantId: string;
  section: "dishes" | "drinks";
  onAdded: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [chase, setChase] = useState<number | undefined>(undefined);
  const [chloe, setChloe] = useState<number | undefined>(undefined);
  const [wouldOrder, setWouldOrder] = useState(false);

  function reset() {
    setName("");
    setNotes("");
    setChase(undefined);
    setChloe(undefined);
    setWouldOrder(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const item = addRestaurantItem(restaurantId, section, {
      name: name.trim(),
      notes: notes.trim() || undefined,
      chaseRating: chase,
      chloeRating: chloe,
      wouldOrderAgain: wouldOrder,
    });
    onAdded(item.id);
    reset();
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-bone/20 py-3 text-sm text-bone-dim hover:border-saffron/40 hover:text-saffron transition-colors"
      >
        <Plus className="h-4 w-4" />
        {section === "dishes" ? "Add dish" : "Add drink"}
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-saffron/30 bg-card p-4">
      <p className="font-display text-base text-ink">
        {section === "dishes" ? "New dish" : "New drink"}
      </p>

      <Field label="Name">
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder={section === "dishes" ? "Dish name" : "Drink name"}
        />
      </Field>

      <Field label="Notes">
        <TextArea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="First impressions…"
        />
      </Field>

      <div className="space-y-3 rounded-xl bg-graphite/60 p-3">
        <RatingDial label="Chase" value={chase} onChange={setChase} />
        <RatingDial label="Chloe" value={chloe} onChange={setChloe} />
      </div>

      <Pill on={wouldOrder} onClick={() => setWouldOrder((v) => !v)}>
        {wouldOrder ? "★ Would order again" : "Mark would order again"}
      </Pill>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-saffron py-2.5 text-sm font-semibold text-noir"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => { reset(); setOpen(false); }}
          className="rounded-xl border border-bone/15 px-4 py-2.5 text-sm text-bone-dim hover:text-bone transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
