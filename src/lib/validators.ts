import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const penthouseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().optional(),
  price_per_night: z.number().min(1, "Price is required"),
  status: z.enum(["available", "booked", "maintenance"]),
  image: z.string().url().optional().or(z.literal("")),
  description: z.string().optional(),
  amenities: z.array(z.string()).default([]),
  max_guests: z.number().min(1).default(2),
  bedrooms: z.number().min(0).default(1),
  bathrooms: z.number().min(0).default(1),
  rules: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
});

export const bookingSchema = z.object({
  penthouse_id: z.string().uuid().optional().nullable(),
  penthouse_name: z.string().min(1, "Penthouse name is required"),
  guest_name: z.string().min(1, "Guest name is required"),
  guest_email: z.string().email("Invalid email"),
  guest_phone: z.string().optional(),
  check_in: z.string().min(1, "Check-in date is required"),
  check_out: z.string().min(1, "Check-out date is required"),
  nights: z.number().min(1, "At least 1 night"),
  total: z.number().min(0),
  guests: z.number().min(1).default(1),
  addons: z.record(z.boolean()).default({}),
  notes: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const profileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: z.enum(["guest", "staff", "admin"]),
  banned: z.boolean().default(false),
});

export const settingsSchema = z.record(z.unknown());

export type LoginInput = z.infer<typeof loginSchema>;
export type PenthouseInput = z.infer<typeof penthouseSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
