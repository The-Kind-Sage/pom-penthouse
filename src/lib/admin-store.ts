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

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

function setToken(token: string) {
  localStorage.setItem("token", token);
}

function clearToken() {
  localStorage.removeItem("token");
}

async function apiFetch(url: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return fetch(url, { ...options, headers });
}

export const adminStore = {
  async init() {
    if (typeof window === "undefined") return;
    try {
      const token = getToken();
      if (!token) {
        state = { ...state, isLoading: false };
        emit();
        return;
      }
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.user) {
        state = { ...state, isLoading: false, isAuthenticated: true, user: data.user };
      } else {
        clearToken();
        state = { ...state, isLoading: false };
      }
      emit();
    } catch {
      state = { ...state, isLoading: false };
      emit();
    }
  },

  async login(email: string, password: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    setToken(data.token);
    state = { ...state, isAuthenticated: true, user: data.user };
    emit();
  },

  async logout() {
    clearToken();
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

  apiFetch,
  getToken,
};

export function useAdmin() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
