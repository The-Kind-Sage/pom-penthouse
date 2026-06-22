import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { bookingSchema } from "@/lib/validators";
import { json } from "@/lib/auth";

export const Route = createFileRoute("/api/bookings")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const db = await getDb();
          const url = new URL(request.url);
          const status = url.searchParams.get("status");

          const query: Record<string, any> = {};
          if (status && status !== "all") query.status = status;

          const bookings = await db
            .collection("bookings")
            .find(query)
            .sort({ created_at: -1 })
            .toArray();

          return json({ data: bookings.map((b: any) => ({ ...b, id: b._id.toString() })) });
        } catch (err: any) {
          return json({ error: err?.message || "Failed" }, 500);
        }
      },

      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const validated = bookingSchema.parse(body);

          const db = await getDb();
          const booking = {
            penthouse_id: validated.penthouse_id || null,
            penthouse_name: validated.penthouse_name,
            guest_name: validated.guest_name,
            guest_email: validated.guest_email,
            guest_phone: validated.guest_phone || null,
            check_in: validated.check_in,
            check_out: validated.check_out,
            nights: validated.nights,
            total: validated.total,
            guests: validated.guests,
            addons: validated.addons,
            notes: validated.notes || null,
            status: "pending",
            payment_status: "unpaid",
            created_at: new Date(),
          };

          const result = await db.collection("bookings").insertOne(booking);

          await db.collection("activities").insertOne({
            action: "New Booking",
            detail: `${booking.penthouse_name} booked by ${booking.guest_name}`,
            type: "booking",
            created_at: new Date(),
          });

          return json({ success: true, booking: { ...booking, id: result.insertedId.toString() } }, 201);
        } catch (err: any) {
          const message = err?.issues?.[0]?.message || err?.message || "Booking failed";
          return json({ error: message }, 400);
        }
      },

      PATCH: async ({ request }) => {
        try {
          const { id, ...updates } = await request.json();
          if (!id) return json({ error: "Booking ID required" }, 400);

          const { ObjectId } = await import("mongodb");
          const db = await getDb();
          await db.collection("bookings").updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
          );

          if (updates.status) {
            await db.collection("activities").insertOne({
              action: `Booking ${updates.status.charAt(0).toUpperCase() + updates.status.slice(1)}`,
              detail: `Booking status updated to ${updates.status}`,
              type: "booking",
              created_at: new Date(),
            });
          }

          return json({ success: true });
        } catch (err: any) {
          return json({ error: err?.message || "Update failed" }, 500);
        }
      },
    },
  },
});
