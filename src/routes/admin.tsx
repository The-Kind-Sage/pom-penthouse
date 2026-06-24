import { Outlet, createFileRoute, Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAdmin, adminStore } from "@/lib/admin-store";
import {
  LayoutDashboard, CalendarCheck, Users, BarChart3, Settings,
  ChevronLeft, ChevronRight, Bell, Search, Moon, Sun, LogOut, User,
  Menu, ImageIcon, MessageSquare, BedDouble, Building,
} from "lucide-react";
import logoUrl from "../favicon/logo.png?url";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { to: "/admin/rooms", label: "Rooms", icon: BedDouble },
  { to: "/admin/apartments", label: "Apartments", icon: Building },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  ssr: false,
  beforeLoad: ({ location }) => {
    if (location.pathname === "/admin/login") return;
  },
  head: () => ({
    meta: [
      { title: "Admin Panel — POM'S Penthouse" },
    ],
  }),
});

function AdminLayout() {
  const { sidebarOpen, isLoading, isAuthenticated, user } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/admin/login";

  useEffect(() => {
    if (typeof window !== "undefined") {
      adminStore.init();
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isLoading && !isLoginPage && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isLoading, isAuthenticated, isLoginPage, navigate]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("pom-admin-theme", next);
  };

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return location.pathname === item.to;
    return location.pathname.startsWith(item.to);
  };

  if (isLoginPage) return <Outlet />;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-sm text-foreground/60">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "A";

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen bg-background border-r transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-0 lg:w-16 overflow-hidden"
        } ${mobileOpen ? "w-64" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b shrink-0">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2"><img src={logoUrl} alt="Pom" className="h-10 w-auto" /></Link>
          )}
          <button onClick={() => { adminStore.toggleSidebar(); setMobileOpen(false); }}
            className="p-1.5 rounded-lg hover:bg-muted transition">
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                isActive(item)
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t shrink-0">
          <button
            onClick={() => adminStore.logout()}
            className={`flex items-center gap-3 text-sm text-foreground/60 hover:text-foreground transition ${sidebarOpen ? "" : "justify-center"}`}
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-background flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 text-sm">
              <Search size={16} className="text-foreground/40" />
              <input placeholder="Search..." className="bg-transparent outline-none w-40 lg:w-60" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="p-2 rounded-lg hover:bg-muted transition relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-72 bg-background border rounded-xl shadow-lg z-20 py-2">
                    <p className="px-4 py-2 text-sm font-medium border-b">Notifications</p>
                    <div className="px-4 py-6 text-sm text-foreground/40 text-center">No notifications</div>
                  </div>
                </>
              )}
            </div>
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                  {initials}
                </div>
              </button>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-xl shadow-lg z-20 py-2">
                    <div className="px-4 py-2 text-sm border-b">
                      <p className="font-medium">{user?.name || "Admin"}</p>
                      <p className="text-foreground/60">{user?.email || ""}</p>
                    </div>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
                      <User size={14} /> Profile
                    </button>
                    <button
                      onClick={() => adminStore.logout()}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-red-500"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
