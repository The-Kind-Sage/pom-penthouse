import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";
import { ObjectId } from "mongodb";

export const Route = createFileRoute("/api/contact-messages")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const db = await getDb();
          const messages = await db.collection("contact_messages")
            .find()
            .sort({ created_at: -1 })
            .toArray();
          return json(messages.map((m: any) => ({ ...m, id: m._id.toString() })));
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },

      PATCH: async ({ request }) => {
        try {
          const { id } = await request.json();
          const db = await getDb();
          await db.collection("contact_messages").updateOne(
            { _id: new ObjectId(id) },
            { $set: { read: true } }
          );
          return json({ success: true });
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },
    },
  },
});
