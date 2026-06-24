import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";

const DEFAULT_APARTMENT_TYPES = [
  { id: "1bhk", name: "1 BHK", price: 75, max_guests: 2, bedrooms: 1, description: "One bedroom, hall, and kitchen" },
  { id: "2bhk", name: "2 BHK", price: 110, max_guests: 4, bedrooms: 2, description: "Two bedrooms, hall, and kitchen" },
  { id: "3bhk", name: "3 BHK", price: 150, max_guests: 6, bedrooms: 3, description: "Three bedrooms, hall, and kitchen" },
];

export const Route = createFileRoute("/api/apartment-types")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const db = await getDb();
          const doc = await db.collection("settings").findOne({ key: "apartment_types" });
          return json(doc?.value || DEFAULT_APARTMENT_TYPES);
        } catch {
          return json(DEFAULT_APARTMENT_TYPES);
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const db = await getDb();
          const existing = await db.collection("settings").findOne({ key: "apartment_types" });
          const types = existing?.value || DEFAULT_APARTMENT_TYPES;
          types.push({
            id: body.id || `apt-${Date.now()}`,
            name: body.name,
            price: body.price || 0,
            max_guests: body.max_guests || 2,
            bedrooms: body.bedrooms || 1,
            description: body.description || "",
          });
          await db.collection("settings").updateOne(
            { key: "apartment_types" },
            { $set: { value: types } },
            { upsert: true },
          );
          return json({ success: true, types });
        } catch (err: any) {
          return json({ error: err?.message || "Failed to add apartment type" }, 400);
        }
      },
      PATCH: async ({ request }) => {
        try {
          const body = await request.json();
          const db = await getDb();
          const existing = await db.collection("settings").findOne({ key: "apartment_types" });
          const types = (existing?.value || DEFAULT_APARTMENT_TYPES).map((t: any) =>
            t.id === body.id ? { ...t, ...body } : t,
          );
          await db.collection("settings").updateOne(
            { key: "apartment_types" },
            { $set: { value: types } },
            { upsert: true },
          );
          return json({ success: true, types });
        } catch (err: any) {
          return json({ error: err?.message || "Failed to update apartment type" }, 400);
        }
      },
      DELETE: async ({ request }) => {
        try {
          const body = await request.json();
          const db = await getDb();
          const existing = await db.collection("settings").findOne({ key: "apartment_types" });
          const types = (existing?.value || DEFAULT_APARTMENT_TYPES).filter((t: any) => t.id !== body.id);
          await db.collection("settings").updateOne(
            { key: "apartment_types" },
            { $set: { value: types } },
            { upsert: true },
          );
          return json({ success: true, types });
        } catch (err: any) {
          return json({ error: err?.message || "Failed to delete apartment type" }, 400);
        }
      },
    },
  },
});
