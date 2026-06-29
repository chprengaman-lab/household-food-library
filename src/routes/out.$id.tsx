import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Pencil, Trash2, Plus } from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { AppShell } from "@/components/AppShell";
import {
  EmptyArt, HouseholdReadout, MiniRating, RatingDial, TagChip, WarningNotes,
  Field, TextArea, TextInput, Pill, Label,
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

  if (!r) {
    return (
      <AppShell title="Not found">
        <Link to="/out" className="text-sm text-sienna">← Back to Going Out</Link>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-4 flex items-center justify-between">
        <Link to="/out" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"><ArrowLeft className="h-4 w-4" /> Going Out</Link>
        <div className="flex items-center gap-2">
          <Link to="/new" search={{ type: "restaurant", edit: r.id }} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-cream px-3 text-xs font-semibold text-ink"><Pencil className="h-3.5 w-3.5" /> Edit</Link>
          <button onClick={() => { if (confirm("Delete this restaurant?")) { deleteRestaurant(r.id); navigate({ to: "/out" }); } }}
            className="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink/60 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
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
          <TextArea defaultValue={r.notes ?? ""} onBlur={(e) => updateRestaurant(r.id, { notes: e.currentTarget.value })} placeholder="Vibe, service, what to order again…" />
        </Field>
      </section>

      <div className="mt-4">
        <Pill on={!!r.wouldReturn} onClick={() => updateRestaurant(r.id, { wouldReturn: !r.wouldReturn })}>
          {r.wouldReturn ? "★ Would return" : "Mark would return"}
        </Pill>
      </div>

      <div className="mt-4"><WarningNotes tags={r.tags} /></div>
      {r.tags.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{r.tags.map((t) => <TagChip key={t} tag={t} />)}</div>}

      <div className="mt-7 flex gap-1 rounded-2xl bg-cream p-1">
        <button onClick={() => setTab("food")} className={`flex-1 rounded-xl py-2 text-sm font-semibold ${tab === "food" ? "bg-card text-ink shadow-sm" : "text-ink/55"}`}>Food ({r.dishes.length})</button>
        <button onClick={() => setTab("drinks")} className={`flex-1 rounded-xl py-2 text-sm font-semibold ${tab === "drinks" ? "bg-card text-ink shadow-sm" : "text-ink/55"}`}>Drinks ({r.drinks.length})</button>
      </div>

      <div className="mt-4 space-y-3">
        {(tab === "food" ? r.dishes : r.drinks).map((it) => (
          <ItemRow key={it.id} item={it} restaurantId={r.id} section={tab === "food" ? "dishes" : "drinks"} focused={focus === it.id} />
        ))}
        <AddItemRow restaurantId={r.id} section={tab === "food" ? "dishes" : "drinks"} />
      </div>
    </AppShell>
  );
}

function ItemRow({ item, restaurantId, section, focused }: { item: RestaurantItem; restaurantId: string; section: "dishes" | "drinks"; focused: boolean }) {
  const [open, setOpen] = useState(focused);
  const h = householdRating(item);
  return (
    <div className={`rounded-2xl border bg-card transition-colors ${focused ? "border-sienna ring-2 ring-sienna/20" : "border-border"}`}>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-3 p-4 text-left">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg text-ink">{item.name}</p>
          {item.notes && <p className="mt-0.5 truncate text-xs text-ink/55">{item.notes}</p>}
        </div>
        <span className="tnum rounded-full bg-ink px-2 py-0.5 text-xs font-semibold text-paper">{h != null ? h.toFixed(1) : "—"}</span>
      </button>
      {open && (
        <div className="space-y-3 border-t border-border p-4">
          <Field label="Name">
            <TextInput defaultValue={item.name} onBlur={(e) => updateRestaurantItem(restaurantId, section, item.id, { name: e.currentTarget.value })} />
          </Field>
          <Field label="Notes">
            <TextArea defaultValue={item.notes ?? ""} onBlur={(e) => updateRestaurantItem(restaurantId, section, item.id, { notes: e.currentTarget.value })} />
          </Field>
          <RatingDial label="Chase" value={item.chaseRating} onChange={(v) => updateRestaurantItem(restaurantId, section, item.id, { chaseRating: v })} />
          <RatingDial label="Chloe" value={item.chloeRating} onChange={(v) => updateRestaurantItem(restaurantId, section, item.id, { chloeRating: v })} />
          <div className="flex items-center justify-between">
            <Pill on={!!item.wouldOrderAgain} onClick={() => updateRestaurantItem(restaurantId, section, item.id, { wouldOrderAgain: !item.wouldOrderAgain })}>
              {item.wouldOrderAgain ? "★ Would order again" : "Mark would order again"}
            </Pill>
            <button onClick={() => { if (confirm("Delete?")) deleteRestaurantItem(restaurantId, section, item.id); }} className="text-xs text-destructive">Delete</button>
          </div>
          <MiniRating r={item} />
        </div>
      )}
    </div>
  );
}

function AddItemRow({ restaurantId, section }: { restaurantId: string; section: "dishes" | "drinks" }) {
  const [name, setName] = useState("");
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (!name.trim()) return;
      addRestaurantItem(restaurantId, section, { name: name.trim() });
      setName("");
    }} className="flex gap-2">
      <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder={section === "dishes" ? "Add a dish…" : "Add a drink…"} />
      <button type="submit" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sienna text-paper"><Plus className="h-4 w-4" /></button>
    </form>
  );
}
