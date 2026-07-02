import { i as __toESM } from "../_runtime.mjs";
import { a as Overlay2, c as Title2, d as require_jsx_runtime, f as require_react, i as Description2, l as Trigger2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as CircleAlert, a as Star, d as Plus, o as Sparkles, p as Minus } from "../_libs/lucide-react.mjs";
import { h as householdRating, w as warningsFor } from "./store-XR4yUmbQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bits-CjCQ2eAY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Label({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "folio mb-1.5 block",
		children
	});
}
function Field({ label, children, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-xs text-bone-dim/80",
				children: hint
			})
		]
	});
}
function TextInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: `h-11 w-full rounded-md border border-bone/15 bg-graphite px-3 text-sm text-bone outline-none ring-saffron/40 placeholder:text-bone-dim/55 focus:ring-2 ${props.className ?? ""}`
	});
}
function TextArea(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		className: `min-h-[90px] w-full rounded-md border border-bone/15 bg-graphite p-3 text-sm text-bone outline-none ring-saffron/40 placeholder:text-bone-dim/55 focus:ring-2 ${props.className ?? ""}`
	});
}
function Pill({ on, onClick, children, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${on ? tone === "warn" ? "bg-oxblood/20 text-oxblood ring-1 ring-oxblood/50" : "bg-saffron text-noir" : "bg-slate text-bone-dim hover:text-bone"}`,
		children
	});
}
function TagChip({ tag, on, onClick }) {
	const isDislike = ["seafood", "spicy"].includes(tag.toLowerCase());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${on ? "bg-saffron text-noir" : isDislike ? "bg-graphite text-oxblood ring-1 ring-oxblood/40" : "bg-slate text-bone-dim"}`,
		children: tag
	});
}
function Stepper({ value, onChange, min = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-center gap-2 rounded-full border border-bone/15 bg-graphite p-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(Math.max(min, value - 1)),
				className: "grid h-9 w-9 place-items-center rounded-full bg-slate text-bone-dim hover:text-bone",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tnum lining min-w-[2ch] text-center font-display text-xl text-bone",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(value + 1),
				className: "grid h-9 w-9 place-items-center rounded-full bg-saffron text-noir hover:opacity-90",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
			})
		]
	});
}
function RatingDial({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1.5 flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tnum lining font-display text-xl text-saffron",
			children: value != null ? value.toFixed(1) : "—"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min: 0,
			max: 5,
			step: .5,
			value: value ?? 0,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "flex-1 accent-saffron"
		}), value != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(void 0),
			className: "folio",
			children: "Clear"
		})]
	})] });
}
function HouseholdReadout({ r }) {
	const h = householdRating(r);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-xl border border-bone/10 bg-graphite p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute right-5 top-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
					className: "h-4 w-4 fill-brass text-brass",
					strokeWidth: 0
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "folio",
				children: "Household score"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tnum lining mt-1 font-display text-[88px] font-medium leading-none text-saffron",
				children: h != null ? h.toFixed(1) : "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "brass-rule mt-5 h-px" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "folio",
					children: "Chase"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tnum lining mt-1 font-display text-3xl text-bone",
					children: r.chaseRating?.toFixed(1) ?? "—"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-l border-bone/10 pl-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "folio",
						children: "Chloe"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tnum lining mt-1 font-display text-3xl text-bone",
						children: r.chloeRating?.toFixed(1) ?? "—"
					})]
				})]
			})
		]
	});
}
/** Inline rating used inside cards. */
function MiniRating({ r, tone = "light" }) {
	const h = householdRating(r);
	const dim = tone === "dark" ? "text-bone-dim/80" : "text-bone-dim/70";
	const strong = "text-bone";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
				className: "h-3 w-3 translate-y-[1px] fill-brass text-brass",
				strokeWidth: 0
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tnum lining font-display text-2xl leading-none text-saffron",
				children: h != null ? h.toFixed(1) : "—"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `tnum lining text-[10px] uppercase tracking-[0.16em] ${dim}`,
			children: [
				"Chase ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `font-semibold ${strong}`,
					children: r.chaseRating?.toFixed(1) ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-1.5 opacity-40",
					children: "·"
				}),
				"Chloe ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `font-semibold ${strong}`,
					children: r.chloeRating?.toFixed(1) ?? "—"
				})
			]
		})]
	});
}
function WarningNotes({ tags }) {
	const ws = warningsFor(tags);
	if (!ws.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-1",
		children: ws.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 rounded-md border border-oxblood/40 bg-oxblood/10 px-3 py-2 text-xs text-bone",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5 text-oxblood" }),
				" ",
				w
			]
		}, w))
	});
}
function ReviewBadge() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "folio rounded-sm bg-saffron/15 px-1.5 py-0.5 text-saffron",
		children: "Needs review"
	});
}
function EmptyArt({ kind, className = "", variant = "cream" }) {
	const base = "relative overflow-hidden bg-slate text-brass";
	const art = {
		pantry: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 80 80",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.3",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: "h-12 w-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M24 32h32l-3 24H27L24 32z" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M29 32V24a11 11 0 0 1 22 0v8" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "32",
					r: "1.5",
					fill: "currentColor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "48",
					cy: "32",
					r: "1.5",
					fill: "currentColor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M34 44h12M34 50h8" })
			]
		}),
		recipe: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 80 80",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.3",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: "h-12 w-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 32h52" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 32v18a8 8 0 0 0 8 8h32a8 8 0 0 0 8-8V32" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M26 25c-1-4 2-7 4-5M40 22c0-4 4-6 6-3M52 25c-1-4 2-7 4-5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "40",
					cy: "32",
					rx: "22",
					ry: "2.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 32c0-2 2-3 4-3M70 32c0-2-2-3-4-3" })
			]
		}),
		drink: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 80 80",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.3",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: "h-12 w-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 18h36l-4 16a14 14 0 0 1-28 0L22 18z" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M40 48v14M30 64h20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "34",
					cy: "28",
					r: "1",
					fill: "currentColor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "44",
					cy: "32",
					r: "1",
					fill: "currentColor"
				})
			]
		}),
		espresso: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 80 80",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.3",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: "h-12 w-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 32h28v12a14 14 0 0 1-28 0V32z" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M50 36h6a6 6 0 0 1 0 12h-6" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 60h52M14 60c0-3 3-5 6-5h40c3 0 6 2 6 5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M30 22c-1-3 1-5 0-8M40 22c-1-3 1-5 0-8M50 22c-1-3 1-5 0-8" })
			]
		}),
		restaurant: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 80 80",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.3",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: "h-12 w-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "40",
					cy: "40",
					r: "20"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "40",
					cy: "40",
					r: "14"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 16v18a4 4 0 0 0 4 4h2v22" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M64 16c-3 0-6 4-6 10s3 10 6 10v22" })
			]
		})
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${base} ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-90",
				style: { backgroundImage: "radial-gradient(60% 60% at 50% 45%, rgba(232,163,61,0.10) 0%, transparent 60%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center",
				children: art[kind]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "folio absolute bottom-1.5 right-2 text-bone-dim/50",
				children: kind.slice(0, 3)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-1 rounded-[inherit] border border-bone/8" })
		]
	});
}
function SectionTitle({ children, kicker, action, number }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [kicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "folio mb-2",
					children: kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-[32px] font-medium leading-[0.95] tracking-[-0.02em] text-bone",
					children
				})]
			}), (action || number) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-3",
				children: [action, number && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "folio tnum lining text-bone-dim/70",
					children: number
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "brass-rule mt-4 h-px opacity-60" })]
	});
}
function AutofillBox({ onFill }) {
	const [text, setText] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [drafted, setDrafted] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function handleSubmit(e) {
		e.preventDefault();
		const notes = text.trim();
		if (!notes || loading) return;
		setLoading(true);
		setDrafted(false);
		setError(null);
		try {
			await onFill(notes);
			setDrafted(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Generation failed. Please try again.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-dashed border-saffron/40 bg-saffron/[0.05] p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center gap-2 text-saffron",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "folio",
				children: "Auto-fill from notes"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: text,
					onChange: (e) => {
						setText(e.target.value);
						setDrafted(false);
						setError(null);
					},
					rows: 4,
					placeholder: "Paste a recipe, messy notes, restaurant review, or drink recipe..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: loading || !text.trim(),
					className: "inline-flex h-10 items-center gap-2 rounded-md bg-saffron px-4 text-sm font-semibold text-noir transition-opacity hover:opacity-90 disabled:opacity-40",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-noir/30 border-t-noir" }), "Generating…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), "Generate Draft"] })
				}),
				drafted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium text-saffron",
					children: "✓ Draft applied — review all generated information before saving."
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-red-400",
					children: ["⚠ ", error]
				})
			]
		})]
	});
}
function AiBadge() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-0.5 rounded-sm bg-saffron/15 px-1 py-0.5 text-[10px] font-medium text-saffron",
		title: "AI-generated",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2.5 w-2.5" }), " AI"]
	});
}
function FavoriteBadges({ r }) {
	const h = householdRating(r);
	const items = [];
	if ((r.chaseRating ?? 0) >= 4.5) items.push({
		emoji: "❤️",
		label: "Chase Favorite"
	});
	if ((r.chloeRating ?? 0) >= 4.5) items.push({
		emoji: "💜",
		label: "Chloe Favorite"
	});
	if (h != null && h >= 4.7) items.push({
		emoji: "🏆",
		label: "Household Favorite"
	});
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: items.map(({ emoji, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-2.5 py-1 text-xs font-medium text-bone",
			children: [
				emoji,
				" ",
				label
			]
		}, label))
	});
}
function ConfirmDelete({ name, onConfirm, trigger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger2, {
		asChild: true,
		children: trigger
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, { className: "fixed inset-0 z-50 bg-noir/60 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
		className: "fixed left-1/2 top-1/2 z-50 w-[min(92vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-6 shadow-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Title2, {
				className: "font-display text-lg text-bone",
				children: [
					"Delete \"",
					name,
					"\"?"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
				className: "mt-2 text-sm text-bone-dim",
				children: "This cannot be undone."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex justify-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
					className: "rounded-xl border border-bone/15 px-4 py-2.5 text-sm text-bone-dim transition-colors hover:text-bone",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					onClick: onConfirm,
					className: "rounded-xl bg-destructive px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90",
					children: "Delete"
				})]
			})
		]
	})] })] });
}
function compressImage(file, maxPx, quality) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const url = URL.createObjectURL(file);
		img.onload = () => {
			URL.revokeObjectURL(url);
			const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
			const w = Math.round(img.width * scale);
			const h = Math.round(img.height * scale);
			const canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			canvas.getContext("2d").drawImage(img, 0, 0, w, h);
			resolve(canvas.toDataURL("image/jpeg", quality));
		};
		img.onerror = reject;
		img.src = url;
	});
}
function PhotoField({ value, onChange, kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Photo" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "group block cursor-pointer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-44 w-full overflow-hidden rounded-md border border-dashed border-bone/20 bg-graphite",
				children: value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: "",
					className: "h-full w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 grid place-items-center bg-noir/50 opacity-0 transition-opacity group-hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "folio rounded-full bg-saffron px-3 py-1.5 text-noir",
						children: "Replace photo"
					})
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyArt, {
						kind,
						className: "h-full w-full rounded-none border-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center bg-noir/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "folio rounded-full bg-saffron px-3 py-1.5 text-noir",
							children: "Add photo"
						})
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: (e) => {
					const f = e.target.files?.[0];
					if (!f) return;
					compressImage(f, 1200, .75).then(onChange).catch(() => {
						const reader = new FileReader();
						reader.onload = () => onChange(typeof reader.result === "string" ? reader.result : void 0);
						reader.readAsDataURL(f);
					});
				}
			})]
		}),
		value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(void 0),
			className: "folio mt-2 text-bone-dim hover:text-saffron",
			children: "Remove photo"
		})
	] });
}
//#endregion
export { TextArea as _, FavoriteBadges as a, Label as c, Pill as d, RatingDial as f, TagChip as g, Stepper as h, EmptyArt as i, MiniRating as l, SectionTitle as m, AutofillBox as n, Field as o, ReviewBadge as p, ConfirmDelete as r, HouseholdReadout as s, AiBadge as t, PhotoField as u, TextInput as v, WarningNotes as y };
