import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";

export const Route = createFileRoute("/api/activities")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const limit = parseInt(url.searchParams.get("limit") || "20");
          const db = await getDb();
          const activities = await db.collection("activities")
            .find()
            .sort({ created_at: -1 })
            .limit(limit)
            .toArray();
          return json(activities.map((a: any) => ({ ...a, id: a._id.toString() })));
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },
    },
  },
});
