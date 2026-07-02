# The Library — Chloe & Chase

A private, local-first household food and drink tracker. We log every recipe we cook, every drink we craft, and every restaurant we visit — rating each one together so we always know what to make next.

---

## Why This Exists

Most recipe apps are designed for discovery. This one is designed for memory. After making the same pasta three times and forgetting what adjustments we made, or returning to a restaurant and blanking on what we ordered last time, we wanted a shared source of truth that lives with us, not inside some social platform.

The goal: a single place to capture what we've made, what we loved, what to tweak, and where to go back.

---

## Current Features

### Cookbook
- Log recipes with ingredients, instructions, difficulty, cuisine, and nutritional info (calories, protein)
- Track how many times a recipe has been made and when it was last cooked
- Per-person ratings (Chase + Chloe, 0–5 in 0.5 steps) averaged into a household score
- "Would make again" flag and "Needs review" marker for dishes still being dialed in
- Optional photo support — upload images from any device, stored locally

### Drink Lab
- Separate drink kinds: espresso, coffee, cocktail, mocktail, beer, wine
- Full espresso dial-in tracking: dose (g), yield (g), brew time (sec), grind setting, milk
- Taste notes, ingredients, and instructions per drink
- Same per-person rating system as recipes

### Going Out
- Restaurant tracker with location, overall notes, would-return flag
- **Dish and drink hierarchy**: add individual dishes and drinks to any restaurant after the fact — each with its own name, notes, Chase + Chloe ratings, and "would order again" toggle
- Edit and delete dishes/drinks inline from the restaurant detail page

### Library Home
- Editorial dashboard showing recently made recipes, favorites, and latest additions
- "Continue cooking" section surfaces recipes tried once but not yet revisited
- Favorites view: everything rated 4.5+ or marked "would make again"

### Search & Filter
- Global full-text search across all content: recipe ingredients and instructions, drink notes and espresso parameters, restaurant names, and individual dish/drink names
- Searching a dish name (e.g. "mozzarella sticks") surfaces the parent restaurant
- Filter by section (recipes / drinks / restaurants), tags, and minimum rating
- Sort by: household rating, Chase rating, Chloe rating, lowest calories, highest protein, easiest difficulty, most made, newest, A–Z

### Photos
- Optional photos on recipes, drinks, and restaurants
- Canvas-based compression on upload (max 1200px, JPEG 75%) to keep localStorage footprint manageable
- Photos display as card thumbnails and full-width hero images on detail pages
- Replace or remove photos at any time

### Data
- Local-first: all data lives in `localStorage` via a custom pub/sub store
- No account required, no backend dependency

---

## Planned Features

- **Cloud sync** — Supabase backend for cross-device access and data durability
- **Photo storage** — Supabase Storage once cloud sync is in place
- **AI nutritional lookup** — estimate calories and protein from ingredient lists automatically
- **AI recipe summarization** — generate an evocative one-line description for each recipe card
- **Smart tagging** — suggest dietary and cuisine tags from ingredients and instructions
- **Meal planning** — weekly menu builder that draws from the cookbook based on ratings and recent history
- **Shopping list** — aggregate ingredients from selected recipes into a single list
- **URL import** — paste a recipe URL and auto-populate the form

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (SSR, built on TanStack Router + Nitro) |
| Routing | [TanStack Router v1](https://tanstack.com/router) — file-based, type-safe |
| UI | [React 19](https://react.dev) |
| Language | TypeScript 5 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) with `@theme inline` custom palette |
| Build | [Vite 8](https://vitejs.dev) |
| Deployment target | [Nitro](https://nitro.build) → Cloudflare Workers |
| Package manager | [Bun](https://bun.sh) |
| Schema validation | [Zod v4](https://zod.dev) + `@tanstack/zod-adapter` |
| Icons | [Lucide React](https://lucide.dev) |
| Component primitives | [Radix UI](https://www.radix-ui.com) |

---

## Local Setup

**Prerequisites:** [Bun](https://bun.sh) installed (`curl -fsSL https://bun.sh/install | bash`)

```bash
# Clone the repo
git clone <repo-url>
cd Household-food-library

# Install dependencies
bun install

# Start the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Other commands
bun run build        # Production build (Cloudflare Workers target)
bun run preview      # Preview the production build locally
bun run lint         # ESLint
bun run format       # Prettier
```

---

## Project Structure

```
src/
├── routes/
│   ├── __root.tsx          # Root layout (QueryClient provider, fonts)
│   ├── index.tsx           # Home — editorial dashboard + global search
│   ├── cookbook.tsx        # Cookbook layout route (renders <Outlet />)
│   ├── cookbook.index.tsx  # Recipe list
│   ├── cookbook.$id.tsx    # Recipe detail page
│   ├── drinks.tsx          # Drinks layout route
│   ├── drinks.index.tsx    # Drink list with kind filter tabs
│   ├── drinks.$id.tsx      # Drink detail page
│   ├── out.tsx             # Going Out layout route
│   ├── out.index.tsx       # Restaurant list
│   ├── out.$id.tsx         # Restaurant detail — dishes/drinks hierarchy
│   ├── favorites.tsx       # Favorites — 4.5+ rated items
│   └── new.tsx             # Add/edit form for all item types
├── components/
│   ├── AppShell.tsx        # Navigation and page wrapper
│   ├── bits.tsx            # Shared primitives: RatingDial, Pill, Field,
│   │                       #   PhotoField, EmptyArt, MiniRating, etc.
│   └── ui/                 # Radix UI component wrappers
├── lib/
│   ├── store.ts            # LocalStorage pub/sub state (useSyncExternalStore)
│   ├── search.ts           # Full-text search, filtering, multi-key sorting
│   └── autofill.ts         # AI auto-fill utilities
├── routeTree.gen.ts        # Auto-generated by TanStack Router plugin (do not edit)
└── styles.css              # Tailwind v4 theme + custom design tokens + utilities
```

---

## AI Feature Roadmap

The app already includes a basic auto-fill mechanism that extracts structured fields from freeform notes. The planned AI layer builds on this:

| Feature | Status | Description |
|---|---|---|
| Auto-fill from notes | Partial | Paste raw tasting notes → AI extracts name, ingredients, ratings |
| Nutritional lookup | Planned | Estimate calories/protein from ingredient list |
| Recipe description generation | Planned | One-line evocative summary for card display |
| Smart tagging | Planned | Suggest dietary/cuisine tags from recipe content |
| Meal planning assistant | Planned | Suggest a week's menu from the cookbook, weighted by rating and recency |
| Shopping list aggregation | Planned | Merge ingredients from multiple selected recipes |
| URL recipe import | Planned | Scrape and parse a recipe page into the add form |

The store and routing layer are already structured to support AI-generated fields without model changes: all AI output populates the same typed fields used by manual entry.

---

## Screenshots

> _Screenshots coming once the UI is finalized._

| Home | Recipe Detail | Restaurant — Dishes |
|---|---|---|
| _placeholder_ | _placeholder_ | _placeholder_ |

---

## What This Demonstrates

This project is representative of the kind of full-stack TypeScript work I do for side projects and production apps.

**Architecture**
- SSR with TanStack Start — the same framework stack gaining adoption for type-safe full-stack React apps, deployed to Cloudflare Workers via Nitro
- File-based nested routing using TanStack Router v1, including the layout + index pattern required for sibling routes to render correctly alongside detail routes
- Custom `useSyncExternalStore` pub/sub store — no Redux, no Zustand, just a typed module-level cache with `localStorage` persistence on every write

**Data modeling**
- Three top-level content types (`Recipe`, `Drink`, `Restaurant`) sharing a `Ratings` interface and a common `AnyItem` union — search, filtering, and sorting work uniformly across all three
- Multi-level restaurant hierarchy (`Restaurant` → `RestaurantItem[]`) with full inline CRUD from the detail page without a separate edit route

**UI engineering**
- Custom design system in Tailwind v4 using `@theme inline` for custom color tokens and `@utility` for named card styles — no component library doing the heavy lifting
- Canvas-based image compression before writing to `localStorage` — practical constraint from using browser storage as a database
- Expandable card rows with per-field onBlur persistence and auto-open state for newly created items
- Rating dials, pill toggles, segmented tab bars, collapsible add forms — all built as composable primitives in `bits.tsx`

**Search**
- Full-text match across heterogeneous content: recipe ingredient lists, espresso dial-in parameters, restaurant dish names — all indexed at query time with no external search library
- Multi-key sorting (9 sort options) with proper tiebreaking over the same item union type

**Process**
- Prototyped in [Lovable](https://lovable.dev), then extended with Claude Code — a real AI-assisted development workflow from proof-of-concept to production-quality routing, state management, and feature additions
