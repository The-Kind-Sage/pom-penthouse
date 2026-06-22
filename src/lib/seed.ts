import { getDb } from "./mongodb";
import { hashPassword } from "./auth";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env");
  process.exit(1);
}

async function seed() {
  const db = await getDb();

  // Create indexes
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("bookings").createIndex({ status: 1 });
  await db.collection("bookings").createIndex({ check_in: 1 });
  await db.collection("bookings").createIndex({ created_at: -1 });
  await db.collection("penthouses").createIndex({ status: 1 });
  await db.collection("activities").createIndex({ created_at: -1 });
  await db.collection("contact_messages").createIndex({ read: 1 });

  // Seed admin user
  const adminEmail = process.env.VITE_ADMIN_EMAIL || "admin@pompenthouse.np";
  const adminPassword = process.env.VITE_ADMIN_PASSWORD || "admin123";

  const existing = await db.collection("users").findOne({ email: adminEmail });
  if (!existing) {
    const hashed = await hashPassword(adminPassword);
    await db.collection("users").insertOne({
      email: adminEmail,
      name: "Admin",
      password: hashed,
      role: "admin",
      avatar: null,
      banned: false,
      created_at: new Date(),
    });
    console.log(`✓ Admin user created: ${adminEmail}`);
  } else {
    console.log(`- Admin user already exists: ${adminEmail}`);
  }

  // Seed settings
  const settings = [
    { key: "hero_title", value: "Pom PentHouse" },
    { key: "hero_subtitle", value: "A Lakeside Sanctuary — 180 meters from Phewa Lake" },
    { key: "contact_email", value: "hello@pompenthouse.np" },
    { key: "contact_phone", value: "+977 61-XXXXXX" },
    { key: "pricing_rules", value: { peakMultiplier: 20, minStay: 2, holidayRate: 30 } },
  ];

  for (const s of settings) {
    await db.collection("settings").updateOne({ key: s.key }, { $setOnInsert: s }, { upsert: true });
  }
  console.log(`✓ Settings seeded`);

  // Seed penthouse
  const penthouseExists = await db.collection("penthouses").findOne({ name: "Pom PentHouse" });
  if (!penthouseExists) {
    await db.collection("penthouses").insertOne({
      name: "Pom PentHouse",
      location: "Lakeside Road, Pokhara",
      price_per_night: 25500,
      status: "available",
      image: null,
      description: "A luxury penthouse in the heart of Pokhara with stunning lake views.",
      amenities: ["Wifi 600mbps", "Kitchen", "Lake View", "Parking", "AC"],
      max_guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      rules: ["No smoking", "No pets", "Check-in 3PM", "Check-out 11AM"],
      images: [],
      created_at: new Date(),
    });
    console.log(`✓ Penthouse seeded`);
  } else {
    console.log(`- Penthouse already exists`);
  }

  console.log("\n✓ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
