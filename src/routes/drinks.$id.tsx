import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EmptyArt, HouseholdReadout, RatingDial, ReviewBadge, TagChip, WarningNotes, Field, TextArea } from "@/components/bits";
import { deleteDrink, drinkKindLabel, updateDrink, useStore } from "@/lib/store";

export const Route = createFileRoute("/drinks/$id")({
  component: DrinkDetail,
});

function DrinkDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { drinks } = useStore();
  const d = drinks.find((x) => x.id === id);

  if (!d) {
    return (
      <AppShell title="Not found">
        <Link to="/drinks" className="text-sm text-sienna">← Back to Drink Lab</Link>
      </AppShell>
    );
  }

  const isEsp = d.drinkKind === "espresso";

  return (
    <AppShell>
      <div className="mb-4 flex items-center justify-between">
        <Link to="/drinks" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"><ArrowLeft className="h-4 w-4" /> Drink Lab</Link>
        <div className="flex items-center gap-2">
          <Link to="/new" search={{ type: "drink", edit: d.id }} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-cream px-3 text-xs font-semibold text-ink"><Pencil className="h-3.5 w-3.5" /> Edit</Link>
          <button onClick={() => { if (confirm("Delete this drink?")) { deleteDrink(d.id); navigate({ to: "/drinks" }); } }}
            className="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink/60 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
        </div>
      </div>

      {d.photo ? (
        <img src={d.photo} alt={d.name} className="mb-5 h-56 w-full rounded-3xl object-cover" />
      ) : (
        <EmptyArt kind={isEsp ? "espresso" : "drink"} className="mb-5 h-44 w-full rounded-3xl" />
      )}

      {d.needsReview && <ReviewBadge />}
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sienna">{drinkKindLabel[d.drinkKind]}</p>
      <h1 className="font-display text-[34px] leading-tight text-ink">{d.name}</h1>

      {isEsp && d.espresso && (
        <section className="mt-5">
          <h2 className="mb-3 font-display text-xl">Dial-in</h2>
          <div className="grid grid-cols-2 gap-3 tnum">
            <Stat k="Bean" v={d.espresso.bean ?? "—"} />
            <Stat k="Milk" v={d.espresso.milk ?? "—"} />
            <Stat k="Dose" v={d.espresso.doseG != null ? `${d.espresso.doseG} g` : "—"} />
            <Stat k="Yield" v={d.espresso.yieldG != null ? `${d.espresso.yieldG} g` : "—"} />
            <Stat k="Brew time" v={d.espresso.brewTimeSec != null ? `${d.espresso.brewTimeSec} s` : "—"} />
            <Stat k="Grind" v={d.espresso.grindSetting ?? "—"} />
          </div>
        </section>
      )}

      {(d.ingredients?.length ?? 0) > 0 && (
        <section className="mt-7">
          <h2 className="mb-3 font-display text-xl">Ingredients</h2>
          <ul className="space-y-1.5">{d.ingredients!.map((i, idx) => <li key={idx} className="flex gap-2 text-sm"><span className="text-sienna">·</span>{i}</li>)}</ul>
        </section>
      )}

      {(d.instructions?.length ?? 0) > 0 && (
        <section className="mt-7">
          <h2 className="mb-3 font-display text-xl">Method</h2>
          <ol className="space-y-3">
            {d.instructions!.map((i, idx) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed">
                <span className="tnum mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sienna/10 text-[11px] font-bold text-sienna">{idx + 1}</span>{i}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-7">
        <Field label="Tasting notes">
          <TextArea defaultValue={d.tasteNotes ?? ""} onBlur={(e) => updateDrink(d.id, { tasteNotes: e.currentTarget.value })} placeholder="Mouthfeel, balance, surprises…" />
        </Field>
      </section>

      <div className="mt-4"><WarningNotes tags={d.tags} /></div>
      {d.tags.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">{d.tags.map((t) => <TagChip key={t} tag={t} />)}</div>}

      <section className="mt-7">
        <h2 className="mb-3 font-display text-xl">Ratings</h2>
        <div className="space-y-4 rounded-2xl bg-card p-4">
          <RatingDial label="Chase" value={d.chaseRating} onChange={(v) => updateDrink(d.id, { chaseRating: v })} />
          <RatingDial label="Chloe" value={d.chloeRating} onChange={(v) => updateDrink(d.id, { chloeRating: v })} />
          <HouseholdReadout r={d} />
        </div>
      </section>
    </AppShell>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl bg-cream p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">{k}</p>
      <p className="mt-0.5 text-base font-semibold text-ink">{v}</p>
    </div>
  );
}
