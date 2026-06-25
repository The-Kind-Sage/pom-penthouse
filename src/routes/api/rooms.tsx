import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";

const ROOM_TYPES: Record<number, string[]> = {
  1: ["Studio Apartment", "Single Room — Double Bed", "Single Room — Double Bed", "Single Room — Twin Bed"],
  2: ["Studio Apartment", "1 BHK", "Single Room — Double Bed", "Single Room — Double Bed"],
  3: ["1 BHK", "1 BHK", "2 BHK", "Single Room — Twin Bed"],
  4: ["1 BHK", "2 BHK", "2 BHK", "Studio Apartment"],
  5: ["2 BHK", "2 BHK", "3 BHK", "Studio Apartment"],
  6: ["2 BHK", "3 BHK", "3 BHK", "1 BHK"],
  7: ["3 BHK", "3 BHK", "2 BHK", "Studio Apartment"],
};

function buildRooms() {
  const rooms: { floor: number; number: number; label: string; type: string; status: "available" | "booked"; }[] = [];
  for (let floor = 1; floor <= 7; floor++) {
    for (let r = 0; r < 4; r++) {
      const label = `${String.fromCharCode(65 + r)}${floor}`;
      rooms.push({ floor, number: r + 1, label, type: ROOM_TYPES[floor][r], status: "available" });
    }
  }
  return rooms;
}

interface RoomConfigItem {
  floor: number;
  number: number;
  label: string;
  type: string;
}

export const Route = createFileRoute("/api/rooms")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const db = await getDb();
          const all = await db.collection("rooms").find().toArray();
          const bookedMap = new Map(all.map((r: any) => [r.label, r]));

          // Load custom room config from DB, fall back to buildRooms()
          const configDoc = await db.collection("settings").findOne({ key: "room_config" });
          const roomConfig: RoomConfigItem[] = configDoc?.value || buildRooms();

          const rooms = roomConfig.map((r) => {
            const booked = bookedMap.get(r.label);
            return booked ? { ...r, status: "booked", guest_name: booked.guest_name, check_in: booked.check_in, check_out: booked.check_out } : { ...r, status: "available" };
          });

          return json(rooms);
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },

      POST: async ({ request }) => {
        try {
          const { label, guest_name, check_in, check_out, action } = await request.json();
          const db = await getDb();

          if (action === "free") {
            await db.collection("rooms").deleteOne({ label });
            return json({ success: true, status: "available" });
          }

          // Load custom config or default
          const configDoc = await db.collection("settings").findOne({ key: "room_config" });
          const roomConfig: RoomConfigItem[] = configDoc?.value || buildRooms();
          const room = roomConfig.find((r) => r.label === label);
          if (!room) return json({ error: "Room not found" }, 400);

          const doc = { label, floor: room.floor, number: room.number, type: room.type, guest_name: guest_name || "Walk-in Guest", check_in: check_in || null, check_out: check_out || null, created_at: new Date() };

          await db.collection("rooms").updateOne({ label }, { $set: doc }, { upsert: true });
          return json({ success: true, status: "booked" });
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },

      PUT: async ({ request }) => {
        try {
          const body = await request.json();
          const db = await getDb();

          // body should be { config: RoomConfigItem[] } — the full room configuration
          if (!body.config || !Array.isArray(body.config)) {
            return json({ error: "Invalid room config" }, 400);
          }

          await db.collection("settings").updateOne(
            { key: "room_config" },
            { $set: { value: body.config } },
            { upsert: true },
          );

          return json({ success: true, config: body.config });
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },

      DELETE: async ({ request }) => {
        try {
          const body = await request.json();
          const db = await getDb();

          // body should be { label: string } — remove a room from config
          if (!body.label) {
            return json({ error: "Room label required" }, 400);
          }

          const configDoc = await db.collection("settings").findOne({ key: "room_config" });
          const roomConfig: RoomConfigItem[] = configDoc?.value || buildRooms();
          const filtered = roomConfig.filter((r) => r.label !== body.label);

          // Also clean up any bookings for that room
          await db.collection("rooms").deleteOne({ label: body.label });

          await db.collection("settings").updateOne(
            { key: "room_config" },
            { $set: { value: filtered } },
            { upsert: true },
          );

          return json({ success: true, config: filtered });
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },
    },
  },
});
