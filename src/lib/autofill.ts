// Placeholder auto-fill parser. Only fills empty fields. AI-ready (swap with a server fn later).
import type { Difficulty, Portion } from "./store";

export interface ParsedRecipe {
  ingredients?: string[];
  instructions?: string[];
  calories?: number;
  protein?: number;
  difficulty?: Difficulty;
  portion?: Portion;
  cuisine?: string;
  tags?: string[];
}

const TAG_HINTS = ["spicy", "vegetarian", "vegan", "seafood", "gluten free", "alcohol", "quick", "meal prep"];

export function parseNotes(notes: string): ParsedRecipe {
  const out: ParsedRecipe = {};
  if (!notes.trim()) return out;
  const lines = notes.split(/\n+/).map((l) => l.trim()).filter(Boolean);

  // Calories / protein
  const cal = notes.match(/(\d{2,4})\s*(?:kcal|cal|calories)/i);
  if (cal) out.calories = Number(cal[1]);
  const pro = notes.match(/(\d{1,3})\s*g?\s*(?:protein|prot)/i);
  if (pro) out.protein = Number(pro[1]);

  // Difficulty
  if (/\b(easy|simple|quick)\b/i.test(notes)) out.difficulty = "easy";
  else if (/\b(hard|advanced|complex)\b/i.test(notes)) out.difficulty = "hard";
  else if (/\b(medium|moderate)\b/i.test(notes)) out.difficulty = "medium";

  // Portion
  if (/\b(light|snack)\b/i.test(notes)) out.portion = "light";
  else if (/\b(filling|hearty|big)\b/i.test(notes)) out.portion = "filling";

  // Tags
  const tags = TAG_HINTS.filter((t) => new RegExp(`\\b${t}\\b`, "i").test(notes));
  if (tags.length) out.tags = tags;

  // Ingredients vs instructions
  const ing: string[] = [];
  const ins: string[] = [];
  let mode: "ing" | "ins" | null = null;
  for (const l of lines) {
    if (/^(ingredients?)[:\-]?$/i.test(l)) { mode = "ing"; continue; }
    if (/^(instructions?|steps?|method|directions?)[:\-]?$/i.test(l)) { mode = "ins"; continue; }
    if (mode === "ing") ing.push(l.replace(/^[-*•\d.\s]+/, ""));
    else if (mode === "ins") ins.push(l.replace(/^[-*•\d.\s]+/, ""));
    else if (/^[-*•]/.test(l) || /^\d+\s*(g|oz|tbsp|tsp|cup|cups|lb)\b/i.test(l)) ing.push(l.replace(/^[-*•\d.\s]+/, ""));
  }
  if (ing.length) out.ingredients = ing;
  if (ins.length) out.instructions = ins;

  return out;
}

// Fill only blank fields
export function applyAutofill<T extends Record<string, any>>(target: T, parsed: Partial<T>): T {
  const out: any = { ...target };
  for (const k of Object.keys(parsed)) {
    const cur = out[k];
    const next = (parsed as any)[k];
    const isEmpty = cur == null || cur === "" || (Array.isArray(cur) && cur.length === 0);
    if (isEmpty && next != null) out[k] = next;
  }
  return out;
}
