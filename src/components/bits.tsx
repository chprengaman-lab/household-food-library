import { Minus, Plus, AlertCircle, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { householdRating, warningsFor, type Ratings } from "@/lib/store";

export function Label({ children }: { children: ReactNode }) {
  return <span className="folio mb-1.5 block">{children}</span>;
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <Label>{label}</Label>
      {children}
      {hint && <span className="mt-1 block text-xs text-bone-dim/80">{hint}</span>}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-11 w-full rounded-md border border-bone/15 bg-graphite px-3 text-sm text-bone outline-none ring-saffron/40 placeholder:text-bone-dim/55 focus:ring-2 ${props.className ?? ""}`}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[90px] w-full rounded-md border border-bone/15 bg-graphite p-3 text-sm text-bone outline-none ring-saffron/40 placeholder:text-bone-dim/55 focus:ring-2 ${props.className ?? ""}`}
    />
  );
}

export function Pill({ on, onClick, children, tone = "default" }: { on: boolean; onClick: () => void; children: ReactNode; tone?: "default" | "warn" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        on
          ? tone === "warn"
            ? "bg-oxblood/20 text-oxblood ring-1 ring-oxblood/50"
            : "bg-saffron text-noir"
          : "bg-slate text-bone-dim hover:text-bone"
      }`}
    >
      {children}
    </button>
  );
}

export function TagChip({ tag, on, onClick }: { tag: string; on?: boolean; onClick?: () => void }) {
  const isDislike = ["seafood", "spicy"].includes(tag.toLowerCase());
  const cls = on
    ? "bg-saffron text-noir"
    : isDislike
      ? "bg-graphite text-oxblood ring-1 ring-oxblood/40"
      : "bg-slate text-bone-dim";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${cls}`}
    >
      {tag}
    </button>
  );
}

export function Stepper({ value, onChange, min = 0 }: { value: number; onChange: (v: number) => void; min?: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-bone/15 bg-graphite p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-9 w-9 place-items-center rounded-full bg-slate text-bone-dim hover:text-bone"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="tnum lining min-w-[2ch] text-center font-display text-xl text-bone">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="grid h-9 w-9 place-items-center rounded-full bg-saffron text-noir hover:opacity-90"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function RatingDial({ label, value, onChange }: { label: string; value?: number; onChange: (v: number | undefined) => void }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <Label>{label}</Label>
        <span className="tnum lining font-display text-xl text-saffron">{value != null ? value.toFixed(1) : "—"}</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range" min={0} max={5} step={0.5} value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-saffron"
        />
        {value != null && (
          <button type="button" onClick={() => onChange(undefined)} className="folio">
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

/* ===== Editorial-scale rating readout ===== */
export function HouseholdReadout({ r }: { r: Ratings }) {
  const h = householdRating(r);
  return (
    <div className="relative overflow-hidden rounded-xl border border-bone/10 bg-graphite p-6">
      <div className="absolute right-5 top-5">
        <Star className="h-4 w-4 fill-brass text-brass" strokeWidth={0} />
      </div>
      <p className="folio">Household score</p>
      <p className="tnum lining mt-1 font-display text-[88px] font-medium leading-none text-saffron">
        {h != null ? h.toFixed(1) : "—"}
      </p>
      <div className="brass-rule mt-5 h-px" />
      <div className="mt-5 grid grid-cols-2 gap-6">
        <div>
          <p className="folio">Chase</p>
          <p className="tnum lining mt-1 font-display text-3xl text-bone">{r.chaseRating?.toFixed(1) ?? "—"}</p>
        </div>
        <div className="border-l border-bone/10 pl-6">
          <p className="folio">Chloe</p>
          <p className="tnum lining mt-1 font-display text-3xl text-bone">{r.chloeRating?.toFixed(1) ?? "—"}</p>
        </div>
      </div>
    </div>
  );
}

/** Inline rating used inside cards. */
export function MiniRating({ r, tone = "light" }: { r: Ratings; tone?: "light" | "dark" }) {
  const h = householdRating(r);
  const dim = tone === "dark" ? "text-bone-dim/80" : "text-bone-dim/70";
  const strong = "text-bone";
  return (
    <div className="flex items-baseline gap-3">
      <div className="flex items-baseline gap-1.5">
        <Star className="h-3 w-3 translate-y-[1px] fill-brass text-brass" strokeWidth={0} />
        <span className="tnum lining font-display text-2xl leading-none text-saffron">
          {h != null ? h.toFixed(1) : "—"}
        </span>
      </div>
      <span className={`tnum lining text-[10px] uppercase tracking-[0.16em] ${dim}`}>
        Chase <span className={`font-semibold ${strong}`}>{r.chaseRating?.toFixed(1) ?? "—"}</span>
        <span className="mx-1.5 opacity-40">·</span>
        Chloe <span className={`font-semibold ${strong}`}>{r.chloeRating?.toFixed(1) ?? "—"}</span>
      </span>
    </div>
  );
}

export function WarningNotes({ tags }: { tags: string[] }) {
  const ws = warningsFor(tags);
  if (!ws.length) return null;
  return (
    <div className="space-y-1">
      {ws.map((w) => (
        <div key={w} className="flex items-center gap-2 rounded-md border border-oxblood/40 bg-oxblood/10 px-3 py-2 text-xs text-bone">
          <AlertCircle className="h-3.5 w-3.5 text-oxblood" /> {w}
        </div>
      ))}
    </div>
  );
}

export function ReviewBadge() {
  return <span className="folio rounded-sm bg-saffron/15 px-1.5 py-0.5 text-saffron">Needs review</span>;
}

/* ===== Brass line-art illustrations on dark ===== */
export function EmptyArt({
  kind,
  className = "",
  variant = "cream",
}: {
  kind: "recipe" | "drink" | "restaurant" | "espresso" | "pantry";
  className?: string;
  variant?: "cream" | "forest" | "journal";
}) {
  // All variants render the same brass-on-graphite plate now — single editorial language.
  const base = "relative overflow-hidden bg-slate text-brass";

  const art: Record<string, ReactNode> = {
    pantry: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
        <path d="M24 32h32l-3 24H27L24 32z" />
        <path d="M29 32V24a11 11 0 0 1 22 0v8" />
        <circle cx="32" cy="32" r="1.5" fill="currentColor" />
        <circle cx="48" cy="32" r="1.5" fill="currentColor" />
        <path d="M34 44h12M34 50h8" />
      </svg>
    ),
    recipe: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
        <path d="M14 32h52" />
        <path d="M16 32v18a8 8 0 0 0 8 8h32a8 8 0 0 0 8-8V32" />
        <path d="M26 25c-1-4 2-7 4-5M40 22c0-4 4-6 6-3M52 25c-1-4 2-7 4-5" />
        <ellipse cx="40" cy="32" rx="22" ry="2.2" />
        <path d="M10 32c0-2 2-3 4-3M70 32c0-2-2-3-4-3" />
      </svg>
    ),
    drink: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
        <path d="M22 18h36l-4 16a14 14 0 0 1-28 0L22 18z" />
        <path d="M40 48v14M30 64h20" />
        <circle cx="34" cy="28" r="1" fill="currentColor" />
        <circle cx="44" cy="32" r="1" fill="currentColor" />
      </svg>
    ),
    espresso: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
        <path d="M22 32h28v12a14 14 0 0 1-28 0V32z" />
        <path d="M50 36h6a6 6 0 0 1 0 12h-6" />
        <path d="M14 60h52M14 60c0-3 3-5 6-5h40c3 0 6 2 6 5" />
        <path d="M30 22c-1-3 1-5 0-8M40 22c-1-3 1-5 0-8M50 22c-1-3 1-5 0-8" />
      </svg>
    ),
    restaurant: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
        <circle cx="40" cy="40" r="20" />
        <circle cx="40" cy="40" r="14" />
        <path d="M14 16v18a4 4 0 0 0 4 4h2v22" />
        <path d="M64 16c-3 0-6 4-6 10s3 10 6 10v22" />
      </svg>
    ),
  };

  // subtle radial spotlight + corner folio mark
  return (
    <div className={`${base} ${className}`}>
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 50% 45%, rgba(232,163,61,0.10) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grid place-items-center">{art[kind]}</div>
      <span className="folio absolute bottom-1.5 right-2 text-bone-dim/50">{kind.slice(0, 3)}</span>
      {/* hairline frame */}
      <div className="pointer-events-none absolute inset-1 rounded-[inherit] border border-bone/8" />
    </div>
  );
}

/* ===== Editorial section heading ===== */
export function SectionTitle({
  children,
  kicker,
  action,
  number,
}: {
  children: ReactNode;
  kicker?: string;
  action?: ReactNode;
  number?: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          {kicker && <p className="folio mb-2">{kicker}</p>}
          <h2 className="font-display text-[32px] font-medium leading-[0.95] tracking-[-0.02em] text-bone">
            {children}
          </h2>
        </div>
        {(action || number) && (
          <div className="flex shrink-0 items-center gap-3">
            {action}
            {number && <span className="folio tnum lining text-bone-dim/70">{number}</span>}
          </div>
        )}
      </div>
      <div className="brass-rule mt-4 h-px opacity-60" />
    </div>
  );
}

/* ===== AI auto-fill ===== */
export function AutofillBox({ onFill }: { onFill: (notes: string) => Promise<void> }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [drafted, setDrafted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // NOTE: This component is always rendered inside a <form>. We intentionally
  // use a plain <div> + type="button" here — nested <form> elements are invalid
  // HTML and cause the browser to submit the outer form instead of calling onFill.
  async function handleGenerate() {
    const notes = text.trim();
    if (!notes || loading) return;
    console.log("[autofill] Generate Draft clicked — text length:", notes.length);
    setLoading(true);
    setDrafted(false);
    setError(null);
    try {
      console.log("[autofill] AI request starting...");
      await onFill(notes);
      console.log("[autofill] AI request succeeded");
      setDrafted(true);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Generation failed. Please try again.";
      console.error("[autofill] AI request failed:", msg);
      // Preserve the typed text so the user can retry without re-pasting.
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-md border border-dashed border-saffron/40 bg-saffron/[0.05] p-4">
      <div className="mb-3 flex items-center gap-2 text-saffron">
        <Sparkles className="h-4 w-4" />
        <span className="folio">Auto-fill from notes</span>
      </div>
      <div className="space-y-2.5">
        <TextArea
          value={text}
          onChange={(e) => { setText(e.target.value); setDrafted(false); setError(null); }}
          rows={4}
          placeholder="Paste a recipe, messy notes, restaurant review, or drink recipe..."
        />
        <button
          type="button"
          disabled={loading || !text.trim()}
          onClick={handleGenerate}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-saffron px-4 text-sm font-semibold text-noir transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-noir/30 border-t-noir" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Draft
            </>
          )}
        </button>
        {drafted && (
          <p className="text-xs font-medium text-saffron">
            ✓ Draft applied — review all generated information before saving.
          </p>
        )}
        {error && (
          <p className="text-xs text-red-400">
            ⚠ {error}
          </p>
        )}
      </div>
    </div>
  );
}

/* ===== AI-generated badge ===== */
export function AiBadge() {
  return (
    <span
      className="inline-flex items-center gap-0.5 rounded-sm bg-saffron/15 px-1 py-0.5 text-[10px] font-medium text-saffron"
      title="AI-generated"
    >
      <Sparkles className="h-2.5 w-2.5" /> AI
    </span>
  );
}

/* ===== Favourite rating badges ===== */
export function FavoriteBadges({ r }: { r: Ratings }) {
  const h = householdRating(r);
  const items: Array<{ emoji: string; label: string }> = [];
  if ((r.chaseRating ?? 0) >= 4.5) items.push({ emoji: "❤️", label: "Chase Favorite" });
  if ((r.chloeRating ?? 0) >= 4.5) items.push({ emoji: "💜", label: "Chloe Favorite" });
  if (h != null && h >= 4.7) items.push({ emoji: "🏆", label: "Household Favorite" });
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ emoji, label }) => (
        <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-2.5 py-1 text-xs font-medium text-bone">
          {emoji} {label}
        </span>
      ))}
    </div>
  );
}

/* ===== Confirm-before-delete dialog ===== */
export function ConfirmDelete({
  name,
  onConfirm,
  trigger,
}: {
  name: string;
  onConfirm: () => void;
  trigger: ReactNode;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-noir/60 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-6 shadow-2xl">
          <AlertDialog.Title className="font-display text-lg text-bone">
            Delete "{name}"?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-bone-dim">
            This cannot be undone.
          </AlertDialog.Description>
          <div className="mt-5 flex justify-end gap-3">
            <AlertDialog.Cancel className="rounded-xl border border-bone/15 px-4 py-2.5 text-sm text-bone-dim transition-colors hover:text-bone">
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={onConfirm}
              className="rounded-xl bg-destructive px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Delete
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

/* ===== Photo upload field ===== */

function compressImage(file: File, maxPx: number, quality: number): Promise<string> {
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
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function PhotoField({
  value,
  onChange,
  kind,
}: {
  value?: string;
  onChange: (next: string | undefined) => void;
  kind: "recipe" | "drink" | "restaurant" | "espresso" | "pantry";
}) {
  return (
    <div>
      <Label>Photo</Label>
      <label className="group block cursor-pointer">
        <div className="relative h-44 w-full overflow-hidden rounded-md border border-dashed border-bone/20 bg-graphite">
          {value ? (
            <>
              <img src={value} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-noir/50 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="folio rounded-full bg-saffron px-3 py-1.5 text-noir">Replace photo</span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0">
              <EmptyArt kind={kind} className="h-full w-full rounded-none border-0" />
              <div className="absolute inset-0 grid place-items-center bg-noir/40">
                <span className="folio rounded-full bg-saffron px-3 py-1.5 text-noir">Add photo</span>
              </div>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            compressImage(f, 1200, 0.75).then(onChange).catch(() => {
              const reader = new FileReader();
              reader.onload = () => onChange(typeof reader.result === "string" ? reader.result : undefined);
              reader.readAsDataURL(f);
            });
          }}
        />
      </label>
      {value && (
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className="folio mt-2 text-bone-dim hover:text-saffron"
        >
          Remove photo
        </button>
      )}
    </div>
  );
}
