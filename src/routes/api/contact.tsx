import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { contactSchema } from "@/lib/validators";
import { json } from "@/lib/auth";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const validated = contactSchema.parse(body);

          const db = await getDb();
          await db.collection("contact_messages").insertOne({
            name: validated.name,
            email: validated.email,
            message: validated.message,
            read: false,
            created_at: new Date(),
          });

          return json({ success: true }, 201);
        } catch (err: any) {
          const message = err?.issues?.[0]?.message || err?.message || "Failed to send message";
          return json({ error: message }, 400);
        }
      },
    },
  },
});
