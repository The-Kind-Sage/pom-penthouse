import { Resend } from "resend";

export const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const FROM_EMAIL = import.meta.env.RESEND_FROM || "Pom PentHouse <hello@pompenthouse.np>";

export async function sendBookingConfirmation(booking: {
  guestName: string;
  guestEmail: string;
  penthouseName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
}) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: booking.guestEmail,
    subject: `Booking Confirmed — ${booking.penthouseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Booking Confirmed</h1>
        <p>Dear ${booking.guestName},</p>
        <p>Your booking at <strong>${booking.penthouseName}</strong> is confirmed.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Check-in</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.checkIn}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Check-out</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.checkOut}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Nights</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.nights}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Total</td><td style="padding: 8px; font-weight: bold;">रू ${booking.total.toLocaleString("en-IN")}</td></tr>
        </table>
        <p>We look forward to hosting you.</p>
        <p>Best,<br/>Pom PentHouse</p>
      </div>
    `,
  });
}

export async function sendNewBookingNotification(booking: {
  guestName: string;
  guestEmail: string;
  penthouseName: string;
  checkIn: string;
  checkOut: string;
  total: number;
}) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: "hello@pompenthouse.np",
    subject: `New Booking — ${booking.penthouseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">New Booking Received</h1>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Guest</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.guestName} (${booking.guestEmail})</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Penthouse</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.penthouseName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Check-in</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.checkIn}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Check-out</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.checkOut}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Total</td><td style="padding: 8px; font-weight: bold;">रू ${booking.total.toLocaleString("en-IN")}</td></tr>
        </table>
      </div>
    `,
  });
}

export async function sendBookingStatusUpdate(booking: {
  guestName: string;
  guestEmail: string;
  penthouseName: string;
  status: string;
}) {
  const statusText = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
  return resend.emails.send({
    from: FROM_EMAIL,
    to: booking.guestEmail,
    subject: `Booking ${statusText} — ${booking.penthouseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Booking ${statusText}</h1>
        <p>Dear ${booking.guestName},</p>
        <p>Your booking at <strong>${booking.penthouseName}</strong> has been <strong>${statusText}</strong>.</p>
        <p>If you have any questions, please reply to this email.</p>
        <p>Best,<br/>Pom PentHouse</p>
      </div>
    `,
  });
}

export async function sendContactNotification(contact: {
  name: string;
  email: string;
  message: string;
}) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: "hello@pompenthouse.np",
    subject: `New Contact Message — ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">New Contact Message</h1>
        <p><strong>From:</strong> ${contact.name} (${contact.email})</p>
        <p style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 20px 0;">${contact.message}</p>
      </div>
    `,
  });
}
