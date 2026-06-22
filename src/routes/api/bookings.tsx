import { createFileRoute } from "@tanstack/react-router";
import { createServiceClient } from "@/lib/supabase-server";
import { sendBookingConfirmation, sendNewBookingNotification } from "@/lib/email";
import { bookingSchema } from "@/lib/validators";

export const Route = createFileRoute("/api/bookings")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const validated = bookingSchema.parse(body);

          const supabase = createServiceClient();
          const { data: booking, error } = await supabase
            .from("bookings")
            .insert({
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
            })
            .select()
            .single();

          if (error) throw error;

          // Send emails (don't block response)
          Promise.all([
            sendBookingConfirmation({
              guestName: validated.guest_name,
              guestEmail: validated.guest_email,
              penthouseName: validated.penthouse_name,
              checkIn: validated.check_in,
              checkOut: validated.check_out,
              nights: validated.nights,
              total: validated.total,
            }).catch(console.error),
            sendNewBookingNotification({
              guestName: validated.guest_name,
              guestEmail: validated.guest_email,
              penthouseName: validated.penthouse_name,
              checkIn: validated.check_in,
              checkOut: validated.check_out,
              total: validated.total,
            }).catch(console.error),
          ]);

          return new Response(JSON.stringify({ success: true, booking }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err: any) {
          const message = err?.issues?.[0]?.message || err?.message || "Booking failed";
          return new Response(JSON.stringify({ success: false, error: message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
