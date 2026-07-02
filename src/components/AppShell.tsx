import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Coffee, Utensils, Heart, Library as LibIcon, Settings, ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Library", icon: LibIcon },
  { to: "/cookbook", label: "Cookbook", icon: BookOpen },
  { to: "/drinks", label: "Drinks", icon: Coffee },
  { to: "/out", label: "Going Out", icon: Utensils },
  { to: "/pantry", label: "Pantry", icon: ShoppingBag },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({
  children,
  kicker,
  title,
  right,
}: {
  children: ReactNode;
  kicker?: string;
  title?: string;
  right?: ReactNode;
  folio?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto max-w-2xl px-5 pt-8">
        {(title || kicker || right) && (
          <header className="mb-8">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                {kicker && (
                  <p className="folio mb-3 flex items-center gap-3">
                    <span className="h-px w-7 bg-saffron/70" />
                    {kicker}
                  </p>
                )}
                {title && (
                  <h1 className="font-display text-[52px] font-medium leading-[0.9] tracking-[-0.025em] text-bone">
                    {title}
                  </h1>
                )}
              </div>
              {right && <div className="shrink-0 pt-1">{right}</div>}
            </div>
            {title && <div className="brass-rule mt-6 h-px" />}
          </header>
        )}
        {children}
      </div>

      {/* Bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-bone/12 bg-noir/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-stretch justify-around px-2 py-2.5">
          {tabs.map((t) => {
            const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`group relative flex flex-1 flex-col items-center gap-1 py-1.5 transition-colors ${
                  active ? "text-saffron" : "text-bone-dim/70 hover:text-bone"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.6} />
                <span className="text-[10px] font-semibold tracking-wide">{t.label}</span>
                {active && <span className="absolute -top-[10px] h-[2px] w-10 bg-saffron" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
