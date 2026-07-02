/**
 * AI service — Anthropic integration.
 *
 * Architecture:
 *   callAI  — a TanStack Start server function; runs on the server only.
 *             The Anthropic API key and SDK never reach the client bundle.
 *   generate*Draft — thin public wrappers that call callAI with the right type.
 *             These are the only symbols imported by UI code.
 *
 * To swap providers: change only the `callAI` handler body.
 * The three public functions and all draft types are stable interfaces.
 */

import { createServerFn } from "@tanstack/react-start";
import type { Difficulty, DrinkKind, EspressoFields, Portion } from "./store";

// ── Draft types (stable interface — do not change shape) ──────────────────────

export interface RecipeDraft {
  name?: string;
  ingredients?: string[];
  instructions?: string[];
  notes?: string;
  calories?: number;
  protein?: number;
  difficulty?: Difficulty;
  portion?: Portion;
  cuisine?: string;
  tags?: string[];
}

export interface DrinkDraft {
  name?: string;
  drinkKind?: DrinkKind;
  tasteNotes?: string;
  ingredients?: string[];
  instructions?: string[];
  tags?: string[];
  espresso?: Partial<EspressoFields>;
}

export interface RestaurantDraft {
  name?: string;
  city?: string;
  state?: string;
  country?: string;
  notes?: string;
  tags?: string[];
}

// ── System prompts ─────────────────────────────────────────────────────────────

const RECIPE_SYSTEM_PROMPT = `\
You extract recipe data from user-provided text and return ONLY a JSON object.

Return this exact shape (omit any key you cannot determine — do not use null):
{
  "name": string,
  "ingredients": string[],
  "instructions": string[],
  "notes": string,
  "calories": number,
  "protein": number,
  "difficulty": "easy" | "medium" | "hard",
  "portion": "light" | "normal" | "filling",
  "cuisine": string,
  "tags": string[]
}

Field rules:
- ingredients: one item per element, strip leading bullets/numbers
- instructions: one step per element, strip leading bullets/numbers
- difficulty: "easy" for simple/quick recipes, "hard" for complex/multi-step, "medium" otherwise
- portion: "light" for snacks/small plates, "filling" for hearty/large portions, "normal" otherwise
- cuisine: e.g. "Italian", "Thai", "Mexican", "Japanese"
- tags: only from this set — spicy, vegetarian, vegan, seafood, gluten free, dairy free, quick, meal prep, alcohol

Output only the JSON object. No explanation, no markdown fences, no other text.`;

const DRINK_SYSTEM_PROMPT = `\
You extract drink recipe data from user-provided text and return ONLY a JSON object.

Return this exact shape (omit any key you cannot determine — do not use null):
{
  "name": string,
  "drinkKind": "espresso" | "coffee" | "cocktail" | "mocktail" | "beer" | "wine",
  "tasteNotes": string,
  "ingredients": string[],
  "instructions": string[],
  "tags": string[],
  "espresso": {
    "bean": string,
    "doseG": number,
    "yieldG": number,
    "brewTimeSec": number,
    "grindSetting": string,
    "milk": string
  }
}

Field rules:
- drinkKind: "espresso" for all espresso-based drinks (latte, cortado, cappuccino, etc.)
- espresso: include this sub-object ONLY when drinkKind is "espresso"
- tasteNotes: free-form tasting description
- tags: lifestyle tags, e.g. "alcohol", "quick", "dairy free"

Output only the JSON object. No explanation, no markdown fences, no other text.`;

const RESTAURANT_SYSTEM_PROMPT = `\
You extract restaurant visit data from user-provided text and return ONLY a JSON object.

Return this exact shape (omit any key you cannot determine — do not use null):
{
  "name": string,
  "city": string,
  "state": string,
  "country": string,
  "notes": string,
  "tags": string[]
}

Field rules:
- name: the restaurant name
- city: city only, e.g. "Chicago", "New York", "Munich"
- state: US state or non-US region/province, e.g. "IL", "South Carolina", "Bavaria" — omit if not applicable
- country: country name only if NOT in the United States, e.g. "Germany", "Italy", "Japan"
- notes: overall impressions — vibe, service, standout moments
- tags: cuisine type and vibe descriptors, e.g. "italian", "date night", "casual", "expensive", "spicy", "vegetarian friendly"

Output only the JSON object. No explanation, no markdown fences, no other text.`;

const SYSTEM_PROMPTS = {
  recipe: RECIPE_SYSTEM_PROMPT,
  drink: DRINK_SYSTEM_PROMPT,
  restaurant: RESTAURANT_SYSTEM_PROMPT,
} as const;

type DraftType = keyof typeof SYSTEM_PROMPTS;

// ── Server function (Anthropic API key lives here — never sent to client) ─────

const callAI = createServerFn({ method: "POST" })
  .validator((data: { text: string; type: DraftType }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        "ANTHROPIC_API_KEY is not set. Add it to .env.local and restart the dev server.",
      );
    }

    // Dynamic import keeps the SDK out of the client bundle.
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPTS[data.type],
      messages: [{ role: "user", content: data.text }],
    });

    const raw =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Strip markdown code fences if the model wraps the JSON anyway.
    const cleaned = raw.replace(/^```(?:json)?\s*|\s*```\s*$/g, "").trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI returned an unexpected format. Please try again.");
    }

    return JSON.parse(jsonMatch[0]);
  });

// ── Public API (stable — do not change signatures) ───────────────────────────

export async function generateRecipeDraft(text: string): Promise<RecipeDraft> {
  return callAI({ data: { text, type: "recipe" } });
}

export async function generateDrinkDraft(text: string): Promise<DrinkDraft> {
  return callAI({ data: { text, type: "drink" } });
}

export async function generateRestaurantDraft(
  text: string,
): Promise<RestaurantDraft> {
  return callAI({ data: { text, type: "restaurant" } });
}
