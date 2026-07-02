# Household Library

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TanStack Start](https://img.shields.io/badge/TanStack_Start-1.x-FF4154?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-deployed-F38020?style=flat-square&logo=cloudflare&logoColor=white)
![Anthropic](https://img.shields.io/badge/Anthropic_API-Claude-8B5CF6?style=flat-square)

A private household food journal — recipes, drinks, restaurant memories, and pantry essentials, all in one place. Powered by AI-assisted input and built for two.

---

## Why I Built It

My wife and I kept track of recipes in notes apps, restaurants in our camera roll, and pantry favorites in our heads. None of it was searchable or shared.

This started as a personal project to solve that — a single app where we could log everything: dishes we've cooked, drinks we've dialed in, restaurants we've visited, and pantry staples worth buying again. Along the way it became a testbed for experimenting with modern AI-assisted development using **Lovable** for rapid UI prototyping and **Claude Code** for iterative feature engineering.

---

## Features

| Feature | Description |
|---|---|
| 📖 **Cookbook** | Log recipes with ingredients, instructions, nutrition, difficulty, cuisine, and personal ratings |
| 🍸 **Drink Lab** | Track cocktails, wines, beers, and espresso dial-ins with tasting notes |
| 🍽️ **Restaurant Journal** | Record restaurant visits by city with dishes, drinks, and per-visit ratings |
| 🛒 **Pantry** | Curate household staples with store availability and reorder ratings |
| ✨ **AI Auto-fill** | Paste unstructured notes and Claude converts them into structured records |
| 🧮 **Nutrition Estimation** | Optional calorie and protein tracking per recipe, AI-estimated |
| 📸 **Photo Uploads** | Attach photos to any recipe, drink, restaurant, or pantry item |
| ⭐ **Dual Ratings** | Separate Chase and Chloe ratings averaged into a household score |
| 🔍 **Search** | Full-text search across all content including ingredients, notes, and location |
| 🏷️ **Tags & Filters** | Tag-based filtering with dietary flags (spicy, seafood, alcohol, etc.) |
| ❤️ **Favorites** | Automatic favorite badges when ratings meet household thresholds |
| 📍 **Location Search** | Search restaurants by city, state, or country |

---

## Screenshots

> _Screenshots coming soon._

| Home / Search | Cookbook | Restaurant Journal |
|---|---|---|
| ![home](docs/screenshots/home.png) | ![cookbook](docs/screenshots/cookbook.png) | ![out](docs/screenshots/out.png) |

| AI Auto-fill | Drink Lab | Pantry |
|---|---|---|
| ![ai](docs/screenshots/ai-autofill.png) | ![drinks](docs/screenshots/drinks.png) | ![pantry](docs/screenshots/pantry.png) |

---

## Tech Stack

### Frontend

| Technology | Role |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [TanStack Start](https://tanstack.com/start) | SSR meta-framework (file-based routing, server functions) |
| [TanStack Router](https://tanstack.com/router) | Type-safe client-side routing |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling with custom design tokens |
| [Radix UI](https://www.radix-ui.com/) | Accessible headless component primitives |
| [Vite 8](https://vitejs.dev/) | Build tool |
| [Zod](https://zod.dev/) | Runtime schema validation |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |

### AI & Backend

| Technology | Role |
|---|---|
| [Anthropic Claude](https://www.anthropic.com/) | AI draft generation for recipes, drinks, and restaurants |
| [TanStack Start Server Functions](https://tanstack.com/start/latest/docs/framework/react/server-functions) | Server-side API calls (API key never reaches the client bundle) |
| [Cloudflare Workers](https://workers.cloudflare.com/) | Edge deployment via Nitro |

### Development Workflow

| Tool | Role |
|---|---|
| [Lovable](https://lovable.dev/) | AI-powered UI generation for initial prototype |
| [Claude Code](https://claude.ai/code) | AI pair programmer for iterative feature development |
| [Bun](https://bun.sh/) | Package manager and runtime |

### Coming Soon

| Technology | Role |
|---|---|
| [Supabase](https://supabase.com/) | Authentication, shared household accounts, and cloud sync |

---

## Architecture

```
src/
├── components/
│   ├── AppShell.tsx        # Navigation shell and layout wrapper
│   └── bits.tsx            # Shared component library (forms, badges, dialogs)
├── lib/
│   ├── store.ts            # localStorage pub/sub store (all CRUD + migration)
│   ├── ai.ts               # AI service abstraction (server function + prompts)
│   └── search.ts           # Full-text search and sort logic
└── routes/                 # File-based routing (TanStack Router)
    ├── index.tsx           # Home dashboard with search
    ├── cookbook/           # Recipe list + detail
    ├── drinks/             # Drinks list + detail
    ├── out/                # Restaurant journal list + detail
    ├── pantry/             # Pantry list + detail
    ├── favorites.tsx       # Favorites aggregation across all sections
    └── new.tsx             # Unified add/edit form for all entity types
```

**Key architectural decisions:**

- **Local-first persistence** — all data lives in `localStorage` behind a `useSyncExternalStore` pub/sub layer. Every write instantly reflects across all components without prop-drilling or a global state library.
- **Reusable AI service** — `src/lib/ai.ts` is the single integration point for Claude. Swapping providers requires changing only one file; all form components call stable public functions (`generateRecipeDraft`, `generateDrinkDraft`, `generateRestaurantDraft`).
- **Server-function isolation** — AI calls run inside TanStack Start server functions. The Anthropic SDK and API key are stripped from the client bundle at build time and verified in the build output.
- **Modular routing** — each section is a layout route with an index child, keeping list and detail pages independently code-split.
- **Designed for cloud sync** — Supabase will replace the localStorage layer. The store interface (`addRecipe`, `updateRecipe`, etc.) is designed so UI components require zero changes when persistence moves to the cloud.

---

## AI Integration

When a user pastes unstructured notes — a recipe screenshot caption, a restaurant review, or a coffee dial-in log — Claude extracts structured data and pre-fills the form.

**How it works:**

1. The user pastes raw text into the Auto-fill box on any add/edit form
2. A TanStack Start server function sends the text to Claude with a type-specific system prompt
3. Claude returns a strict JSON object matching the entity schema
4. The form merges the draft — **blank fields only**
5. Fields the user has already filled are left untouched

**Design principles:**

- **Never overwrites user data.** Each field is guarded by a blank-check before applying the AI value.
- **Tracks provenance.** Fields populated by AI are stored with an `aiGeneratedFields` array and displayed with an "AI estimated" badge. The badge disappears when the user manually edits the value.
- **Estimates nutrition.** The recipe prompt instructs Claude to estimate calories and protein from the ingredient list — useful when cooking from scratch without a label.
- **Provider-agnostic service layer.** The `callAI` server function is the only Anthropic-specific code. Swapping to OpenAI or Gemini means editing one file; no form or component changes required.

---

## Roadmap

- [ ] **Supabase authentication** — household accounts with email/password login
- [ ] **Shared household sync** — real-time data sharing between devices
- [ ] **Cloud photo storage** — migrate base64 images to Cloudflare R2 or Supabase Storage
- [ ] **Pantry-to-recipe linking** — surface which pantry items are used in which recipes
- [ ] **OCR recipe import** — scan a physical recipe card or screenshot using Claude Vision
- [ ] **AI nutrition verification** — cross-reference estimated nutrition against USDA data
- [ ] **Mobile PWA** — installable home screen app with offline support
- [ ] **Export / backup** — full JSON export of the household library
- [ ] **Restaurant map view** — optional map integration for visited locations
- [ ] **Weekly digest** — summary of what was cooked, visited, and added

---

## Running Locally

**Prerequisites:** [Bun](https://bun.sh/) and an [Anthropic API key](https://console.anthropic.com/)

```bash
# 1. Clone the repository
git clone https://github.com/chprengaman/household-food-library.git
cd household-food-library

# 2. Install dependencies
bun install

# 3. Create environment file
cp .env.example .env.local
```

Add your Anthropic API key to `.env.local`:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

```bash
# 4. Start the development server
bun run dev
```

The app runs at `http://localhost:3000`. The AI auto-fill feature requires a valid API key; all other features work without one.

> **Security note:** AI calls are made server-side via TanStack Start server functions. The API key is never sent to the browser or included in the client bundle.

---

## What This Project Demonstrates

| Area | Detail |
|---|---|
| **Full-stack architecture** | SSR meta-framework, server functions, edge deployment on Cloudflare Workers |
| **React patterns** | Custom pub/sub store with `useSyncExternalStore`, compound components, controlled forms at scale |
| **TypeScript** | Discriminated union types for entities, Zod validation on URL search params and server function inputs |
| **AI integration** | Production-quality prompt engineering, structured JSON extraction, provider-agnostic service layer, AI provenance tracking |
| **Data modeling** | Extensible schema with localStorage migration, AI metadata fields, dual-rating system with computed household score |
| **UX design** | Dark editorial design system with custom Tailwind v4 tokens, accessible Radix UI primitives, mobile-first layout |
| **Modern dev workflow** | AI-assisted development from prototype (Lovable) through production features (Claude Code), version-controlled end-to-end |

---

## License

Private repository — personal project. Not licensed for redistribution.

---

<p align="center">Built by <strong>Chase Prengaman</strong> · <a href="mailto:chprengaman@gmail.com">chprengaman@gmail.com</a></p>
