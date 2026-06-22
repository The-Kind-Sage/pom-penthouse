import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { getTokenFromRequest, verifyToken, json } from "@/lib/auth";
import { ObjectId } from "mongodb";

export const Route = createFileRoute("/api/auth/me")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const token = getTokenFromRequest(request);
          if (!token) return json({ error: "Not authenticated" }, 401);

          const payload = verifyToken(token);
          if (!payload) return json({ error: "Invalid token" }, 401);

          const db = await getDb();
          const user = await db.collection("users").findOne(
            { _id: new ObjectId(payload.userId) },
            { projection: { password: 0 } }
          );
          if (!user) return json({ error: "User not found" }, 404);

          return json({
            user: {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
              avatar: user.avatar || null,
              banned: user.banned || false,
            },
          });
        } catch (err: any) {
          return json({ error: err?.message || "Failed" }, 500);
        }
      },
    },
  },
});
