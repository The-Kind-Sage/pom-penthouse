import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { adminStore } from "@/lib/admin-store";

const DEFAULT_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@pompenthouse.np";
const DEFAULT_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.login(email, password);
    localStorage.setItem("pom-admin-auth", "true");
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-paper border rounded-2xl p-8 space-y-6 shadow-lg">
        <div className="text-center">
          <h1 className="font-display text-3xl">Pom Admin</h1>
          <p className="text-sm text-foreground/60 mt-1">Sign in to your dashboard</p>
        </div>
        <div className="space-y-4">
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
        </div>
        <button type="submit" className="btn-primary w-full justify-center">Sign In</button>
        <p className="text-xs text-foreground/40 text-center">Demo: {DEFAULT_EMAIL} / {DEFAULT_PASSWORD}</p>
      </form>
    </div>
  );
}
