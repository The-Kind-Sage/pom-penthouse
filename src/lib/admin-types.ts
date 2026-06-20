export type PenthouseStatus = "available" | "booked" | "maintenance";
export type BookingStatus = "pending" | "confirmed" | "declined" | "cancelled" | "completed";
export type PaymentStatus = "paid" | "unpaid" | "refunded";
export type UserRole = "guest" | "staff" | "admin";

export interface Penthouse {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  status: PenthouseStatus;
  image: string;
  description: string;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  rules: string[];
  images: string[];
  createdAt: string;
}

export interface Booking {
  id: string;
  penthouseId: string;
  penthouseName: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  guests: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bookingCount: number;
  lifetimeSpend: number;
  createdAt: string;
  banned: boolean;
}

export interface Activity {
  id: string;
  action: string;
  detail: string;
  time: string;
  type: "booking" | "review" | "payment" | "user";
}
