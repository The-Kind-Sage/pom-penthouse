import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json, getTokenFromRequest, verifyToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

export const Route = createFileRoute("/api/penthouses")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const db = await getDb();
          const penthouses = await db.collection("penthouses").find().sort({ created_at: -1 }).toArray();
          return json(penthouses.map((p: any) => ({ ...p, id: p._id.toString() })));
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },

      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const db = await getDb();
          const penthouse = { ...body, created_at: new Date() };
          const result = await db.collection("penthouses").insertOne(penthouse);
          return json({ ...penthouse, id: result.insertedId.toString() }, 201);
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },

      PATCH: async ({ request }) => {
        try {
          const { id, ...updates } = await request.json();
          const db = await getDb();
          await db.collection("penthouses").updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
          );
          return json({ success: true });
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },

      DELETE: async ({ request }) => {
        try {
          const { id } = await request.json();
          const db = await getDb();
          await db.collection("penthouses").deleteOne({ _id: new ObjectId(id) });
          return json({ success: true });
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },
    },
  },
});
