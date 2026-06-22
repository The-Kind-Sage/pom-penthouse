import { t as createClient } from "./supabase-CzSmxgCc.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hooks-jthhuE6S.js
function supabase() {
	return createClient();
}
function usePenthouses() {
	return useQuery({
		queryKey: ["penthouses"],
		queryFn: async () => {
			const { data, error } = await supabase().from("penthouses").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
}
function useCreatePenthouse() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (penthouse) => {
			const { data, error } = await supabase().from("penthouses").insert(penthouse).select().single();
			if (error) throw error;
			return data;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["penthouses"] })
	});
}
function useUpdatePenthouse() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, ...updates }) => {
			const { data, error } = await supabase().from("penthouses").update(updates).eq("id", id).select().single();
			if (error) throw error;
			return data;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["penthouses"] })
	});
}
function useDeletePenthouse() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase().from("penthouses").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["penthouses"] })
	});
}
function useBookings() {
	return useQuery({
		queryKey: ["bookings"],
		queryFn: async () => {
			const { data, error } = await supabase().from("bookings").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
}
function useUpdateBooking() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, ...updates }) => {
			const { data, error } = await supabase().from("bookings").update(updates).eq("id", id).select().single();
			if (error) throw error;
			return data;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] })
	});
}
function useBookingStats() {
	return useQuery({
		queryKey: ["booking-stats"],
		queryFn: async () => {
			const [totalBookings, confirmedBookings, totalRevenue, pendingBookings] = await Promise.all([
				supabase().from("bookings").select("id", {
					count: "exact",
					head: true
				}),
				supabase().from("bookings").select("id", {
					count: "exact",
					head: true
				}).eq("status", "confirmed"),
				supabase().from("bookings").select("total").eq("status", "confirmed"),
				supabase().from("bookings").select("id", {
					count: "exact",
					head: true
				}).eq("status", "pending")
			]);
			const revenue = totalRevenue.data?.reduce((sum, b) => sum + (b.total || 0), 0) || 0;
			return {
				totalBookings: totalBookings.count || 0,
				confirmedBookings: confirmedBookings.count || 0,
				totalRevenue: revenue,
				pendingBookings: pendingBookings.count || 0
			};
		}
	});
}
function useUsers() {
	return useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const { data, error } = await supabase().from("profiles").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
}
function useUpdateUserRole() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, role }) => {
			const { data, error } = await supabase().from("profiles").update({ role }).eq("id", id).select().single();
			if (error) throw error;
			return data;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] })
	});
}
function useToggleBanUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, banned }) => {
			const { data, error } = await supabase().from("profiles").update({ banned }).eq("id", id).select().single();
			if (error) throw error;
			return data;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] })
	});
}
function useActivities(limit = 20) {
	return useQuery({
		queryKey: ["activities", limit],
		queryFn: async () => {
			const { data, error } = await supabase().from("activities").select("*").order("created_at", { ascending: false }).limit(limit);
			if (error) throw error;
			return data;
		}
	});
}
function useSettings() {
	return useQuery({
		queryKey: ["settings"],
		queryFn: async () => {
			const { data, error } = await supabase().from("settings").select("*");
			if (error) throw error;
			const map = {};
			data?.forEach((s) => {
				map[s.key] = s.value;
			});
			return map;
		}
	});
}
function useUpdateSetting() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ key, value }) => {
			const { data, error } = await supabase().from("settings").upsert({
				key,
				value,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).select().single();
			if (error) throw error;
			return data;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] })
	});
}
//#endregion
export { useDeletePenthouse as a, useToggleBanUser as c, useUpdateSetting as d, useUpdateUserRole as f, useCreatePenthouse as i, useUpdateBooking as l, useBookingStats as n, usePenthouses as o, useUsers as p, useBookings as r, useSettings as s, useActivities as t, useUpdatePenthouse as u };
