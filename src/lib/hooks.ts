import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Penthouse, Booking, BookingInquiry, User, Activity, Setting } from "@/lib/admin-types";
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
