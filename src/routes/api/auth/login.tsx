import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { comparePassword, signToken, json } from "@/lib/auth";

export const Route = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { email, password } = await request.json();
          if (!email || !password) return json({ error: "Email and password required" }, 400);

          const db = await getDb();
          const user = await db.collection("users").findOne({ email });
          if (!user) return json({ error: "Invalid credentials" }, 401);

          const valid = await comparePassword(password, user.password);
          if (!valid) return json({ error: "Invalid credentials" }, 401);

          if (user.banned) return json({ error: "Account is banned" }, 403);

          const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
          });

          const profile = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar || null,
            banned: user.banned || false,
          };

          return json({ token, user: profile });
        } catch (err: any) {
          console.error("[auth/login]", err?.message || err);
          return json({ error: err?.message || "Login failed" }, 500);
        }
      },
    },
  },
});
