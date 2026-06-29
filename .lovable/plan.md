
# Household Food Library — Ground-up Redesign

A complete rebuild as a warm, mobile-first "personal cookbook" for Chloe & Chase. New visual identity, new data model, new navigation. Nothing from the current card/chip layout carries over.

## Visual identity

- **Palette**: warm paper cream `#F7F1E6` background, deep espresso `#2A1F18` ink, burnt sienna `#B2532A` accent, olive `#6B7A3A` secondary, muted blush `#E8C9B0` surface. Light + dark mode tokens in `src/styles.css`.
- **Type**: "Fraunces" (serif, optical-size) for titles and section labels, "Inter" body. Numerals tabular for ratings/macros.
- **Texture**: subtle paper grain on backgrounds, hairline rules instead of heavy borders, generous spacing (24–32px section gutters), soft 20px radii, no shadows on cards — depth from color layering.
- **Motion**: page transitions fade+rise 8px, rating dial uses spring, "+ Times Made" pulses; restrained, never bouncy.

## Navigation (bottom tab bar, 5 tabs)

`Library · Cookbook · Drink Lab · Going Out · Favorites`

Center tab is a serif wordmark of the current section, not an icon. Add a floating "＋" composer that opens a context-aware Add sheet based on the active tab. The current FAB-in-nav pattern is removed.

## Data model rewrite (`src/lib/library-store.ts`)

New types — old `LibraryItem` union is replaced:

- `Recipe` (cookbook): name, photo?, ingredients[], instructions[], notes, nextTimeNotes, calories, protein, difficulty (easy/medium/hard), portion (light/normal/filling), cuisine, tags[], chaseRating?, chloeRating?, timesMade, lastMade?, wouldMakeAgain, needsReview, createdAt.
- `Drink` (drink lab): kind (espresso/coffee/cocktail/mocktail/beer/wine), name, photo?, ingredients?, instructions?, tasteNotes, espresso?: {bean, doseG, yieldG, brewTimeSec, grindSetting, milk}, tags[], ratings, needsReview.
- `Restaurant` (going out): name, location, photo?, notes, tags[], chaseRating?, chloeRating?, dishes: RestaurantItem[], drinks: RestaurantItem[].
- `RestaurantItem`: name, notes, chaseRating?, chloeRating?, wouldOrderAgain.

Computed helpers: `householdRating(chase?, chloe?)` averages both, or returns the single rating, or undefined. `warningsFor(tags)` returns `["Chase may not enjoy this", ...]` from a built-in dislike map: Chase→seafood, Chloe→spicy. Users never edit warnings.

A one-time migration drops old localStorage and seeds 3 recipes, 2 drinks (one espresso), 2 restaurants with nested items.

## Pages

### Library (`/`)
- Hero strip: greeting + "What did we make this week?" with a one-line stat (times cooked, new finds).
- **Unified search** with substring match across title, tags, notes, difficulty, cuisine, ingredients, instructions, restaurant names, dish/drink names. Searching "easy" surfaces easy recipes; "chicken" matches ingredient lines; "carbone" returns the restaurant.
- Filter sheet (replaces chip row): segmented "Show" (All/Cookbook/Drink Lab/Going Out), tag multi-select chips, rating min (any/3+/4+/5), sort dropdown (Household / Chase / Chloe / Lowest cal / Highest protein / Easiest / Most made / Newest / A–Z).
- Results are sectioned by type with serif dividers, not a uniform grid.

### Cookbook (`/cookbook`)
- Card stack: photo (or generated culinary illustration placeholder), name in Fraunces, macro row (cal · protein · difficulty · portion), tag pills, dual mini ratings (C/C) + household average.
- Recipe detail (`/cookbook/$id`): hero photo or illustration, ingredients checklist, numbered instructions, Notes, "Next time…" textarea, **Times Made stepper (− value +)** that auto-stamps Last Made, Would Make Again toggle, tag editor, ratings dials.

### Drink Lab (`/drinks`)
- Tabs across the top: Espresso · Coffee · Cocktails · Mocktails · Beer · Wine.
- Espresso card shows a "dial-in" strip: dose → yield → time → grind, with bean + milk underneath.
- Detail (`/drinks/$id`) renders kind-specific fields; espresso gets the parameters block, cocktails get ingredients + instructions, beer/wine get tasting notes only.

### Going Out (`/out`)
- List of **restaurants** (not dishes). Card: name, location, household rating, top tag, dish count.
- Restaurant detail (`/out/$id`): header with overall + Chase + Chloe ratings, notes, photos. Two tabbed sections: **Food** and **Drinks**, each listing items with their own rating + Would Order Again toggle. Add-item inline.
- A Library search hit on a dish/drink links to its restaurant with the item highlighted (`?focus=<itemId>` consumed by the detail page).

### Favorites (`/favorites`)
- Aggregates anything with household rating ≥ 4.5 OR `wouldMakeAgain`/`wouldOrderAgain`. Grouped by section, same card components reused.

### Add / Edit (`/add`, `/cookbook/$id/edit`, etc.)
- Type-aware form. Top of every form: **"Auto-fill from notes"** textarea + button. Implements a structured parser locally now (regex + keyword extraction for ingredients lines, time/temp, ratings, tag detection) and is wired to call an AI server function later — only fills empty fields, never overwrites. Adds `needsReview: true` when AI-filled.
- Required-field check on save; missing → `needsReview: true` and a soft banner on the detail page.

## Shared components

- `RatingDial` — 0.0–5.0 in 0.5 steps, dual (Chase + Chloe) with auto household readout.
- `TagChip` — selectable, warning-aware (renders sienna outline when matching a dislike).
- `WarningNote` — friendly inline note, never blocking.
- `Stepper` — used by Times Made.
- `EmptyArt` — SVG line illustration (whisk, demitasse, fork-and-knife) used when no photo.
- `ReviewBadge` — small "Needs review" pill.

## Technical notes

- Pure frontend; persistence stays in `localStorage` under a new key `cookbook-v1`.
- Routes added: `/cookbook`, `/cookbook/$id`, `/drinks`, `/drinks/$id`, `/out`, `/out/$id`. `/favorites` rewritten. `/meal-prep` removed.
- Search/filter logic lives in `src/lib/search.ts` with a single `searchAll(query, filters)` returning typed hits.
- All color/typography tokens defined in `src/styles.css` `@theme`; no hard-coded hex in components.
- Fraunces + Inter loaded via `<link>` in `__root.tsx`.
- AI auto-fill is a placeholder hook (`useAutofillFromNotes`) with a TODO marker so we can later swap to a `createServerFn` against Lovable AI without UI changes.

## Out of scope (per brief)

Grocery lists, meal planning, real AI calls, photo upload backend, account/auth.

Ship as one cohesive redesign — old routes/components removed in the same pass so nothing stale remains.
