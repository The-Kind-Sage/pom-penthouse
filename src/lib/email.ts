import { Resend } from "resend";

export async function sendBookingNotification(body: {
  name: string;
  email: string;
  phone: string;
  apartment: string;
  guests: string;
  checkin: string;
  checkout: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "Pom PentHouse <onboarding@resend.dev>";
  const to = process.env.NOTIFICATION_EMAIL || process.env.VITE_ADMIN_EMAIL || "admin@pompenthouse.np";

  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY not set — skipping email notification");
    return false;
  }

  const resend = new Resend(apiKey);

  const details = [
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Phone: ${body.phone || "N/A"}`,
    ``,
    `Room/Apartment: ${body.apartment}`,
    `Guests: ${body.guests}`,
    `Check-in: ${body.checkin}`,
    `Check-out: ${body.checkout}`,
  ];
  if (body.message) details.push(``, `Message: ${body.message}`);

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `New Booking Inquiry — POM'S Penthouse (${body.name})`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#C9A227;">New Booking Inquiry</h2>
      <pre style="background:#f5f5f5;padding:16px;border-radius:8px;font-size:14px;line-height:1.6;">${details.join("\n")}</pre>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
      <p style="color:#888;font-size:12px;">Sent from POM'S Penthouse booking system</p>
    </div>`,
  });

  if (error) {
    console.error("[Email] Send failed:", error);
    return false;
  }

  return true;
}
