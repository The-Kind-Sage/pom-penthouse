import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";

export const Route = createFileRoute("/api/booking-inquiries")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const db = await getDb();
          const inquiries = await db.collection("booking_inquiries")
            .find()
            .sort({ created_at: -1 })
            .toArray();
          return json(inquiries.map((m: any) => ({ ...m, id: m._id.toString() })));
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },
    },
  },
});
