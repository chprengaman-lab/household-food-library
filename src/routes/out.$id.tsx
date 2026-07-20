import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ChevronDown, Pencil, Plus, Trash2, X } from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import * as Dialog from "@radix-ui/react-dialog";
import { AppShell } from "@/components/AppShell";
import {
  EmptyArt, HouseholdReadout, RatingDial, TagChip, WarningNotes,
  Field, TextArea, TextInput, Pill, ConfirmDelete, Label,
} from "@/components/bits";
import {
  addRestaurantItem, deleteRestaurant, deleteRestaurantItem, updateRestaurant, updateRestaurantItem,
  addVisit, updateVisit, deleteVisit,
  useStore, householdRating, restaurantLocation, type RestaurantItem, type Restaurant, type RestaurantVisit,
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
  const { restaurants, visits: allVisits } = useStore();
  const r = restaurants.find((x) => x.id === id);
  const [tab, setTab] = useState<"food" | "drinks">("food");
  const [newItemId, setNewItemId] = useState<string | null>(null);
  const [visitDialogOpen, setVisitDialogOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<RestaurantVisit | null>(null);

  if (!r) {
    return (
      <AppShell title="Not found">
        <Link to="/out" className="text-sm text-sienna">← Back to Going Out</Link>
      </AppShell>
    );
  }

  const visits = allVisits
    .filter((v) => v.restaurantId === id)
    .sort((a, b) => (b.visitDate ?? b.createdAt) - (a.visitDate ?? a.createdAt));

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

      {/* ── Visit stats ── */}
      {visits.length > 0 && (() => {
        const withBill = visits.filter((v) => v.billTotal != null);
        const avg = withBill.length > 0 ? withBill.reduce((s, v) => s + v.billTotal!, 0) / withBill.length : undefined;
        const last = visits[0]?.billTotal;
        return (
          <section className="mt-5 rounded-2xl border border-bone/10 bg-graphite p-5">
            <p className="folio mb-3 text-saffron">Visit History</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="tnum lining font-display text-2xl text-bone">{visits.length}</p>
                <p className="folio mt-0.5">Visits</p>
              </div>
              {avg != null && (
                <div>
                  <p className="tnum lining font-display text-2xl text-saffron">${avg.toFixed(2)}</p>
                  <p className="folio mt-0.5">Avg spend</p>
                </div>
              )}
              {last != null && (
                <div>
                  <p className="tnum lining font-display text-2xl text-bone">${last.toFixed(2)}</p>
                  <p className="folio mt-0.5">Last visit</p>
                </div>
              )}
            </div>
          </section>
        );
      })()}

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

      {/* ── Visit History section ── */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-bone">Visits</h2>
          <button
            type="button"
            onClick={() => { setEditingVisit(null); setVisitDialogOpen(true); }}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-saffron px-3 text-xs font-semibold text-noir"
          >
            <Plus className="h-3.5 w-3.5" /> Add Visit
          </button>
        </div>

        {visits.length === 0 ? (
          <p className="py-6 text-center text-sm text-bone-dim">No visits logged yet.</p>
        ) : (
          <div className="space-y-3">
            {visits.map((v) => (
              <VisitCard
                key={v.id}
                visit={v}
                restaurant={r}
                onEdit={() => { setEditingVisit(v); setVisitDialogOpen(true); }}
                onDelete={() => deleteVisit(v.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Visit Dialog ── */}
      <Dialog.Root
        open={visitDialogOpen}
        onOpenChange={(open) => { setVisitDialogOpen(open); if (!open) setEditingVisit(null); }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-noir/70 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl border-t border-bone/15 bg-graphite px-5 pb-8 pt-5 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:border sm:px-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl text-bone">
                {editingVisit ? "Edit Visit" : "Log a Visit"}
              </h2>
              <Dialog.Close asChild>
                <button aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full bg-slate text-bone-dim hover:text-bone">
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>
            <VisitForm
              restaurant={r}
              existing={editingVisit ?? undefined}
              onSave={() => { setVisitDialogOpen(false); setEditingVisit(null); }}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
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

// ── Visit Card ────────────────────────────────────────────────────────────────

function VisitCard({
  visit,
  restaurant,
  onEdit,
  onDelete,
}: {
  visit: RestaurantVisit;
  restaurant: Restaurant;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const orderedDishes = visit.selectedDishIds
    .map((id) => restaurant.dishes.find((d) => d.id === id))
    .filter(Boolean) as RestaurantItem[];
  const orderedDrinks = visit.selectedDrinkIds
    .map((id) => restaurant.drinks.find((d) => d.id === id))
    .filter(Boolean) as RestaurantItem[];
  const ordered = [...orderedDishes, ...orderedDrinks];

  return (
    <div className="rounded-2xl border border-bone/10 bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          {visit.visitDate != null && (
            <p className="folio text-saffron">
              {new Date(visit.visitDate).toLocaleDateString(undefined, {
                month: "long", day: "numeric", year: "numeric",
              })}
            </p>
          )}
          {visit.billTotal != null && (
            <p className="tnum lining mt-0.5 font-display text-xl text-bone">
              ${visit.billTotal.toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-1.5">
          <button
            type="button"
            onClick={onEdit}
            className="grid h-8 w-8 place-items-center rounded-full bg-slate text-bone-dim hover:text-bone"
            aria-label="Edit visit"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <ConfirmDelete
            name="this visit"
            onConfirm={onDelete}
            trigger={
              <button
                type="button"
                aria-label="Delete visit"
                className="grid h-8 w-8 place-items-center rounded-full bg-slate text-bone-dim hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            }
          />
        </div>
      </div>
      {ordered.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {ordered.map((it) => (
            <span
              key={it.id}
              className="rounded-full bg-bone/10 px-2.5 py-1 text-xs text-bone-dim"
            >
              {it.name}
            </span>
          ))}
        </div>
      )}
      {visit.notes && (
        <p className="mt-2 text-sm leading-relaxed text-bone-dim">{visit.notes}</p>
      )}
    </div>
  );
}

// ── Visit Form ────────────────────────────────────────────────────────────────

function VisitForm({
  restaurant,
  existing,
  onSave,
}: {
  restaurant: Restaurant;
  existing?: RestaurantVisit;
  onSave: () => void;
}) {
  const [visitDate, setVisitDate] = useState(
    existing?.visitDate
      ? new Date(existing.visitDate).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  );
  const [billTotal, setBillTotal] = useState(
    existing?.billTotal != null ? existing.billTotal.toFixed(2) : "",
  );
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [selectedDishIds, setSelectedDishIds] = useState<string[]>(
    existing?.selectedDishIds ?? [],
  );
  const [selectedDrinkIds, setSelectedDrinkIds] = useState<string[]>(
    existing?.selectedDrinkIds ?? [],
  );
  const [quickName, setQuickName] = useState("");
  const [quickSection, setQuickSection] = useState<"dishes" | "drinks">("dishes");

  const dishes = restaurant.dishes;
  const drinks = restaurant.drinks;

  function toggleId(
    id: string,
    selected: string[],
    setSelected: (v: string[]) => void,
  ) {
    setSelected(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  }

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!quickName.trim()) return;
    const item = addRestaurantItem(restaurant.id, quickSection, { name: quickName.trim() });
    if (quickSection === "dishes") {
      setSelectedDishIds((prev) => [...prev, item.id]);
    } else {
      setSelectedDrinkIds((prev) => [...prev, item.id]);
    }
    setQuickName("");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      restaurantId: restaurant.id,
      visitDate: visitDate ? new Date(visitDate).getTime() : undefined,
      billTotal: billTotal.trim() ? Number(billTotal) : undefined,
      notes: notes.trim() || undefined,
      selectedDishIds,
      selectedDrinkIds,
    };
    if (existing) {
      updateVisit(existing.id, payload);
    } else {
      addVisit({ ...payload, id: crypto.randomUUID() });
    }
    onSave();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date">
          <TextInput
            type="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
          />
        </Field>
        <Field label="Bill total ($)">
          <TextInput
            inputMode="decimal"
            value={billTotal}
            onChange={(e) => setBillTotal(e.target.value)}
            placeholder="42.50"
          />
        </Field>
      </div>

      <Field label="Notes">
        <TextArea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What stood out, who came, anything to remember…"
        />
      </Field>

      {dishes.length > 0 && (
        <div>
          <Label>Dishes ordered</Label>
          <div className="flex flex-wrap gap-1.5">
            {dishes.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => toggleId(d.id, selectedDishIds, setSelectedDishIds)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selectedDishIds.includes(d.id)
                    ? "border-saffron bg-saffron/15 text-saffron"
                    : "border-bone/15 bg-graphite text-bone-dim hover:border-bone/30"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {drinks.length > 0 && (
        <div>
          <Label>Drinks ordered</Label>
          <div className="flex flex-wrap gap-1.5">
            {drinks.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => toggleId(d.id, selectedDrinkIds, setSelectedDrinkIds)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selectedDrinkIds.includes(d.id)
                    ? "border-saffron bg-saffron/15 text-saffron"
                    : "border-bone/15 bg-graphite text-bone-dim hover:border-bone/30"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick-add a new dish or drink */}
      <div className="rounded-xl border border-bone/10 bg-noir/40 p-3">
        <div className="mb-2 flex items-center gap-1">
          <span className="folio text-bone-dim">Quick add</span>
          {(["dishes", "drinks"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuickSection(s)}
              className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                quickSection === s ? "bg-saffron text-noir" : "text-bone-dim hover:text-bone"
              }`}
            >
              {s === "dishes" ? "Dish" : "Drink"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <TextInput
            value={quickName}
            onChange={(e) => setQuickName(e.target.value)}
            placeholder={quickSection === "dishes" ? "New dish name…" : "New drink name…"}
          />
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!quickName.trim()}
            className="shrink-0 rounded-xl bg-saffron px-3 py-2 text-xs font-semibold text-noir disabled:opacity-40"
          >
            Add & Select
          </button>
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-saffron py-3 text-sm font-semibold text-noir"
        >
          {existing ? "Save Changes" : "Log Visit"}
        </button>
      </div>
    </form>
  );
}
