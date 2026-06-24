import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";

export const Route = createFileRoute("/api/gallery-images")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const db = await getDb();
          const doc = await db.collection("settings").findOne({ key: "gallery_images" });
          return json(doc?.value || []);
        } catch {
          return json([]);
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const db = await getDb();
          const existing = await db.collection("settings").findOne({ key: "gallery_images" });
          const images = existing?.value || [];
          images.push({ url: body.url, label: body.label || "", created_at: new Date().toISOString() });
          await db.collection("settings").updateOne(
            { key: "gallery_images" },
            { $set: { value: images } },
            { upsert: true },
          );
          return json({ success: true, images });
        } catch (err: any) {
          return json({ error: err?.message || "Failed to add image" }, 400);
        }
      },
      DELETE: async ({ request }) => {
        try {
          const body = await request.json();
          const db = await getDb();
          const existing = await db.collection("settings").findOne({ key: "gallery_images" });
          const images = (existing?.value || []).filter((_: any, i: number) => i !== body.index);
          await db.collection("settings").updateOne(
            { key: "gallery_images" },
            { $set: { value: images } },
          );
          return json({ success: true, images });
        } catch (err: any) {
          return json({ error: err?.message || "Failed to remove image" }, 400);
        }
      },
    },
  },
});
