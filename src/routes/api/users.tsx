import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";
import { ObjectId } from "mongodb";

export const Route = createFileRoute("/api/users")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const db = await getDb();
          const users = await db.collection("users").find({}, { projection: { password: 0 } })
            .sort({ created_at: -1 }).toArray();
          return json(users.map((u: any) => ({ ...u, id: u._id.toString() })));
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },

      PATCH: async ({ request }) => {
        try {
          const { id, ...updates } = await request.json();
          const db = await getDb();
          await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
          );
          return json({ success: true });
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },
    },
  },
});
