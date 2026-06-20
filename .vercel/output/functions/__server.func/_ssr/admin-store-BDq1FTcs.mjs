import { o as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-store-BDq1FTcs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var state = {
	isAuthenticated: false,
	user: null,
	sidebarOpen: true,
	theme: "light"
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
	login(email, password) {
		state = {
			...state,
			isAuthenticated: true,
			user: {
				name: "Admin",
				email,
				role: "admin",
				avatar: ""
			}
		};
		emit();
	},
	logout() {
		state = {
			...state,
			isAuthenticated: false,
			user: null
		};
		emit();
	},
	toggleSidebar() {
		state = {
			...state,
			sidebarOpen: !state.sidebarOpen
		};
		emit();
	},
	setTheme(t) {
		state = {
			...state,
			theme: t
		};
		document.documentElement.setAttribute("data-theme", t);
		localStorage.setItem("pom-admin-theme", t);
		emit();
	}
};
function useAdmin() {
	return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
//#endregion
export { useAdmin as n, adminStore as t };
