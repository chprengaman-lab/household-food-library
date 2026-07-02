import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { d as require_jsx_runtime, f as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as Plus, r as Trash2, t as X, y as ArrowLeft } from "../_libs/lucide-react.mjs";
import { B as useStore, C as addPantryItem, E as addRestaurantItem, F as updateDrink, I as updatePantryItem, L as updateRecipe, M as drinkKindLabel, R as updateRestaurant, S as addDrink, T as addRestaurant, _ as Stepper, b as TextInput, c as HouseholdReadout, d as PANTRY_CATEGORIES, f as PhotoField, l as Label, m as RatingDial, n as AppShell, p as Pill, r as AutofillBox, s as Field, v as TagChip, w as addRecipe, y as TextArea } from "./bits-Disrrj6m.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-qcKWfywR.mjs";
import { t as Route } from "./new-5-fccoUK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-By8Zwi-y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var callAI = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("936741a3d0fed38d0d10f20483bf09b8f5da5c17df8a5cfb744dcee10de09d85"));
async function generateRecipeDraft(text) {
	return callAI({ data: {
		text,
		type: "recipe"
	} });
}
async function generateDrinkDraft(text) {
	return callAI({ data: {
		text,
		type: "drink"
	} });
}
async function generateRestaurantDraft(text) {
	return callAI({ data: {
		text,
		type: "restaurant"
	} });
}
function NewItem() {
	const { type, edit } = Route.useSearch();
	const { recipes, drinks, restaurants, pantryItems } = useStore();
	const navigate = useNavigate();
	const existing = (0, import_react.useMemo)(() => {
		if (!edit) return void 0;
		return recipes.find((r) => r.id === edit) ?? drinks.find((d) => d.id === edit) ?? pantryItems.find((p) => p.id === edit) ?? restaurants.find((r) => r.id === edit);
	}, [
		edit,
		recipes,
		drinks,
		restaurants,
		pantryItems
	]);
	const editing = !!existing;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: type === "recipe" ? editing ? "Edit Recipe" : "Add Recipe" : type === "drink" ? editing ? "Edit Drink" : "Add Drink" : type === "pantry" ? editing ? "Edit Pantry Item" : "Add Pantry Item" : editing ? "Edit Restaurant Visit" : "Add Restaurant Visit",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "..",
					className: "inline-flex items-center gap-1.5 text-sm text-bone-dim hover:text-bone",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back"]
				})
			}),
			!editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 flex gap-1 rounded-md border border-bone/15 bg-graphite p-1",
				children: [
					"recipe",
					"drink",
					"restaurant",
					"pantry"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/new",
					search: { type: t },
					replace: true,
					className: `flex-1 rounded py-2 text-center text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${type === t ? "bg-saffron text-noir" : "text-bone-dim"}`,
					children: t === "recipe" ? "Recipe" : t === "drink" ? "Drink" : t === "restaurant" ? "Restaurant" : "Pantry"
				}, t))
			}),
			type === "recipe" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecipeForm, {
				existing,
				onDone: (id) => navigate({
					to: "/cookbook/$id",
					params: { id }
				})
			}),
			type === "drink" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrinkForm, {
				existing,
				onDone: (id) => navigate({
					to: "/drinks/$id",
					params: { id }
				})
			}),
			type === "restaurant" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestaurantForm, {
				existing,
				onDone: (id) => navigate({
					to: "/out/$id",
					params: { id }
				})
			}),
			type === "pantry" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PantryForm, {
				existing,
				onDone: (id) => navigate({
					to: "/pantry/$id",
					params: { id }
				})
			})
		]
	});
}
function RecipeForm({ existing, onDone }) {
	const [name, setName] = (0, import_react.useState)(existing?.name ?? "");
	const [photo, setPhoto] = (0, import_react.useState)(existing?.photo);
	const [ingredients, setIngredients] = (0, import_react.useState)(existing?.ingredients?.join("\n") ?? "");
	const [instructions, setInstructions] = (0, import_react.useState)(existing?.instructions?.join("\n") ?? "");
	const [notes, setNotes] = (0, import_react.useState)(existing?.notes ?? "");
	const [nextTimeNotes, setNextTimeNotes] = (0, import_react.useState)(existing?.nextTimeNotes ?? "");
	const [calories, setCalories] = (0, import_react.useState)(existing?.calories?.toString() ?? "");
	const [protein, setProtein] = (0, import_react.useState)(existing?.protein?.toString() ?? "");
	const [difficulty, setDifficulty] = (0, import_react.useState)(existing?.difficulty ?? "");
	const [portion, setPortion] = (0, import_react.useState)(existing?.portion ?? "");
	const [cuisine, setCuisine] = (0, import_react.useState)(existing?.cuisine ?? "");
	const [tagText, setTagText] = (0, import_react.useState)((existing?.tags ?? []).join(", "));
	const [chase, setChase] = (0, import_react.useState)(existing?.chaseRating);
	const [chloe, setChloe] = (0, import_react.useState)(existing?.chloeRating);
	const [timesMade, setTimesMade] = (0, import_react.useState)(existing?.timesMade ?? 0);
	const [lastMade, setLastMade] = (0, import_react.useState)(existing?.lastMade ? new Date(existing.lastMade).toISOString().slice(0, 10) : "");
	const [wouldMakeAgain, setWouldMakeAgain] = (0, import_react.useState)(!!existing?.wouldMakeAgain);
	const [aiGeneratedFields, setAiGeneratedFields] = (0, import_react.useState)(existing?.aiGeneratedFields ?? []);
	async function autofill(text) {
		const draft = await generateRecipeDraft(text);
		const filled = [];
		if (draft.name && !name) {
			setName(draft.name);
			filled.push("name");
		}
		if (draft.ingredients?.length && !ingredients.trim()) {
			setIngredients(draft.ingredients.join("\n"));
			filled.push("ingredients");
		}
		if (draft.instructions?.length && !instructions.trim()) {
			setInstructions(draft.instructions.join("\n"));
			filled.push("instructions");
		}
		if (draft.notes && !notes) {
			setNotes(draft.notes);
			filled.push("notes");
		}
		if (draft.calories != null && !calories) {
			setCalories(String(draft.calories));
			filled.push("calories");
		}
		if (draft.protein != null && !protein) {
			setProtein(String(draft.protein));
			filled.push("protein");
		}
		if (draft.difficulty && !difficulty) {
			setDifficulty(draft.difficulty);
			filled.push("difficulty");
		}
		if (draft.portion && !portion) {
			setPortion(draft.portion);
			filled.push("portion");
		}
		if (draft.cuisine && !cuisine) {
			setCuisine(draft.cuisine);
			filled.push("cuisine");
		}
		if (draft.tags?.length && !tagText.trim()) {
			setTagText(draft.tags.join(", "));
			filled.push("tags");
		}
		if (filled.length > 0) setAiGeneratedFields((prev) => [...new Set([...prev, ...filled])]);
	}
	function submit(e) {
		e.preventDefault();
		if (!name.trim()) return;
		const tags = tagText.split(",").map((t) => t.trim()).filter(Boolean);
		const ings = ingredients.split("\n").map((s) => s.trim()).filter(Boolean);
		const ins = instructions.split("\n").map((s) => s.trim()).filter(Boolean);
		const needsReview = ings.length === 0 || ins.length === 0;
		const payload = {
			name: name.trim(),
			photo,
			ingredients: ings,
			instructions: ins,
			notes,
			nextTimeNotes,
			calories: calories ? Number(calories) : void 0,
			protein: protein ? Number(protein) : void 0,
			difficulty: difficulty || void 0,
			portion: portion || void 0,
			cuisine: cuisine || void 0,
			tags,
			chaseRating: chase,
			chloeRating: chloe,
			timesMade,
			lastMade: lastMade ? new Date(lastMade).getTime() : void 0,
			wouldMakeAgain,
			needsReview,
			aiGeneratedFields: aiGeneratedFields.length > 0 ? aiGeneratedFields : void 0
		};
		if (existing) {
			updateRecipe(existing.id, payload);
			toast.success("Recipe updated");
			onDone(existing.id);
		} else {
			const r = addRecipe(payload);
			toast.success("Recipe saved");
			onDone(r.id);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
				value: photo,
				onChange: setPhoto,
				kind: "recipe"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutofillBox, { onFill: autofill }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					autoFocus: true,
					value: name,
					onChange: (e) => setName(e.target.value),
					required: true,
					placeholder: "Garlicky Lemon Chicken"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Calories per serving",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						inputMode: "numeric",
						value: calories,
						onChange: (e) => {
							setCalories(e.target.value);
							setAiGeneratedFields((f) => f.filter((x) => x !== "calories"));
						},
						placeholder: "520"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Protein per serving (g)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						inputMode: "numeric",
						value: protein,
						onChange: (e) => {
							setProtein(e.target.value);
							setAiGeneratedFields((f) => f.filter((x) => x !== "protein"));
						},
						placeholder: "42"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Difficulty",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: [
						"easy",
						"medium",
						"hard"
					].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						on: difficulty === d,
						onClick: () => setDifficulty(difficulty === d ? "" : d),
						children: d
					}, d))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Portion size",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: [
						"light",
						"normal",
						"filling"
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						on: portion === p,
						onClick: () => setPortion(portion === p ? "" : p),
						children: p
					}, p))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Cuisine",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: cuisine,
					onChange: (e) => setCuisine(e.target.value),
					placeholder: "Italian"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
				label: "Tags",
				hint: "Comma-separated. Use 'spicy' or 'seafood' to surface warnings.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: tagText,
					onChange: (e) => setTagText(e.target.value),
					placeholder: "weeknight, chicken, gluten free"
				}), tagText.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-1.5",
					children: tagText.split(",").map((t) => t.trim()).filter(Boolean).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagChip, { tag: t }, t))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-md border border-bone/10 bg-graphite p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chase rating",
						value: chase,
						onChange: setChase
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chloe rating",
						value: chloe,
						onChange: setChloe
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseholdReadout, { r: {
						chaseRating: chase,
						chloeRating: chloe
					} })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Ingredients",
				hint: "One per line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: ingredients,
					onChange: (e) => setIngredients(e.target.value),
					placeholder: "2 tbsp olive oil\n4 garlic cloves"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Instructions",
				hint: "One step per line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: instructions,
					onChange: (e) => setInstructions(e.target.value),
					placeholder: "Sear thighs.\nAdd garlic."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Times made",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
						value: timesMade,
						onChange: setTimesMade
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Last made",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						type: "date",
						value: lastMade,
						onChange: (e) => setLastMade(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Would make again",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					on: wouldMakeAgain,
					onClick: () => setWouldMakeAgain(!wouldMakeAgain),
					children: wouldMakeAgain ? "★ Yes, again" : "Mark would make again"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "What should we change next time?",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: nextTimeNotes,
					onChange: (e) => setNextTimeNotes(e.target.value),
					placeholder: "More garlic. Less salt. Try sourdough crumbs."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: notes,
					onChange: (e) => setNotes(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {})
		]
	});
}
function DrinkForm({ existing, onDone }) {
	const [kind, setKind] = (0, import_react.useState)(existing?.drinkKind ?? "espresso");
	const [name, setName] = (0, import_react.useState)(existing?.name ?? "");
	const [photo, setPhoto] = (0, import_react.useState)(existing?.photo);
	const [tasteNotes, setTasteNotes] = (0, import_react.useState)(existing?.tasteNotes ?? "");
	const [tagText, setTagText] = (0, import_react.useState)((existing?.tags ?? []).join(", "));
	const [chase, setChase] = (0, import_react.useState)(existing?.chaseRating);
	const [chloe, setChloe] = (0, import_react.useState)(existing?.chloeRating);
	const [bean, setBean] = (0, import_react.useState)(existing?.espresso?.bean ?? "");
	const [dose, setDose] = (0, import_react.useState)(existing?.espresso?.doseG?.toString() ?? "");
	const [yieldG, setYieldG] = (0, import_react.useState)(existing?.espresso?.yieldG?.toString() ?? "");
	const [brewTime, setBrewTime] = (0, import_react.useState)(existing?.espresso?.brewTimeSec?.toString() ?? "");
	const [grind, setGrind] = (0, import_react.useState)(existing?.espresso?.grindSetting ?? "");
	const [milk, setMilk] = (0, import_react.useState)(existing?.espresso?.milk ?? "");
	const [ingredients, setIngredients] = (0, import_react.useState)(existing?.ingredients?.join("\n") ?? "");
	const [instructions, setInstructions] = (0, import_react.useState)(existing?.instructions?.join("\n") ?? "");
	const [aiGeneratedFields, setAiGeneratedFields] = (0, import_react.useState)(existing?.aiGeneratedFields ?? []);
	async function autofill(text) {
		const draft = await generateDrinkDraft(text);
		const filled = [];
		if (draft.name && !name) {
			setName(draft.name);
			filled.push("name");
		}
		if (draft.drinkKind) {
			setKind(draft.drinkKind);
			filled.push("drinkKind");
		}
		if (draft.tasteNotes && !tasteNotes) {
			setTasteNotes(draft.tasteNotes);
			filled.push("tasteNotes");
		}
		if (draft.ingredients?.length && !ingredients.trim()) {
			setIngredients(draft.ingredients.join("\n"));
			filled.push("ingredients");
		}
		if (draft.instructions?.length && !instructions.trim()) {
			setInstructions(draft.instructions.join("\n"));
			filled.push("instructions");
		}
		if (draft.tags?.length && !tagText.trim()) {
			setTagText(draft.tags.join(", "));
			filled.push("tags");
		}
		if (draft.espresso) {
			if (draft.espresso.bean && !bean) {
				setBean(draft.espresso.bean);
				filled.push("bean");
			}
			if (draft.espresso.doseG != null && !dose) {
				setDose(String(draft.espresso.doseG));
				filled.push("doseG");
			}
			if (draft.espresso.yieldG != null && !yieldG) {
				setYieldG(String(draft.espresso.yieldG));
				filled.push("yieldG");
			}
			if (draft.espresso.brewTimeSec != null && !brewTime) {
				setBrewTime(String(draft.espresso.brewTimeSec));
				filled.push("brewTimeSec");
			}
			if (draft.espresso.grindSetting && !grind) {
				setGrind(draft.espresso.grindSetting);
				filled.push("grindSetting");
			}
			if (draft.espresso.milk && !milk) {
				setMilk(draft.espresso.milk);
				filled.push("milk");
			}
		}
		if (filled.length > 0) setAiGeneratedFields((prev) => [...new Set([...prev, ...filled])]);
	}
	function submit(e) {
		e.preventDefault();
		if (!name.trim()) return;
		const tags = tagText.split(",").map((t) => t.trim()).filter(Boolean);
		const payload = {
			drinkKind: kind,
			name: name.trim(),
			photo,
			tasteNotes,
			tags,
			chaseRating: chase,
			chloeRating: chloe,
			ingredients: ingredients.split("\n").map((s) => s.trim()).filter(Boolean),
			instructions: instructions.split("\n").map((s) => s.trim()).filter(Boolean),
			aiGeneratedFields: aiGeneratedFields.length > 0 ? aiGeneratedFields : void 0
		};
		if (kind === "espresso") payload.espresso = {
			bean: bean || void 0,
			doseG: dose ? Number(dose) : void 0,
			yieldG: yieldG ? Number(yieldG) : void 0,
			brewTimeSec: brewTime ? Number(brewTime) : void 0,
			grindSetting: grind || void 0,
			milk: milk || void 0
		};
		if (existing) {
			updateDrink(existing.id, payload);
			toast.success("Drink updated");
			onDone(existing.id);
		} else {
			const d = addDrink(payload);
			toast.success("Drink saved");
			onDone(d.id);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
				value: photo,
				onChange: setPhoto,
				kind: kind === "espresso" ? "espresso" : "drink"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutofillBox, { onFill: autofill }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Drink category",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					children: Object.keys(drinkKindLabel).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						on: kind === k,
						onClick: () => setKind(k),
						children: drinkKindLabel[k]
					}, k))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					autoFocus: true,
					value: name,
					onChange: (e) => setName(e.target.value),
					required: true,
					placeholder: kind === "espresso" ? "Morning Cortado" : "Mezcal Paloma"
				})
			}),
			kind === "espresso" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-md border border-bone/10 bg-graphite p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Espresso dial-in" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Bean",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: bean,
							onChange: (e) => setBean(e.target.value),
							placeholder: "Onyx Monarch"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Dose (g)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									inputMode: "decimal",
									value: dose,
									onChange: (e) => setDose(e.target.value),
									placeholder: "18"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Yield (g)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									inputMode: "decimal",
									value: yieldG,
									onChange: (e) => setYieldG(e.target.value),
									placeholder: "36"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Brew time (s)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									inputMode: "decimal",
									value: brewTime,
									onChange: (e) => setBrewTime(e.target.value),
									placeholder: "28"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Grind setting",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: grind,
									onChange: (e) => setGrind(e.target.value),
									placeholder: "3.2"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Milk",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: milk,
							onChange: (e) => setMilk(e.target.value),
							placeholder: "Whole"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Ingredients",
				hint: "One per line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: ingredients,
					onChange: (e) => setIngredients(e.target.value),
					placeholder: "2 oz mezcal\n0.75 oz lime"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Instructions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: instructions,
					onChange: (e) => setInstructions(e.target.value),
					placeholder: "Build over ice."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: kind === "espresso" ? "Taste notes" : "Notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: tasteNotes,
					onChange: (e) => setTasteNotes(e.target.value),
					placeholder: "Smoky, bright, low acid…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tags",
				hint: "‘alcohol’ tags drinks with booze.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: tagText,
					onChange: (e) => setTagText(e.target.value),
					placeholder: "alcohol, summer"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-md border border-bone/10 bg-graphite p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chase rating",
						value: chase,
						onChange: setChase
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chloe rating",
						value: chloe,
						onChange: setChloe
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseholdReadout, { r: {
						chaseRating: chase,
						chloeRating: chloe
					} })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {})
		]
	});
}
function RestaurantForm({ existing, onDone }) {
	const [name, setName] = (0, import_react.useState)(existing?.name ?? "");
	const [city, setCity] = (0, import_react.useState)(existing?.city ?? "");
	const [state, setState] = (0, import_react.useState)(existing?.state ?? "");
	const [country, setCountry] = (0, import_react.useState)(existing?.country ?? "");
	const [visitDate, setVisitDate] = (0, import_react.useState)(existing?.visitDate ? new Date(existing.visitDate).toISOString().slice(0, 10) : "");
	const [photo, setPhoto] = (0, import_react.useState)(existing?.photo);
	const [notes, setNotes] = (0, import_react.useState)(existing?.notes ?? "");
	const [tagText, setTagText] = (0, import_react.useState)((existing?.tags ?? []).join(", "));
	const [chase, setChase] = (0, import_react.useState)(existing?.chaseRating);
	const [chloe, setChloe] = (0, import_react.useState)(existing?.chloeRating);
	const [wouldReturn, setWouldReturn] = (0, import_react.useState)(!!existing?.wouldReturn);
	const [dishes, setDishes] = (0, import_react.useState)([]);
	const [drinkItems, setDrinkItems] = (0, import_react.useState)([]);
	async function autofill(text) {
		const draft = await generateRestaurantDraft(text);
		if (draft.name && !name) setName(draft.name);
		if (draft.city && !city) setCity(draft.city);
		if (draft.state && !state) setState(draft.state);
		if (draft.country && !country) setCountry(draft.country);
		if (draft.notes && !notes) setNotes(draft.notes);
		if (draft.tags?.length && !tagText.trim()) setTagText(draft.tags.join(", "));
	}
	function submit(e) {
		e.preventDefault();
		if (!name.trim()) return;
		const tags = tagText.split(",").map((t) => t.trim()).filter(Boolean);
		const payload = {
			name: name.trim(),
			photo,
			notes,
			tags,
			chaseRating: chase,
			chloeRating: chloe,
			wouldReturn,
			city: city.trim() || void 0,
			state: state.trim() || void 0,
			country: country.trim() || void 0,
			visitDate: visitDate ? new Date(visitDate).getTime() : void 0
		};
		if (existing) {
			updateRestaurant(existing.id, payload);
			toast.success("Restaurant updated");
			onDone(existing.id);
		} else {
			const r = addRestaurant(payload);
			dishes.filter((d) => d.name.trim()).forEach((d) => addRestaurantItem(r.id, "dishes", {
				name: d.name.trim(),
				notes: d.notes || void 0,
				chaseRating: d.chaseRating,
				chloeRating: d.chloeRating,
				wouldOrderAgain: d.wouldOrderAgain
			}));
			drinkItems.filter((d) => d.name.trim()).forEach((d) => addRestaurantItem(r.id, "drinks", {
				name: d.name.trim(),
				notes: d.notes || void 0,
				chaseRating: d.chaseRating,
				chloeRating: d.chloeRating,
				wouldOrderAgain: d.wouldOrderAgain
			}));
			toast.success("Restaurant saved");
			onDone(r.id);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
				value: photo,
				onChange: setPhoto,
				kind: "restaurant"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutofillBox, { onFill: autofill }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Restaurant name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					autoFocus: true,
					value: name,
					onChange: (e) => setName(e.target.value),
					required: true,
					placeholder: "Carbone"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "City",
				hint: "Required for search",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: city,
					onChange: (e) => setCity(e.target.value),
					placeholder: "New York"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "State / Region",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: state,
						onChange: (e) => setState(e.target.value),
						placeholder: "NY"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Country",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: country,
						onChange: (e) => setCountry(e.target.value),
						placeholder: "Leave blank if US"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Visit Date",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					type: "date",
					value: visitDate,
					onChange: (e) => setVisitDate(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-md border border-bone/10 bg-graphite p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chase rating",
						value: chase,
						onChange: setChase
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chloe rating",
						value: chloe,
						onChange: setChloe
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseholdReadout, { r: {
						chaseRating: chase,
						chloeRating: chloe
					} })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Overall notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: notes,
					onChange: (e) => setNotes(e.target.value),
					placeholder: "Vibe, service, who to bring back…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Would return",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					on: wouldReturn,
					onClick: () => setWouldReturn(!wouldReturn),
					children: wouldReturn ? "★ Yes, we'd return" : "Mark would return"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tags",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: tagText,
					onChange: (e) => setTagText(e.target.value),
					placeholder: "italian, date night"
				})
			}),
			!existing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DraftItemList, {
				title: "Food ordered",
				addLabel: "Add dish",
				items: dishes,
				setItems: setDishes
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DraftItemList, {
				title: "Drinks ordered",
				addLabel: "Add drink",
				items: drinkItems,
				setItems: setDrinkItems
			})] }),
			existing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-bone-dim/70",
				children: "Add or edit dishes and drinks on the restaurant detail page."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {})
		]
	});
}
function DraftItemList({ title, addLabel, items, setItems }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 rounded-md border border-bone/10 bg-graphite p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setItems([...items, {
						name: "",
						notes: "",
						wouldOrderAgain: false
					}]),
					className: "inline-flex h-9 items-center gap-1.5 rounded-full bg-saffron px-3 text-xs font-semibold text-noir",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }),
						" ",
						addLabel
					]
				})]
			}),
			items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-bone-dim/70",
				children: [
					"No ",
					title.toLowerCase(),
					" yet."
				]
			}),
			items.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 rounded-md border border-bone/10 bg-noir/40 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: it.name,
							onChange: (e) => {
								const next = [...items];
								next[idx] = {
									...it,
									name: e.target.value
								};
								setItems(next);
							},
							placeholder: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setItems(items.filter((_, i) => i !== idx)),
							className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate text-bone-dim hover:text-oxblood",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						value: it.notes,
						onChange: (e) => {
							const next = [...items];
							next[idx] = {
								...it,
								notes: e.target.value
							};
							setItems(next);
						},
						placeholder: "Notes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
							label: "Chase",
							value: it.chaseRating,
							onChange: (v) => {
								const next = [...items];
								next[idx] = {
									...it,
									chaseRating: v
								};
								setItems(next);
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
							label: "Chloe",
							value: it.chloeRating,
							onChange: (v) => {
								const next = [...items];
								next[idx] = {
									...it,
									chloeRating: v
								};
								setItems(next);
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						on: it.wouldOrderAgain,
						onClick: () => {
							const next = [...items];
							next[idx] = {
								...it,
								wouldOrderAgain: !it.wouldOrderAgain
							};
							setItems(next);
						},
						children: it.wouldOrderAgain ? "★ Would order again" : "Mark would order again"
					})
				]
			}, idx))
		]
	});
}
function PantryForm({ existing, onDone }) {
	const [name, setName] = (0, import_react.useState)(existing?.name ?? "");
	const [photo, setPhoto] = (0, import_react.useState)(existing?.photo);
	const [brand, setBrand] = (0, import_react.useState)(existing?.brand ?? "");
	const [stores, setStores] = (0, import_react.useState)(existing?.stores ?? []);
	const [category, setCategory] = (0, import_react.useState)(existing?.category ?? "Other");
	const [notes, setNotes] = (0, import_react.useState)(existing?.notes ?? "");
	const [tagText, setTagText] = (0, import_react.useState)((existing?.tags ?? []).join(", "));
	const [chase, setChase] = (0, import_react.useState)(existing?.chaseRating);
	const [chloe, setChloe] = (0, import_react.useState)(existing?.chloeRating);
	const [wouldBuyAgain, setWouldBuyAgain] = (0, import_react.useState)(!!existing?.wouldBuyAgain);
	function submit(e) {
		e.preventDefault();
		if (!name.trim()) return;
		const tags = tagText.split(",").map((t) => t.trim()).filter(Boolean);
		const payload = {
			name: name.trim(),
			photo,
			brand: brand.trim() || void 0,
			stores,
			category,
			notes,
			tags,
			chaseRating: chase,
			chloeRating: chloe,
			wouldBuyAgain
		};
		if (existing) {
			updatePantryItem(existing.id, payload);
			toast.success("Pantry item updated");
			onDone(existing.id);
		} else {
			const p = addPantryItem(payload);
			toast.success("Pantry item saved");
			onDone(p.id);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
				value: photo,
				onChange: setPhoto,
				kind: "pantry"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Item name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					autoFocus: true,
					value: name,
					onChange: (e) => setName(e.target.value),
					required: true,
					placeholder: "Calabrian Chili Paste"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Brand",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: brand,
					onChange: (e) => setBrand(e.target.value),
					placeholder: "Tutto Calabria"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Category",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mx-1 flex flex-wrap gap-1.5 px-1",
					children: PANTRY_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						on: category === c,
						onClick: () => setCategory(c),
						children: c
					}, c))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Available At",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreSelector, {
					value: stores,
					onChange: setStores
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tags",
				hint: "Comma-separated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: tagText,
					onChange: (e) => setTagText(e.target.value),
					placeholder: "organic, staple, dairy-free"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-md border border-bone/10 bg-graphite p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chase rating",
						value: chase,
						onChange: setChase
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDial, {
						label: "Chloe rating",
						value: chloe,
						onChange: setChloe
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseholdReadout, { r: {
						chaseRating: chase,
						chloeRating: chloe
					} })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: notes,
					onChange: (e) => setNotes(e.target.value),
					placeholder: "Why it's a household staple, when to use it…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Would buy again",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					on: wouldBuyAgain,
					onClick: () => setWouldBuyAgain(!wouldBuyAgain),
					children: wouldBuyAgain ? "★ Yes, again" : "Mark would buy again"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {})
		]
	});
}
function SaveButton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sticky bottom-24 z-30 -mx-5 border-t border-bone/15 bg-noir/95 px-5 py-3 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "submit",
			className: "h-12 w-full rounded-md bg-saffron text-base font-bold uppercase tracking-[0.14em] text-noir hover:opacity-90 transition-opacity",
			children: "Save"
		})
	});
}
var COMMON_STORES = [
	"Costco",
	"Publix",
	"Harris Teeter",
	"Trader Joe's",
	"Whole Foods",
	"Walmart",
	"Target"
];
function StoreSelector({ value, onChange }) {
	const [custom, setCustom] = (0, import_react.useState)("");
	const customStores = value.filter((s) => !COMMON_STORES.includes(s));
	function toggle(s) {
		onChange(value.includes(s) ? value.filter((x) => x !== s) : [...value, s]);
	}
	function addCustom(e) {
		e.preventDefault();
		const v = custom.trim();
		if (!v || value.includes(v)) {
			setCustom("");
			return;
		}
		onChange([...value, v]);
		setCustom("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: COMMON_STORES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					on: value.includes(s),
					onClick: () => toggle(s),
					children: s
				}, s))
			}),
			customStores.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: customStores.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full bg-saffron/10 px-2.5 py-1 text-xs text-bone",
					children: [s, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange(value.filter((x) => x !== s)),
						className: "ml-0.5 text-bone-dim hover:text-saffron",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
					})]
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: addCustom,
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: custom,
					onChange: (e) => setCustom(e.target.value),
					placeholder: "Other store…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-saffron text-noir",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
				})]
			})
		]
	});
}
//#endregion
export { NewItem as component };
