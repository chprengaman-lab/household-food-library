import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/out")({
  component: () => <Outlet />,
});
