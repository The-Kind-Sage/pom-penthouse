import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { adminStore } from "@/lib/admin-store";
import logoUrl from "../favicon/logo.png?url";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await adminStore.login(email, password);
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-background border rounded-2xl p-8 space-y-6 shadow-lg">
          <div className="text-center">
            <img src={logoUrl} alt="Pom" className="h-20 w-auto mx-auto mb-4" />
            <p className="text-sm text-foreground/60">Sign in to your dashboard</p>
          </div>
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm px-4 py-2.5 rounded-xl">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
