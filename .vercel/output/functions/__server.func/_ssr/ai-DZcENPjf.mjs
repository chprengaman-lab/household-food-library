import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-DZcENPjf.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
var SYSTEM_PROMPTS = {
	recipe: `\
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

Output only the JSON object. No explanation, no markdown fences, no other text.`,
	drink: `\
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

Output only the JSON object. No explanation, no markdown fences, no other text.`,
	restaurant: `\
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

Output only the JSON object. No explanation, no markdown fences, no other text.`
};
var callAI_createServerFn_handler = createServerRpc({
	id: "936741a3d0fed38d0d10f20483bf09b8f5da5c17df8a5cfb744dcee10de09d85",
	name: "callAI",
	filename: "src/lib/ai.ts"
}, (opts) => callAI.__executeServer(opts));
var callAI = createServerFn({ method: "POST" }).validator((data) => data).handler(callAI_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.ANTHROPIC_API_KEY;
	if (!apiKey) throw new Error("AI generation is not available right now. Please try again later.");
	const { default: Anthropic } = await import("../_libs/@anthropic-ai/sdk+[...].mjs").then((n) => n.t);
	const message = await new Anthropic({ apiKey }).messages.create({
		model: "claude-sonnet-4-6",
		max_tokens: 1024,
		system: SYSTEM_PROMPTS[data.type],
		messages: [{
			role: "user",
			content: data.text
		}]
	});
	const jsonMatch = (message.content[0].type === "text" ? message.content[0].text : "").replace(/^```(?:json)?\s*|\s*```\s*$/g, "").trim().match(/\{[\s\S]*\}/);
	if (!jsonMatch) throw new Error("AI returned an unexpected format. Please try again.");
	return JSON.parse(jsonMatch[0]);
});
//#endregion
export { callAI_createServerFn_handler };
