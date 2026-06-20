import { useSyncExternalStore } from "react";

type AdminState = {
  isAuthenticated: boolean;
  user: { name: string; email: string; role: "admin" | "staff" | "guest"; avatar: string } | null;
  sidebarOpen: boolean;
  theme: "light" | "dark";
};

let state: AdminState = {
  isAuthenticated: false,
  user: null,
  sidebarOpen: true,
  theme: "light",
};

const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }
function subscribe(cb: () => void) { listeners.add(cb); return () => listeners.delete(cb); }
function getSnapshot() { return state; }
function getServerSnapshot() { return state; }

export const adminStore = {
  login(email: string, password: string) {
    state = { ...state, isAuthenticated: true, user: { name: "Admin", email, role: "admin", avatar: "" } };
    emit();
  },
  logout() { state = { ...state, isAuthenticated: false, user: null }; emit(); },
  toggleSidebar() { state = { ...state, sidebarOpen: !state.sidebarOpen }; emit(); },
  setTheme(t: "light" | "dark") {
    state = { ...state, theme: t };
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("pom-admin-theme", t);
    emit();
  },
};

export function useAdmin() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
