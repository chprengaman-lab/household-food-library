import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { AppShell } from "@/components/AppShell";
import {
  EmptyArt, HouseholdReadout, RatingDial, TagChip, WarningNotes,
  Field, TextArea, TextInput, Pill, ConfirmDelete,
} from "@/components/bits";
import {
  addRestaurantItem, deleteRestaurant, deleteRestaurantItem, updateRestaurant, updateRestaurantItem,
  useStore, householdRating, restaurantLocation, type RestaurantItem,
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
          <ConfirmDelete
            name={r.name}
            onConfirm={() => { deleteRestaurant(r.id); navigate({ to: "/out" }); }}
            trigger={
              <button aria-label="Delete restaurant" className="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink/60 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            }
          />
        </div>
      </div>

      {r.photo ? (
        <img src={r.photo} alt={r.name} className="mb-5 h-56 w-full rounded-3xl object-cover" />
      ) : (
        <EmptyArt kind="restaurant" className="mb-5 h-44 w-full rounded-3xl" />
      )}

      <h1 className="font-display text-[34px] leading-tight text-ink">{r.name}</h1>
      {(r.city || r.state || r.country) && (
        <p className="mt-1 text-sm text-ink/60">📍 {restaurantLocation(r)}</p>
      )}
      {r.visitDate && (
        <p className="mt-0.5 text-xs text-bone-dim">
          Visited {new Date(r.visitDate).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
        </p>
      )}

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

      {/* ── Food / Drinks tab bar ── */}
      <div className="mt-7 flex gap-1 rounded-2xl bg-cream p-1">
        {(["food", "drinks"] as const).map((t) => {
          const isActive = tab === t;
          const count = t === "food" ? r.dishes.length : r.drinks.length;
          return (
            <button
              key={t}
              onClick={() => changeTab(t)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                isActive ? "bg-card text-saffron shadow-sm" : "text-bone-dim hover:text-bone"
              }`}
            >
              {t === "food" ? "Food" : "Drinks"}
              <span
                className={`inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px] font-medium ${
                  isActive ? "bg-saffron/15 text-saffron" : "bg-bone/10 text-bone-dim"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Item list ── */}
      <div className="mt-4 space-y-2">
        {activeItems.length === 0 && (
          <p className="py-8 text-center text-sm text-bone-dim">
            No {tab === "food" ? "dishes" : "drinks"} yet — add one below.
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

// ── Item row (scan view + inline edit) ────────────────────────────────────────

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
  const hasSubline =
    !!item.notes || item.chaseRating != null || item.chloeRating != null;

  const perPersonLabel = [
    item.chaseRating != null ? `C ${item.chaseRating.toFixed(1)}` : null,
    item.chloeRating != null ? `Ch ${item.chloeRating.toFixed(1)}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      className={`rounded-2xl border bg-card transition-colors ${
        highlighted ? "border-sienna ring-2 ring-sienna/20" : "border-border"
      }`}
    >
      {/* Collapsed scan row — tap to expand / collapse */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        {/* Name + optional subline */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <p className="truncate font-display text-base leading-snug text-bone">
              {item.name}
            </p>
            {item.wouldOrderAgain && (
              <span className="shrink-0 text-[11px] leading-none text-saffron" aria-label="Would order again">
                ★
              </span>
            )}
          </div>

          {hasSubline && (
            <div className="mt-0.5 flex min-w-0 items-center gap-2">
              {item.notes && (
                <p className="min-w-0 flex-1 truncate text-xs text-bone-dim">
                  {item.notes}
                </p>
              )}
              {perPersonLabel && (
                <p className="tnum ml-auto shrink-0 text-xs text-bone-dim">
                  {perPersonLabel}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Avg badge + chevron */}
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="tnum rounded-full bg-bone px-2 py-0.5 text-xs font-semibold text-noir">
            {h != null ? h.toFixed(1) : "—"}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-bone-dim transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded edit fields */}
      {open && (
        <div className="space-y-3 border-t border-border px-4 pb-4 pt-3">
          <Field label="Name">
            <TextInput
              defaultValue={item.name}
              onBlur={(e) =>
                updateRestaurantItem(restaurantId, section, item.id, {
                  name: e.currentTarget.value,
                })
              }
            />
          </Field>

          <Field label="Notes">
            <TextArea
              defaultValue={item.notes ?? ""}
              onBlur={(e) =>
                updateRestaurantItem(restaurantId, section, item.id, {
                  notes: e.currentTarget.value,
                })
              }
              placeholder="What stood out…"
            />
          </Field>

          <div className="space-y-3 rounded-xl bg-graphite/60 p-3">
            <RatingDial
              label="Chase"
              value={item.chaseRating}
              onChange={(v) =>
                updateRestaurantItem(restaurantId, section, item.id, { chaseRating: v })
              }
            />
            <RatingDial
              label="Chloe"
              value={item.chloeRating}
              onChange={(v) =>
                updateRestaurantItem(restaurantId, section, item.id, { chloeRating: v })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Pill
              on={!!item.wouldOrderAgain}
              onClick={() =>
                updateRestaurantItem(restaurantId, section, item.id, {
                  wouldOrderAgain: !item.wouldOrderAgain,
                })
              }
            >
              {item.wouldOrderAgain ? "★ Would order again" : "Mark would order again"}
            </Pill>
            <ConfirmDelete
              name={item.name}
              onConfirm={() => deleteRestaurantItem(restaurantId, section, item.id)}
              trigger={<button type="button" className="text-xs text-destructive hover:opacity-80">Delete</button>}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Add item form (collapsed trigger → full inline form) ──────────────────────

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
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-saffron/20 bg-saffron/10 py-3.5 text-sm font-medium text-saffron transition-colors hover:bg-saffron/15"
      >
        <Plus className="h-4 w-4" />
        {section === "dishes" ? "Add dish" : "Add drink"}
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-saffron/30 bg-card p-4">
      <p className="font-display text-base text-bone">
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
          className="rounded-xl border border-bone/15 px-4 py-2.5 text-sm text-bone-dim transition-colors hover:text-bone"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
