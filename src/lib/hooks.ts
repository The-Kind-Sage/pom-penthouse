import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase";
import type { Penthouse, Booking, User, Activity, Setting } from "@/lib/admin-types";

function supabase() {
  return createClient();
}

// ============================================
// PENTHOUSE HOOKS
// ============================================

export function usePenthouses() {
  return useQuery<Penthouse[]>({
    queryKey: ["penthouses"],
    queryFn: async () => {
      const { data, error } = await supabase()
        .from("penthouses")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreatePenthouse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (penthouse: any) => {
      const { data, error } = await supabase()
        .from("penthouses")
        .insert(penthouse)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["penthouses"] }),
  });
}

export function useUpdatePenthouse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { data, error } = await supabase()
        .from("penthouses")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["penthouses"] }),
  });
}

export function useDeletePenthouse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase().from("penthouses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["penthouses"] }),
  });
}

// ============================================
// BOOKING HOOKS
// ============================================

export function useBookings() {
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase()
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { data, error } = await supabase()
        .from("bookings")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

interface BookingStats {
  totalBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
  pendingBookings: number;
}

export function useBookingStats() {
  return useQuery<BookingStats>({
    queryKey: ["booking-stats"],
    queryFn: async () => {
      const [totalBookings, confirmedBookings, totalRevenue, pendingBookings] = await Promise.all([
        supabase().from("bookings").select("id", { count: "exact", head: true }),
        supabase().from("bookings").select("id", { count: "exact", head: true }).eq("status", "confirmed"),
        supabase().from("bookings").select("total").eq("status", "confirmed"),
        supabase().from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
      ]);

      const revenue = totalRevenue.data?.reduce((sum: number, b: { total: number | null }) => sum + (b.total || 0), 0) || 0;

      return {
        totalBookings: totalBookings.count || 0,
        confirmedBookings: confirmedBookings.count || 0,
        totalRevenue: revenue,
        pendingBookings: pendingBookings.count || 0,
      };
    },
  });
}

// ============================================
// USER / PROFILE HOOKS
// ============================================

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase()
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateUserRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const { data, error } = await supabase()
        .from("profiles")
        .update({ role })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useToggleBanUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, banned }: { id: string; banned: boolean }) => {
      const { data, error } = await supabase()
        .from("profiles")
        .update({ banned })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

// ============================================
// ACTIVITY HOOKS
// ============================================

export function useActivities(limit = 20) {
  return useQuery<Activity[]>({
    queryKey: ["activities", limit],
    queryFn: async () => {
      const { data, error } = await supabase()
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data;
    },
  });
}

// ============================================
// SETTINGS HOOKS
// ============================================

export function useSettings() {
  return useQuery<Record<string, any>>({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase().from("settings").select("*") as { data: Setting[] | null; error: any };
      if (error) throw error;
      const map: Record<string, any> = {};
      data?.forEach((s: Setting) => { map[s.key] = s.value; });
      return map;
    },
  });
}

export function useUpdateSetting() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { data, error } = await supabase()
        .from("settings")
        .upsert({ key, value, updated_at: new Date().toISOString() })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}

// ============================================
// CONTACT MESSAGES
// ============================================

export function useContactMessages() {
  return useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const { data, error } = await supabase()
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useMarkContactRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase()
        .from("contact_messages")
        .update({ read: true })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact-messages"] }),
  });
}
