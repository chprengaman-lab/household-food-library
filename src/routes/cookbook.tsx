import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/cookbook")({
  component: () => <Outlet />,
});

export function relTime(ts: number): string {
  const days = Math.floor((Date.now() - ts) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 14) return `${days}d ago`;
  if (days < 60) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
