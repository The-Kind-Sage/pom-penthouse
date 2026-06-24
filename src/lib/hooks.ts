import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Penthouse, Booking, BookingInquiry, Room, User, Activity, Setting } from "@/lib/admin-types";
import { adminStore } from "@/lib/admin-store";

async function apiGet<T>(url: string): Promise<T> {
  const res = await adminStore.apiFetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data.data ?? data;
}

async function apiMutate<T>(url: string, options: RequestInit): Promise<T> {
  const res = await adminStore.apiFetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

// ============================================
// PENTHOUSE HOOKS
// ============================================

export function usePenthouses() {
  return useQuery<Penthouse[]>({
    queryKey: ["penthouses"],
    queryFn: () => apiGet("/api/penthouses"),
  });
}

export function useCreatePenthouse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (penthouse: any) =>
      apiMutate("/api/penthouses", { method: "POST", body: JSON.stringify(penthouse) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["penthouses"] }),
  });
}

export function useUpdatePenthouse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updates }: any) =>
      apiMutate("/api/penthouses", { method: "PATCH", body: JSON.stringify({ id, ...updates }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["penthouses"] }),
  });
}

export function useDeletePenthouse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiMutate("/api/penthouses", { method: "DELETE", body: JSON.stringify({ id }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["penthouses"] }),
  });
}

// ============================================
// BOOKING HOOKS
// ============================================

export function useBookings() {
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: () => apiGet("/api/bookings"),
  });
}

export function useUpdateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updates }: any) =>
      apiMutate("/api/bookings", { method: "PATCH", body: JSON.stringify({ id, ...updates }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

export function useBookingStats() {
  return useQuery({
    queryKey: ["booking-stats"],
    queryFn: async () => {
      const bookings = await apiGet<Booking[]>("/api/bookings");
      return {
        totalBookings: bookings.length,
        confirmedBookings: bookings.filter((b) => b.status === "confirmed").length,
        totalRevenue: bookings
          .filter((b) => b.status === "confirmed")
          .reduce((sum, b) => sum + (b.total || 0), 0),
        pendingBookings: bookings.filter((b) => b.status === "pending").length,
      };
    },
  });
}

// ============================================
// BOOKING INQUIRIES
// ============================================

export function useBookingInquiries() {
  return useQuery<BookingInquiry[]>({
    queryKey: ["booking-inquiries"],
    queryFn: () => apiGet("/api/booking-inquiries"),
  });
}

export function useUpdateInquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: string }) =>
      apiMutate("/api/booking-inquiries", { method: "PATCH", body: JSON.stringify({ id, action }) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["booking-inquiries"] });
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

// ============================================
// ROOM HOOKS
// ============================================

export function useRooms() {
  return useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: () => apiGet("/api/rooms"),
  });
}

export function useUpdateRoom() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      apiMutate("/api/rooms", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rooms"] }),
  });
}

// ============================================
// USER HOOKS
// ============================================

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => apiGet("/api/users"),
  });
}

export function useUpdateUserRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      apiMutate("/api/users", { method: "PATCH", body: JSON.stringify({ id, role }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useToggleBanUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, banned }: { id: string; banned: boolean }) =>
      apiMutate("/api/users", { method: "PATCH", body: JSON.stringify({ id, banned }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

// ============================================
// ACTIVITY HOOKS
// ============================================

export function useActivities(limit = 20) {
  return useQuery<Activity[]>({
    queryKey: ["activities", limit],
    queryFn: () => apiGet(`/api/activities?limit=${limit}`),
  });
}

// ============================================
// SETTINGS HOOKS
// ============================================

export function useSettings() {
  return useQuery<Record<string, any>>({
    queryKey: ["settings"],
    queryFn: async () => {
      const settings = await apiGet<{ key: string; value: any }[]>("/api/settings");
      const map: Record<string, any> = {};
      settings.forEach((s: { key: string; value: any }) => { map[s.key] = s.value; });
      return map;
    },
  });
}

export function useUpdateSetting() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) =>
      apiMutate("/api/settings", { method: "PATCH", body: JSON.stringify({ key, value }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}

// ============================================
// CONTACT MESSAGES
// ============================================

export function useContactMessages() {
  return useQuery({
    queryKey: ["contact-messages"],
    queryFn: () => apiGet("/api/contact-messages"),
  });
}

export function useMarkContactRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiMutate("/api/contact-messages", { method: "PATCH", body: JSON.stringify({ id }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact-messages"] }),
  });
}

// ============================================
// ROOM CONFIG HOOKS
// ============================================

export function useRoomConfig() {
  return useQuery({
    queryKey: ["room-config"],
    queryFn: async () => {
      const rooms = await apiGet<{ floor: number; number: number; label: string; type: string }[]>("/api/rooms");
      // Extract unique floor/label/type config from room list
      const config = rooms.map((r) => ({ floor: r.floor, number: r.number, label: r.label, type: r.type }));
      return config;
    },
  });
}

export function useUpdateRoomConfig() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (config: { floor: number; number: number; label: string; type: string }[]) =>
      apiMutate("/api/rooms", { method: "PUT", body: JSON.stringify({ config }) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rooms"] });
      qc.invalidateQueries({ queryKey: ["room-config"] });
    },
  });
}

export function useDeleteRoomFromConfig() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (label: string) =>
      apiMutate("/api/rooms", { method: "DELETE", body: JSON.stringify({ label }) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rooms"] });
      qc.invalidateQueries({ queryKey: ["room-config"] });
    },
  });
}

// Gallery images
export function useGalleryImages() {
  return useQuery<{ url: string; label: string; created_at: string }[]>({
    queryKey: ["gallery-images"],
    queryFn: () => apiGet("/api/gallery-images"),
  });
}

export function useAddGalleryImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { url: string; label: string }) =>
      apiMutate("/api/gallery-images", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery-images"] }),
  });
}

export function useRemoveGalleryImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (index: number) =>
      apiMutate("/api/gallery-images", { method: "DELETE", body: JSON.stringify({ index }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery-images"] }),
  });
}

export interface RoomType {
  id: string;
  name: string;
  price: number;
  max_guests: number;
  description: string;
}

export function useRoomTypes() {
  return useQuery<RoomType[]>({
    queryKey: ["room-types"],
    queryFn: () => apiGet("/api/room-types"),
  });
}

export function useCreateRoomType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<RoomType, "id"> & { id?: string }) =>
      apiMutate("/api/room-types", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["room-types"] }),
  });
}

export function useUpdateRoomType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<RoomType> & { id: string }) =>
      apiMutate("/api/room-types", { method: "PATCH", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["room-types"] }),
  });
}

export function useDeleteRoomType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiMutate("/api/room-types", { method: "DELETE", body: JSON.stringify({ id }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["room-types"] }),
  });
}

export interface ApartmentType {
  id: string;
  name: string;
  price: number;
  max_guests: number;
  bedrooms: number;
  description: string;
}

export function useApartmentTypes() {
  return useQuery<ApartmentType[]>({
    queryKey: ["apartment-types"],
    queryFn: () => apiGet("/api/apartment-types"),
  });
}

export function useCreateApartmentType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<ApartmentType, "id"> & { id?: string }) =>
      apiMutate("/api/apartment-types", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["apartment-types"] }),
  });
}

export function useUpdateApartmentType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ApartmentType> & { id: string }) =>
      apiMutate("/api/apartment-types", { method: "PATCH", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["apartment-types"] }),
  });
}

export function useDeleteApartmentType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiMutate("/api/apartment-types", { method: "DELETE", body: JSON.stringify({ id }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["apartment-types"] }),
  });
}
