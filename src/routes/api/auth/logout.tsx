import { createFileRoute } from "@tanstack/react-router";
import { json } from "@/lib/auth";

export const Route = createFileRoute("/api/auth/logout")({
  server: {
    handlers: {
      POST: async () => {
        return json({ success: true });
      },
    },
  },
});
