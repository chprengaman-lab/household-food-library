import { createFileRoute } from "@tanstack/react-router";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { clearAll, restoreSeed } from "@/lib/store";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Chloe & Chase" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell title="Settings" kicker="Preferences">
      <section className="space-y-3">
        <div className="mb-5">
          <h2 className="font-display text-2xl text-bone">Demo Data</h2>
          <p className="folio mt-1 text-bone-dim">
            The app ships with sample content for browsing. Clear it when you're ready to start your own library, or restore it for portfolio demos.
          </p>
        </div>

        {/* Reset */}
        <ActionRow
          icon={<Trash2 className="h-5 w-5 text-destructive" />}
          label="Reset Demo Data"
          description="Remove all sample content and start fresh"
          dialog={{
            title: "Reset demo data?",
            body: (
              <>
                This will permanently remove all sample recipes, drinks, restaurants, pantry items, dishes, and drinks.
                <strong className="mt-2 block text-bone">This cannot be undone.</strong>
              </>
            ),
            confirmLabel: "Reset",
            confirmClass: "bg-destructive text-white hover:opacity-90",
            onConfirm: () => {
              clearAll();
              toast.success("Done — you're starting fresh.");
            },
          }}
        />

        {/* Restore */}
        <ActionRow
          icon={<RotateCcw className="h-5 w-5 text-saffron" />}
          label="Restore Demo Data"
          description="Reload the original sample content — useful for portfolio demos"
          dialog={{
            title: "Restore demo data?",
            body: "This will replace all current content with the original sample recipes, drinks, restaurants, and pantry items. Any entries you've added will be lost.",
            confirmLabel: "Restore",
            confirmClass: "bg-saffron text-noir hover:opacity-90",
            onConfirm: () => {
              restoreSeed();
              toast.success("Demo data restored.");
            },
          }}
        />
      </section>

      <div className="brass-rule mt-10 h-px opacity-40" />

      <p className="folio mt-6 text-center text-bone-dim/60">
        Household Library · built by Chase &amp; Chloe
      </p>
    </AppShell>
  );
}

// ── Reusable action row with its own confirmation dialog ──────────────────────

interface DialogConfig {
  title: string;
  body: React.ReactNode;
  confirmLabel: string;
  confirmClass: string;
  onConfirm: () => void;
}

function ActionRow({
  icon,
  label,
  description,
  dialog,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  dialog: DialogConfig;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="flex w-full items-center gap-4 rounded-2xl border border-bone/10 bg-graphite px-5 py-4 text-left transition-colors hover:border-bone/20">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-noir/60">
            {icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-bone">{label}</p>
            <p className="text-xs text-bone-dim">{description}</p>
          </div>
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-noir/70 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-bone/15 bg-graphite p-6 shadow-2xl">
          <AlertDialog.Title className="font-display text-xl text-bone">
            {dialog.title}
          </AlertDialog.Title>
          <AlertDialog.Description asChild>
            <p className="mt-3 text-sm leading-relaxed text-bone-dim">
              {dialog.body}
            </p>
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel className="rounded-xl border border-bone/15 px-4 py-2.5 text-sm font-medium text-bone-dim transition-colors hover:text-bone">
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={dialog.onConfirm}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity ${dialog.confirmClass}`}
            >
              {dialog.confirmLabel}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
