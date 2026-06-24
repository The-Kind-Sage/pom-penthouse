export type PenthouseStatus = "available" | "booked" | "maintenance";
export type BookingStatus = "pending" | "confirmed" | "declined" | "cancelled" | "completed";
export type PaymentStatus = "paid" | "unpaid" | "refunded";
export type UserRole = "guest" | "staff" | "admin";

export interface Penthouse {
  id: string;
  name: string;
  location: string | null;
  price_per_night: number;
  status: PenthouseStatus;
  image: string | null;
  description: string | null;
  amenities: string[];
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  rules: string[];
  images: string[];
  created_at: string;
}

export interface Booking {
  id: string;
  penthouse_id: string | null;
  penthouse_name: string | null;
  guest_name: string;
  guest_email: string;
  guest_phone: string | null;
  check_in: string;
  check_out: string;
  nights: number;
  total: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  guests: number;
  addons: Record<string, boolean>;
  notes: string | null;
  created_at: string;
}

export interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  apartment: string;
  guests: number;
  checkin: string;
  checkout: string;
  message: string | null;
  status: string;
  created_at: string;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  avatar: string | null;
  banned: boolean;
  created_at: string;
}

export interface Activity {
  id: string;
  action: string;
  detail: string | null;
  type: "booking" | "review" | "payment" | "user" | null;
  created_at: string;
}

export interface Setting {
  key: string;
  value: any;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

// Legacy aliases (used by some pages)
export type PenthouseStatusLegacy = PenthouseStatus;
export type BookingStatusLegacy = BookingStatus;
export type PaymentStatusLegacy = PaymentStatus;
