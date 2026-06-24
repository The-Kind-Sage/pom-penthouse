import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";

const DEFAULT_ROOM_TYPES = [
  { id: "single-single", name: "Single Room — Single Bed", price: 30, max_guests: 1, description: "Cozy single room with one bed" },
  { id: "single-double", name: "Single Room — Double Bed", price: 40, max_guests: 2, description: "Single room with double bed" },
  { id: "single-twin", name: "Single Room — Twin Bed", price: 45, max_guests: 2, description: "Single room with two separate beds" },
];

export const Route = createFileRoute("/api/room-types")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const db = await getDb();
          const doc = await db.collection("settings").findOne({ key: "room_types" });
          return json(doc?.value || DEFAULT_ROOM_TYPES);
        } catch {
          return json(DEFAULT_ROOM_TYPES);
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const db = await getDb();
          const existing = await db.collection("settings").findOne({ key: "room_types" });
          const types = existing?.value || DEFAULT_ROOM_TYPES;
          types.push({
            id: body.id || `room-${Date.now()}`,
            name: body.name,
            price: body.price || 0,
            max_guests: body.max_guests || 1,
            description: body.description || "",
          });
          await db.collection("settings").updateOne(
            { key: "room_types" },
            { $set: { value: types } },
            { upsert: true },
          );
          return json({ success: true, types });
        } catch (err: any) {
          return json({ error: err?.message || "Failed to add room type" }, 400);
        }
      },
      PATCH: async ({ request }) => {
        try {
          const body = await request.json();
          const db = await getDb();
          const existing = await db.collection("settings").findOne({ key: "room_types" });
          const types = (existing?.value || DEFAULT_ROOM_TYPES).map((t: any) =>
            t.id === body.id ? { ...t, ...body } : t,
          );
          await db.collection("settings").updateOne(
            { key: "room_types" },
            { $set: { value: types } },
            { upsert: true },
          );
          return json({ success: true, types });
        } catch (err: any) {
          return json({ error: err?.message || "Failed to update room type" }, 400);
        }
      },
      DELETE: async ({ request }) => {
        try {
          const body = await request.json();
          const db = await getDb();
          const existing = await db.collection("settings").findOne({ key: "room_types" });
          const types = (existing?.value || DEFAULT_ROOM_TYPES).filter((t: any) => t.id !== body.id);
          await db.collection("settings").updateOne(
            { key: "room_types" },
            { $set: { value: types } },
            { upsert: true },
          );
          return json({ success: true, types });
        } catch (err: any) {
          return json({ error: err?.message || "Failed to delete room type" }, 400);
        }
      },
    },
  },
});
