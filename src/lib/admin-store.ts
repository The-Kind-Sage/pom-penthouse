import { useSyncExternalStore } from "react";

type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  role: "admin" | "staff" | "guest";
  avatar: string | null;
  banned: boolean;
};

type AdminState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: Profile | null;
  sidebarOpen: boolean;
};

let state: AdminState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  sidebarOpen: true,
};

const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }
function subscribe(cb: () => void) { listeners.add(cb); return () => listeners.delete(cb); }
function getSnapshot() { return state; }
function getServerSnapshot() { return state; }

async function getClient() {
  const { createClient } = await import("@/lib/supabase");
  return createClient();
}

export const adminStore = {
  async init() {
    if (typeof window === "undefined") return;
    try {
      const supabase = await getClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        state = { ...state, isLoading: false, isAuthenticated: true, user: profile };
      } else {
        state = { ...state, isLoading: false };
      }
      emit();
    } catch {
      state = { ...state, isLoading: false };
      emit();
    }
  },

  async login(email: string, password: string) {
    const supabase = await getClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();
      state = { ...state, isAuthenticated: true, user: profile };
      emit();
    }
  },

  async logout() {
    const supabase = await getClient();
    await supabase.auth.signOut();
    state = { ...state, isAuthenticated: false, user: null };
    emit();
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
  },

  toggleSidebar() {
    state = { ...state, sidebarOpen: !state.sidebarOpen };
    emit();
  },
};

export function useAdmin() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
