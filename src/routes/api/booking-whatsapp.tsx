import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";
import { sendBookingNotification } from "@/lib/email";

function buildWhatsAppMessage(body: {
  name: string;
  email: string;
  phone: string;
  apartment: string;
  guests: string;
  checkin: string;
  checkout: string;
  message: string;
}) {
  const lines = [
    `*New Booking Inquiry — POM'S Penthouse*`,
    ``,
    `*Guest:* ${body.name}`,
    `*Email:* ${body.email}`,
    `*Phone:* ${body.phone || "N/A"}`,
    ``,
    `*Room/Apartment:* ${body.apartment}`,
    `*Guests:* ${body.guests}`,
    `*Check-in:* ${body.checkin}`,
    `*Check-out:* ${body.checkout}`,
  ];
  if (body.message) {
    lines.push(``, `*Message:* ${body.message}`);
  }
  return lines.join("\n");
}

async function sendToWhatsApp(phoneNumberId: string, token: string, to: string, text: string) {
  const res = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error("[WhatsApp] Send failed:", res.status, err);
    return false;
  }
  return true;
}

export const Route = createFileRoute("/api/booking-whatsapp")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { name, email, phone, apartment, guests, checkin, checkout, message } = body;

          if (!name?.trim()) return json({ error: "Name is required" }, 400);
          if (!email?.trim()) return json({ error: "Email is required" }, 400);
          if (!checkin) return json({ error: "Check-in date is required" }, 400);
          if (!checkout) return json({ error: "Check-out date is required" }, 400);

          const db = await getDb();

          const inquiry = {
            name: name.trim(),
            email: email.trim(),
            phone: phone?.trim() || null,
            apartment: apartment?.trim() || "Studio Apartment",
            guests: parseInt(guests) || 2,
            checkin,
            checkout,
            message: message?.trim() || null,
            status: "pending",
            whatsapp_sent: false,
            created_at: new Date(),
          };

          const result = await db.collection("booking_inquiries").insertOne(inquiry);

          await db.collection("activities").insertOne({
            action: "Booking Inquiry",
            detail: `${inquiry.apartment} inquiry from ${inquiry.name} (${checkin} → ${checkout})`,
            type: "booking",
            created_at: new Date(),
          });

          let whatsappSent = false;
          const token = process.env.WHATSAPP_TOKEN;
          const phoneNumberId = process.env.WHATSAPP_PHONE_ID;
          const recipientPhone = process.env.WHATSAPP_PHONE || "9779861990534";

          if (token && phoneNumberId) {
            const text = buildWhatsAppMessage(body);
            whatsappSent = await sendToWhatsApp(phoneNumberId, token, recipientPhone, text);
            if (whatsappSent) {
              await db.collection("booking_inquiries").updateOne(
                { _id: result.insertedId },
                { $set: { whatsapp_sent: true } }
              );
            }
          }

          let emailResult = { sent: false, reason: "not attempted" };
          try {
            emailResult = await sendBookingNotification(body);
          } catch (err) {
            console.error("[Email] Unexpected error:", err);
            emailResult = { sent: false, reason: String(err) };
          }

          return json({
            success: true,
            whatsapp_sent: whatsappSent,
            whatsapp_configured: !!(token && phoneNumberId),
            email: emailResult,
            id: result.insertedId.toString(),
          }, 201);
        } catch (err: any) {
          const message = err?.issues?.[0]?.message || err?.message || "Failed to submit booking";
          return json({ error: message }, 400);
        }
      },
    },
  },
});
