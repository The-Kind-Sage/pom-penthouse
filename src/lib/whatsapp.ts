export function getWhatsAppLink(booking: {
  guestName: string;
  penthouseName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
}) {
  const phone = import.meta.env.WHATSAPP_PHONE || "97761XXXXXX";
  const text = encodeURIComponent(
    `Hello, I've booked ${booking.penthouseName} from ${booking.checkIn} to ${booking.checkOut} (${booking.nights} nights, रू ${booking.total.toLocaleString("en-IN")}). Looking forward to my stay! — ${booking.guestName}`
  );
  return `https://wa.me/${phone}?text=${text}`;
}
