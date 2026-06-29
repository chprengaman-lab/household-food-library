import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { AppShell } from "@/components/AppShell";
import {
  Field, TextInput, TextArea, Pill, AutofillBox, Label, RatingDial, HouseholdReadout, TagChip, Stepper, PhotoField,
} from "@/components/bits";
import {
  addRecipe, addDrink, addRestaurant, addRestaurantItem,
  updateRecipe, updateDrink, updateRestaurant, useStore,
  type Difficulty, type Portion, type DrinkKind, drinkKindLabel,
} from "@/lib/store";
import { parseNotes, applyAutofill } from "@/lib/autofill";

const search = z.object({
  type: fallback(z.enum(["recipe", "drink", "restaurant"]), "recipe").default("recipe"),
  edit: fallback(z.string().optional(), undefined).default(undefined),
});

export const Route = createFileRoute("/new")({
  validateSearch: zodValidator(search),
  head: () => ({ meta: [{ title: "Add — Chloe & Chase" }] }),
  component: NewItem,
});

function NewItem() {
  const { type, edit } = Route.useSearch();
  const { recipes, drinks, restaurants } = useStore();
  const navigate = useNavigate();

  const existing = useMemo(() => {
    if (!edit) return undefined;
    return recipes.find((r) => r.id === edit)
      ?? drinks.find((d) => d.id === edit)
      ?? restaurants.find((r) => r.id === edit);
  }, [edit, recipes, drinks, restaurants]);

  const editing = !!existing;
  const titleFor =
    type === "recipe" ? (editing ? "Edit Recipe" : "Add Recipe")
    : type === "drink" ? (editing ? "Edit Drink" : "Add Drink")
    : (editing ? "Edit Restaurant Visit" : "Add Restaurant Visit");

  return (
    <AppShell title={titleFor}>
      <div className="mb-4">
        <Link to=".." className="inline-flex items-center gap-1.5 text-sm text-bone-dim hover:text-bone"><ArrowLeft className="h-4 w-4" /> Back</Link>
      </div>

      {!editing && (
        <div className="mb-5 flex gap-1 rounded-md border border-bone/15 bg-graphite p-1">
          {(["recipe", "drink", "restaurant"] as const).map((t) => (
            <Link key={t} to="/new" search={{ type: t }} replace
              className={`flex-1 rounded py-2 text-center text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${type === t ? "bg-saffron text-noir" : "text-bone-dim"}`}>
              {t === "recipe" ? "Recipe" : t === "drink" ? "Drink" : "Restaurant"}
            </Link>
          ))}
        </div>
      )}

      {type === "recipe" && <RecipeForm existing={existing as any} onDone={(id) => navigate({ to: "/cookbook/$id", params: { id } })} />}
      {type === "drink" && <DrinkForm existing={existing as any} onDone={(id) => navigate({ to: "/drinks/$id", params: { id } })} />}
      {type === "restaurant" && <RestaurantForm existing={existing as any} onDone={(id) => navigate({ to: "/out/$id", params: { id } })} />}
    </AppShell>
  );
}

// ---------- Recipe ----------
function RecipeForm({ existing, onDone }: { existing?: any; onDone: (id: string) => void }) {
  const [name, setName] = useState(existing?.name ?? "");
  const [photo, setPhoto] = useState<string | undefined>(existing?.photo);
  const [ingredients, setIngredients] = useState<string>(existing?.ingredients?.join("\n") ?? "");
  const [instructions, setInstructions] = useState<string>(existing?.instructions?.join("\n") ?? "");
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [nextTimeNotes, setNextTimeNotes] = useState(existing?.nextTimeNotes ?? "");
  const [calories, setCalories] = useState<string>(existing?.calories?.toString() ?? "");
  const [protein, setProtein] = useState<string>(existing?.protein?.toString() ?? "");
  const [difficulty, setDifficulty] = useState<Difficulty | "">(existing?.difficulty ?? "");
  const [portion, setPortion] = useState<Portion | "">(existing?.portion ?? "");
  const [cuisine, setCuisine] = useState(existing?.cuisine ?? "");
  const [tagText, setTagText] = useState(((existing?.tags ?? []) as string[]).join(", "));
  const [chase, setChase] = useState<number | undefined>(existing?.chaseRating);
  const [chloe, setChloe] = useState<number | undefined>(existing?.chloeRating);
  const [timesMade, setTimesMade] = useState<number>(existing?.timesMade ?? 0);
  const [lastMade, setLastMade] = useState<string>(
    existing?.lastMade ? new Date(existing.lastMade).toISOString().slice(0, 10) : ""
  );
  const [wouldMakeAgain, setWouldMakeAgain] = useState<boolean>(!!existing?.wouldMakeAgain);

  function autofill(text: string) {
    const p = parseNotes(text);
    const out = applyAutofill({
      ingredients: ingredients ? ingredients.split("\n").filter(Boolean) : [],
      instructions: instructions ? instructions.split("\n").filter(Boolean) : [],
      calories: calories ? Number(calories) : undefined,
      protein: protein ? Number(protein) : undefined,
      difficulty: difficulty || undefined,
      portion: portion || undefined,
      cuisine: cuisine || undefined,
      tags: tagText ? tagText.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
    }, p);
    if (out.ingredients) setIngredients(out.ingredients.join("\n"));
    if (out.instructions) setInstructions(out.instructions.join("\n"));
    if (out.calories != null) setCalories(String(out.calories));
    if (out.protein != null) setProtein(String(out.protein));
    if (out.difficulty) setDifficulty(out.difficulty);
    if (out.portion) setPortion(out.portion);
    if (out.cuisine) setCuisine(out.cuisine);
    if (out.tags?.length) setTagText(out.tags.join(", "));
    if (!notes) setNotes(text);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const tags = tagText.split(",").map((t: string) => t.trim()).filter(Boolean);
    const ings = ingredients.split("\n").map((s) => s.trim()).filter(Boolean);
    const ins = instructions.split("\n").map((s) => s.trim()).filter(Boolean);
    const needsReview = ings.length === 0 || ins.length === 0;
    const payload = {
      name: name.trim(), photo, ingredients: ings, instructions: ins, notes, nextTimeNotes,
      calories: calories ? Number(calories) : undefined,
      protein: protein ? Number(protein) : undefined,
      difficulty: (difficulty || undefined) as Difficulty | undefined,
      portion: (portion || undefined) as Portion | undefined,
      cuisine: cuisine || undefined, tags,
      chaseRating: chase, chloeRating: chloe,
      timesMade,
      lastMade: lastMade ? new Date(lastMade).getTime() : undefined,
      wouldMakeAgain,
      needsReview,
    };
    if (existing) { updateRecipe(existing.id, payload); onDone(existing.id); }
    else { const r = addRecipe(payload as any); onDone(r.id); }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <PhotoField value={photo} onChange={setPhoto} kind="recipe" />
      <AutofillBox onFill={autofill} />

      <Field label="Name"><TextInput value={name} onChange={(e) => setName(e.target.value)} required placeholder="Garlicky Lemon Chicken" /></Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Calories per serving"><TextInput inputMode="numeric" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="520" /></Field>
        <Field label="Protein per serving (g)"><TextInput inputMode="numeric" value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="42" /></Field>
      </div>

      <Field label="Difficulty">
        <div className="flex gap-2">
          {(["easy", "medium", "hard"] as const).map((d) => (
            <Pill key={d} on={difficulty === d} onClick={() => setDifficulty(difficulty === d ? "" : d)}>{d}</Pill>
          ))}
        </div>
      </Field>

      <Field label="Portion size">
        <div className="flex gap-2">
          {(["light", "normal", "filling"] as const).map((p) => (
            <Pill key={p} on={portion === p} onClick={() => setPortion(portion === p ? "" : p)}>{p}</Pill>
          ))}
        </div>
      </Field>

      <Field label="Cuisine"><TextInput value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="Italian" /></Field>

      <Field label="Tags" hint="Comma-separated. Use 'spicy' or 'seafood' to surface warnings.">
        <TextInput value={tagText} onChange={(e) => setTagText(e.target.value)} placeholder="weeknight, chicken, gluten free" />
        {tagText.trim() && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tagText.split(",").map((t: string) => t.trim()).filter(Boolean).map((t: string) => <TagChip key={t} tag={t} />)}
          </div>
        )}
      </Field>

      <div className="space-y-3 rounded-md border border-bone/10 bg-graphite p-4">
        <RatingDial label="Chase rating" value={chase} onChange={setChase} />
        <RatingDial label="Chloe rating" value={chloe} onChange={setChloe} />
        <HouseholdReadout r={{ chaseRating: chase, chloeRating: chloe }} />
      </div>

      <Field label="Ingredients" hint="One per line">
        <TextArea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="2 tbsp olive oil&#10;4 garlic cloves" />
      </Field>

      <Field label="Instructions" hint="One step per line">
        <TextArea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Sear thighs.&#10;Add garlic." />
      </Field>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Times made">
          <Stepper value={timesMade} onChange={setTimesMade} />
        </Field>
        <Field label="Last made">
          <TextInput type="date" value={lastMade} onChange={(e) => setLastMade(e.target.value)} />
        </Field>
      </div>

      <Field label="Would make again">
        <Pill on={wouldMakeAgain} onClick={() => setWouldMakeAgain(!wouldMakeAgain)}>
          {wouldMakeAgain ? "★ Yes, again" : "Mark would make again"}
        </Pill>
      </Field>

      <Field label="What should we change next time?">
        <TextArea value={nextTimeNotes} onChange={(e) => setNextTimeNotes(e.target.value)} placeholder="More garlic. Less salt. Try sourdough crumbs." />
      </Field>

      <Field label="Notes"><TextArea value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>

      <SaveButton />
    </form>
  );
}

// ---------- Drink ----------
function DrinkForm({ existing, onDone }: { existing?: any; onDone: (id: string) => void }) {
  const [kind, setKind] = useState<DrinkKind>(existing?.drinkKind ?? "espresso");
  const [name, setName] = useState(existing?.name ?? "");
  const [photo, setPhoto] = useState<string | undefined>(existing?.photo);
  const [tasteNotes, setTasteNotes] = useState(existing?.tasteNotes ?? "");
  const [tagText, setTagText] = useState(((existing?.tags ?? []) as string[]).join(", "));
  const [chase, setChase] = useState<number | undefined>(existing?.chaseRating);
  const [chloe, setChloe] = useState<number | undefined>(existing?.chloeRating);
  // espresso
  const [bean, setBean] = useState(existing?.espresso?.bean ?? "");
  const [dose, setDose] = useState<string>(existing?.espresso?.doseG?.toString() ?? "");
  const [yieldG, setYieldG] = useState<string>(existing?.espresso?.yieldG?.toString() ?? "");
  const [brewTime, setBrewTime] = useState<string>(existing?.espresso?.brewTimeSec?.toString() ?? "");
  const [grind, setGrind] = useState(existing?.espresso?.grindSetting ?? "");
  const [milk, setMilk] = useState(existing?.espresso?.milk ?? "");
  // ingredients/instructions
  const [ingredients, setIngredients] = useState<string>(existing?.ingredients?.join("\n") ?? "");
  const [instructions, setInstructions] = useState<string>(existing?.instructions?.join("\n") ?? "");

  function autofill(text: string) {
    const p = parseNotes(text);
    const out = applyAutofill({
      ingredients: ingredients ? ingredients.split("\n").filter(Boolean) : [],
      instructions: instructions ? instructions.split("\n").filter(Boolean) : [],
      tags: tagText ? tagText.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
    }, p);
    if (out.ingredients) setIngredients(out.ingredients.join("\n"));
    if (out.instructions) setInstructions(out.instructions.join("\n"));
    if (out.tags?.length) setTagText(out.tags.join(", "));
    if (!tasteNotes) setTasteNotes(text);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const tags = tagText.split(",").map((t: string) => t.trim()).filter(Boolean);
    const payload: any = {
      drinkKind: kind, name: name.trim(), photo, tasteNotes, tags,
      chaseRating: chase, chloeRating: chloe,
      ingredients: ingredients.split("\n").map((s) => s.trim()).filter(Boolean),
      instructions: instructions.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    if (kind === "espresso") {
      payload.espresso = {
        bean: bean || undefined,
        doseG: dose ? Number(dose) : undefined,
        yieldG: yieldG ? Number(yieldG) : undefined,
        brewTimeSec: brewTime ? Number(brewTime) : undefined,
        grindSetting: grind || undefined,
        milk: milk || undefined,
      };
    }
    if (existing) { updateDrink(existing.id, payload); onDone(existing.id); }
    else { const d = addDrink(payload); onDone(d.id); }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <PhotoField value={photo} onChange={setPhoto} kind={kind === "espresso" ? "espresso" : "drink"} />
      <AutofillBox onFill={autofill} />

      <Field label="Drink category">
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(Object.keys(drinkKindLabel) as DrinkKind[]).map((k) => (
            <Pill key={k} on={kind === k} onClick={() => setKind(k)}>{drinkKindLabel[k]}</Pill>
          ))}
        </div>
      </Field>

      <Field label="Name"><TextInput value={name} onChange={(e) => setName(e.target.value)} required placeholder={kind === "espresso" ? "Morning Cortado" : "Mezcal Paloma"} /></Field>

      {kind === "espresso" && (
        <div className="space-y-3 rounded-md border border-bone/10 bg-graphite p-4">
          <Label>Espresso dial-in</Label>
          <Field label="Bean"><TextInput value={bean} onChange={(e) => setBean(e.target.value)} placeholder="Onyx Monarch" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Dose (g)"><TextInput inputMode="decimal" value={dose} onChange={(e) => setDose(e.target.value)} placeholder="18" /></Field>
            <Field label="Yield (g)"><TextInput inputMode="decimal" value={yieldG} onChange={(e) => setYieldG(e.target.value)} placeholder="36" /></Field>
            <Field label="Brew time (s)"><TextInput inputMode="decimal" value={brewTime} onChange={(e) => setBrewTime(e.target.value)} placeholder="28" /></Field>
            <Field label="Grind setting"><TextInput value={grind} onChange={(e) => setGrind(e.target.value)} placeholder="3.2" /></Field>
          </div>
          <Field label="Milk"><TextInput value={milk} onChange={(e) => setMilk(e.target.value)} placeholder="Whole" /></Field>
        </div>
      )}

      <Field label="Ingredients" hint="One per line">
        <TextArea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="2 oz mezcal&#10;0.75 oz lime" />
      </Field>
      <Field label="Instructions">
        <TextArea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Build over ice." />
      </Field>

      <Field label={kind === "espresso" ? "Taste notes" : "Notes"}>
        <TextArea value={tasteNotes} onChange={(e) => setTasteNotes(e.target.value)} placeholder="Smoky, bright, low acid…" />
      </Field>

      <Field label="Tags" hint="‘alcohol’ tags drinks with booze.">
        <TextInput value={tagText} onChange={(e) => setTagText(e.target.value)} placeholder="alcohol, summer" />
      </Field>

      <div className="space-y-3 rounded-md border border-bone/10 bg-graphite p-4">
        <RatingDial label="Chase rating" value={chase} onChange={setChase} />
        <RatingDial label="Chloe rating" value={chloe} onChange={setChloe} />
        <HouseholdReadout r={{ chaseRating: chase, chloeRating: chloe }} />
      </div>

      <SaveButton />
    </form>
  );
}

// ---------- Restaurant ----------
interface DraftItem { name: string; notes: string; chaseRating?: number; chloeRating?: number; wouldOrderAgain: boolean }

function RestaurantForm({ existing, onDone }: { existing?: any; onDone: (id: string) => void }) {
  const [name, setName] = useState(existing?.name ?? "");
  const [location, setLocation] = useState(existing?.location ?? "");
  const [photo, setPhoto] = useState<string | undefined>(existing?.photo);
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [tagText, setTagText] = useState(((existing?.tags ?? []) as string[]).join(", "));
  const [chase, setChase] = useState<number | undefined>(existing?.chaseRating);
  const [chloe, setChloe] = useState<number | undefined>(existing?.chloeRating);
  const [wouldReturn, setWouldReturn] = useState<boolean>(!!existing?.wouldReturn);
  const [dishes, setDishes] = useState<DraftItem[]>([]);
  const [drinkItems, setDrinkItems] = useState<DraftItem[]>([]);

  function autofill(text: string) {
    if (!notes) setNotes(text);
    const p = parseNotes(text);
    const out = applyAutofill({
      tags: tagText ? tagText.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
    }, { tags: p.tags });
    if (out.tags?.length) setTagText(out.tags.join(", "));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const tags = tagText.split(",").map((t: string) => t.trim()).filter(Boolean);
    const payload = { name: name.trim(), location, photo, notes, tags, chaseRating: chase, chloeRating: chloe, wouldReturn };
    if (existing) {
      updateRestaurant(existing.id, payload);
      onDone(existing.id);
    } else {
      const r = addRestaurant(payload as any);
      dishes.filter((d) => d.name.trim()).forEach((d) => addRestaurantItem(r.id, "dishes", {
        name: d.name.trim(), notes: d.notes || undefined, chaseRating: d.chaseRating, chloeRating: d.chloeRating, wouldOrderAgain: d.wouldOrderAgain,
      }));
      drinkItems.filter((d) => d.name.trim()).forEach((d) => addRestaurantItem(r.id, "drinks", {
        name: d.name.trim(), notes: d.notes || undefined, chaseRating: d.chaseRating, chloeRating: d.chloeRating, wouldOrderAgain: d.wouldOrderAgain,
      }));
      onDone(r.id);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <PhotoField value={photo} onChange={setPhoto} kind="restaurant" />
      <AutofillBox onFill={autofill} />

      <Field label="Restaurant name"><TextInput value={name} onChange={(e) => setName(e.target.value)} required placeholder="Carbone" /></Field>
      <Field label="Location"><TextInput value={location} onChange={(e) => setLocation(e.target.value)} placeholder="New York, NY" /></Field>

      <div className="space-y-3 rounded-md border border-bone/10 bg-graphite p-4">
        <RatingDial label="Chase rating" value={chase} onChange={setChase} />
        <RatingDial label="Chloe rating" value={chloe} onChange={setChloe} />
        <HouseholdReadout r={{ chaseRating: chase, chloeRating: chloe }} />
      </div>

      <Field label="Overall notes">
        <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Vibe, service, who to bring back…" />
      </Field>

      <Field label="Would return">
        <Pill on={wouldReturn} onClick={() => setWouldReturn(!wouldReturn)}>
          {wouldReturn ? "★ Yes, we'd return" : "Mark would return"}
        </Pill>
      </Field>

      <Field label="Tags"><TextInput value={tagText} onChange={(e) => setTagText(e.target.value)} placeholder="italian, date night" /></Field>

      {!existing && (
        <>
          <DraftItemList title="Food ordered" addLabel="Add dish" items={dishes} setItems={setDishes} />
          <DraftItemList title="Drinks ordered" addLabel="Add drink" items={drinkItems} setItems={setDrinkItems} />
        </>
      )}

      {existing && (
        <p className="text-xs text-bone-dim/70">Add or edit dishes and drinks on the restaurant detail page.</p>
      )}

      <SaveButton />
    </form>
  );
}

function DraftItemList({
  title, addLabel, items, setItems,
}: { title: string; addLabel: string; items: DraftItem[]; setItems: (next: DraftItem[]) => void }) {
  return (
    <div className="space-y-3 rounded-md border border-bone/10 bg-graphite p-4">
      <div className="flex items-center justify-between">
        <Label>{title}</Label>
        <button
          type="button"
          onClick={() => setItems([...items, { name: "", notes: "", wouldOrderAgain: false }])}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-saffron px-3 text-xs font-semibold text-noir"
        >
          <Plus className="h-3.5 w-3.5" /> {addLabel}
        </button>
      </div>
      {items.length === 0 && (
        <p className="text-xs text-bone-dim/70">No {title.toLowerCase()} yet.</p>
      )}
      {items.map((it, idx) => (
        <div key={idx} className="space-y-2 rounded-md border border-bone/10 bg-noir/40 p-3">
          <div className="flex items-center gap-2">
            <TextInput
              value={it.name}
              onChange={(e) => {
                const next = [...items]; next[idx] = { ...it, name: e.target.value }; setItems(next);
              }}
              placeholder="Name"
            />
            <button
              type="button"
              onClick={() => setItems(items.filter((_, i) => i !== idx))}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate text-bone-dim hover:text-oxblood"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <TextArea
            value={it.notes}
            onChange={(e) => {
              const next = [...items]; next[idx] = { ...it, notes: e.target.value }; setItems(next);
            }}
            placeholder="Notes"
          />
          <div className="grid grid-cols-2 gap-3">
            <RatingDial label="Chase" value={it.chaseRating} onChange={(v) => {
              const next = [...items]; next[idx] = { ...it, chaseRating: v }; setItems(next);
            }} />
            <RatingDial label="Chloe" value={it.chloeRating} onChange={(v) => {
              const next = [...items]; next[idx] = { ...it, chloeRating: v }; setItems(next);
            }} />
          </div>
          <Pill on={it.wouldOrderAgain} onClick={() => {
            const next = [...items]; next[idx] = { ...it, wouldOrderAgain: !it.wouldOrderAgain }; setItems(next);
          }}>
            {it.wouldOrderAgain ? "★ Would order again" : "Mark would order again"}
          </Pill>
        </div>
      ))}
    </div>
  );
}

function SaveButton() {
  return (
    <div className="sticky bottom-24 z-30 -mx-5 border-t border-bone/15 bg-noir/95 px-5 py-3 backdrop-blur">
      <button type="submit" className="h-12 w-full rounded-md bg-saffron text-base font-bold uppercase tracking-[0.14em] text-noir hover:opacity-90 transition-opacity">
        Save
      </button>
    </div>
  );
}
