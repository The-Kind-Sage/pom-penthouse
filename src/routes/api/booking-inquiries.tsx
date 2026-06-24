import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";
import { ObjectId } from "mongodb";

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

      PATCH: async ({ request }) => {
        try {
          const { id, action } = await request.json();
          if (!id || !action) return json({ error: "id and action required" }, 400);

          const db = await getDb();
          const inquiry = await db.collection("booking_inquiries").findOne({ _id: new ObjectId(id) });
          if (!inquiry) return json({ error: "Inquiry not found" }, 404);

          if (action === "accept") {
            await db.collection("booking_inquiries").updateOne(
              { _id: new ObjectId(id) },
              { $set: { status: "accepted" } }
            );

            await db.collection("bookings").insertOne({
              penthouse_id: null,
              penthouse_name: inquiry.apartment,
              guest_name: inquiry.name,
              guest_email: inquiry.email,
              guest_phone: inquiry.phone || null,
              check_in: inquiry.checkin,
              check_out: inquiry.checkout,
              nights: Math.max(1, Math.ceil((new Date(inquiry.checkout).getTime() - new Date(inquiry.checkin).getTime()) / 86400000)),
              total: 0,
              status: "confirmed",
              payment_status: "unpaid",
              guests: inquiry.guests,
              addons: {},
              notes: inquiry.message || null,
              created_at: new Date(),
            });

            await db.collection("activities").insertOne({
              action: "Booking Accepted",
              detail: `${inquiry.name}'s inquiry for ${inquiry.apartment} was accepted`,
              type: "booking",
              created_at: new Date(),
            });

            return json({ success: true, status: "accepted" });
          }

          if (action === "reject") {
            await db.collection("booking_inquiries").updateOne(
              { _id: new ObjectId(id) },
              { $set: { status: "rejected" } }
            );

            await db.collection("activities").insertOne({
              action: "Booking Rejected",
              detail: `${inquiry.name}'s inquiry for ${inquiry.apartment} was rejected`,
              type: "booking",
              created_at: new Date(),
            });

            return json({ success: true, status: "rejected" });
          }

          return json({ error: "Invalid action" }, 400);
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },
    },
  },
});
