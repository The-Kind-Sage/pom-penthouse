import { o as __toESM } from "../_runtime.mjs";
import { t as createClient } from "./supabase-CzSmxgCc.mjs";
import { o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-store-DSIQMR-1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var state = {
	isLoading: true,
	isAuthenticated: false,
	user: null,
	sidebarOpen: true
};
var listeners = /* @__PURE__ */ new Set();
function emit() {
	listeners.forEach((l) => l());
}
function subscribe(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
function getSnapshot() {
	return state;
}
function getServerSnapshot() {
	return state;
}
var adminStore = {
	async init() {
		if (typeof window === "undefined") return;
		try {
			const supabase = createClient();
			const { data: { session } } = await supabase.auth.getSession();
			if (session?.user) {
				const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
				state = {
					...state,
					isLoading: false,
					isAuthenticated: true,
					user: profile
				};
			} else state = {
				...state,
				isLoading: false
			};
			emit();
		} catch {
			state = {
				...state,
				isLoading: false
			};
			emit();
		}
	},
	async login(email, password) {
		const supabase = createClient();
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) throw error;
		if (data.user) {
			const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
			state = {
				...state,
				isAuthenticated: true,
				user: profile
			};
			emit();
		}
	},
	async logout() {
		await createClient().auth.signOut();
		state = {
			...state,
			isAuthenticated: false,
			user: null
		};
		emit();
		if (typeof window !== "undefined") window.location.href = "/admin/login";
	},
	toggleSidebar() {
		state = {
			...state,
			sidebarOpen: !state.sidebarOpen
		};
		emit();
	}
};
function useAdmin() {
	return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
//#endregion
export { useAdmin as n, adminStore as t };
