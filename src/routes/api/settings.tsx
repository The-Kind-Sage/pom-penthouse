import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";

export const Route = createFileRoute("/api/settings")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const db = await getDb();
          const settings = await db.collection("settings").find().toArray();
          return json(settings.map((s: any) => ({ key: s.key, value: s.value })));
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },

      PATCH: async ({ request }) => {
        try {
          const { key, value } = await request.json();
          const db = await getDb();
          await db.collection("settings").updateOne(
            { key },
            { $set: { key, value, updated_at: new Date() } },
            { upsert: true }
          );
          return json({ success: true });
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },
    },
  },
});
