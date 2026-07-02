import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/pantry")({
  component: () => <Outlet />,
});
