import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { bumpTimesMade, deleteRecipe, updateRecipe, useStore, householdRating } from "@/lib/store";
import { EmptyArt, HouseholdReadout, RatingDial, ReviewBadge, Stepper, TagChip, WarningNotes, Field, TextArea, Pill, Label, AiBadge, FavoriteBadges, ConfirmDelete } from "@/components/bits";
import { relTime } from "./cookbook";

export const Route = createFileRoute("/cookbook/$id")({
  component: RecipeDetail,
});

function RecipeDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { recipes } = useStore();
  const r = recipes.find((x) => x.id === id);

  if (!r) {
    return (
      <AppShell title="Not found">
        <Link to="/cookbook" className="text-sm text-sienna">← Back to Cookbook</Link>
      </AppShell>
    );
  }

  const h = householdRating(r);

  return (
    <AppShell>
      <div className="mb-4 flex items-center justify-between">
        <Link to="/cookbook" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"><ArrowLeft className="h-4 w-4" /> Cookbook</Link>
        <div className="flex items-center gap-2">
          <Link to="/new" search={{ type: "recipe", edit: r.id }} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-cream px-3 text-xs font-semibold text-ink"><Pencil className="h-3.5 w-3.5" /> Edit</Link>
          <ConfirmDelete
            name={r.name}
            onConfirm={() => { deleteRecipe(r.id); navigate({ to: "/cookbook" }); }}
            trigger={<button className="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink/60 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>}
          />
        </div>
      </div>

      {r.photo ? (
        <img src={r.photo} alt={r.name} className="mb-5 h-56 w-full rounded-3xl object-cover" />
      ) : (
        <EmptyArt kind="recipe" className="mb-5 h-44 w-full rounded-3xl" />
      )}

      <div className="mb-1 flex items-baseline gap-2">
        {r.needsReview && <ReviewBadge />}
      </div>
      <h1 className="font-display text-[34px] leading-tight text-ink">{r.name}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-ink/60 tnum">
        {r.cuisine && <span>{r.cuisine}</span>}
        {r.calories != null && (
          <span className="flex items-center gap-1.5">
            {r.calories} cal
            {r.aiGeneratedFields?.includes("calories") && <AiBadge />}
          </span>
        )}
        {r.protein != null && (
          <span className="flex items-center gap-1.5">
            {r.protein}g protein
            {r.aiGeneratedFields?.includes("protein") && <AiBadge />}
          </span>
        )}
        {r.difficulty && <span>{r.difficulty}</span>}
        {r.portion && <span>{r.portion}</span>}
      </div>
      <div className="mt-3"><FavoriteBadges r={r} /></div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-cream p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">Household</p>
          <p className="tnum font-display text-3xl text-sienna">{h != null ? h.toFixed(1) : "—"}</p>
          <p className="mt-1 text-[11px] text-ink/55 tnum">Chase {r.chaseRating?.toFixed(1) ?? "—"} · Chloe {r.chloeRating?.toFixed(1) ?? "—"}</p>
        </div>
        <div className="rounded-2xl bg-cream p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">Times made</p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <Stepper value={r.timesMade} onChange={(v) => updateRecipe(r.id, { timesMade: v, lastMade: v > r.timesMade ? Date.now() : r.lastMade })} />
          </div>
          <p className="mt-2 text-[11px] text-ink/55">{r.lastMade ? `Last ${relTime(r.lastMade)}` : "Never made"}</p>
        </div>
      </div>

      <div className="mt-4"><WarningNotes tags={r.tags} /></div>

      {r.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">{r.tags.map((t) => <TagChip key={t} tag={t} />)}</div>
      )}

      <div className="mt-4">
        <Pill on={!!r.wouldMakeAgain} onClick={() => updateRecipe(r.id, { wouldMakeAgain: !r.wouldMakeAgain })}>
          {r.wouldMakeAgain ? "★ Would make again" : "Mark would make again"}
        </Pill>
      </div>

      <Section title="Ingredients">
        {r.ingredients.length === 0 ? <p className="text-sm text-ink/50">None yet.</p> : (
          <ul className="space-y-1.5">
            {r.ingredients.map((it, i) => (
              <li key={i} className="flex gap-2 text-sm"><span className="text-sienna">·</span>{it}</li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Instructions">
        {r.instructions.length === 0 ? <p className="text-sm text-ink/50">None yet.</p> : (
          <ol className="space-y-3">
            {r.instructions.map((it, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span className="tnum mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sienna/10 text-[11px] font-bold text-sienna">{i + 1}</span>
                <span>{it}</span>
              </li>
            ))}
          </ol>
        )}
      </Section>

      <Section title="Notes">
        <NotesEditor label="" value={r.notes ?? ""} onSave={(v) => updateRecipe(r.id, { notes: v })} placeholder="Anything to remember about this one…" />
      </Section>

      <Section title="What to change next time">
        <NotesEditor label="" value={r.nextTimeNotes ?? ""} onSave={(v) => updateRecipe(r.id, { nextTimeNotes: v })} placeholder="More garlic. Less salt. Try sourdough crumbs." />
      </Section>

      <Section title="Ratings">
        <div className="space-y-4 rounded-2xl bg-card p-4">
          <RatingDial label="Chase" value={r.chaseRating} onChange={(v) => updateRecipe(r.id, { chaseRating: v })} />
          <RatingDial label="Chloe" value={r.chloeRating} onChange={(v) => updateRecipe(r.id, { chloeRating: v })} />
          <HouseholdReadout r={r} />
        </div>
      </Section>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="mb-3 font-display text-xl text-ink">{title}</h2>
      {children}
    </section>
  );
}

function NotesEditor({ value, onSave, placeholder, label }: { value: string; onSave: (v: string) => void; placeholder?: string; label: string }) {
  return (
    <Field label={label}>
      <TextArea defaultValue={value} placeholder={placeholder} onBlur={(e) => onSave(e.currentTarget.value)} />
    </Field>
  );
}
