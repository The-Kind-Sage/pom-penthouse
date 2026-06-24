import "dotenv/config";
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
    { key: "navbar_settings", value: {
      logo: "",
      phone: "+977 984-081-4142",
      links: [
        { label: "Home", href: "/" },
        { label: "Apartments", href: "/apartments" },
        { label: "Amenities", href: "/amenities" },
        { label: "Rooms", href: "/rooms" },
        { label: "Gallery", href: "/gallery" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    }},
    { key: "hero_settings", value: {
      tagline: "Pokhara, Nepal",
      badge: "Freehold",
      btn_primary: "Schedule a Private Viewing",
      btn_secondary: "Book a Stay",
      slides: [
        { src: "/images/home.jpg", alt: "Penthouse living room" },
        { src: "/images/1.jpeg", alt: "Pom PentHouse living room" },
        { src: "/images/2.jpeg", alt: "Pom PentHouse interior" },
      ],
    }},
    { key: "about_settings", value: {
      title: "About POM'S Penthouse",
      subtitle: "",
      text: "POM'S Penthouse provides luxury serviced apartments in Lakeside, Pokhara — offering hotel-level comfort with the privacy and convenience of home.",
      image: "/images/3.jpeg",
      stats: [
        { label: "Residences", value: "12+" },
        { label: "Guest Rating", value: "4.9★" },
        { label: "Countries Hosted", value: "50+" },
      ],
    }},
    { key: "whychoose_settings", value: {
      title: "A new standard for serviced living in Pokhara.",
      subtitle: "Designed for travelers who expect the consistency of a five-star hotel and the soul of a private residence.",
      image: "/images/apt-family.jpg",
      items: [
        { title: "Fully Furnished", desc: "Designer interiors, every detail considered." },
        { title: "High-Speed WiFi", desc: "Fibre-grade connectivity, ideal for remote work." },
        { title: "Housekeeping", desc: "Daily service to keep your stay effortless." },
        { title: "Secure Parking", desc: "Private, 24/7 monitored parking on premises." },
        { title: "Elevator Access", desc: "Every floor reached in quiet comfort." },
        { title: "Flexible Packages", desc: "Daily, weekly and monthly stays — your way." },
        { title: "Mountain Views", desc: "Wake up to the Annapurnas from your window." },
        { title: "Lakeside Location", desc: "Steps from Phewa Lake and Lakeside Marg." },
      ],
    }},
    { key: "amenities_settings", value: {
      title: "Luxury Amenities",
      subtitle: "Everything you'd expect from a premium hotel — quietly built into every apartment.",
      items: [
        { name: "Smart TV" },
        { name: "Air Conditioning" },
        { name: "Equipped Kitchen" },
        { name: "Refrigerator" },
        { name: "Washing Machine" },
        { name: "Private Balcony" },
        { name: "Workspace" },
        { name: "Hot Water" },
        { name: "Backup Power" },
        { name: "Security Cameras" },
        { name: "Elevator Access" },
        { name: "Free Parking" },
      ],
    }},
    { key: "lifestyle_settings", value: {
      items: [
        { title: "Hotel comfort. Home privacy.", body: "Crisp linens, daily housekeeping and a concierge that anticipates — without ever knocking unannounced.", tag: "The Experience", image: "/images/life-balcony.jpg" },
        { title: "Perfect for digital nomads.", body: "Quiet workspaces, fibre WiFi and backup power so deadlines never depend on the city grid.", tag: "Work From Pokhara", image: "/images/405267760.jpg" },
        { title: "Ideal for long-term living.", body: "Monthly rates, utilities included, flexible contracts — designed for stays measured in months, not nights.", tag: "Extended Stays", image: "/images/405915676.jpg" },
        { title: "Designed for modern travelers.", body: "From late check-ins to airport pickups, every touchpoint is curated to feel effortless and discreet.", tag: "Signature Service", image: "/images/405916201.jpg" },
      ],
    }},
    { key: "location_settings", value: {
      title: "Lakeside, Pokhara",
      subtitle: "Tucked between the lake and the mountains — moments from the city's best dining, boating and trails.",
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.7720105159715!2d83.95791376583846!3d28.209697011336996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995952ed26a383f%3A0x9b2bdf424583384a!2sPOM's+Penthouse!5e1!3m2!1sen!2snp!4v1782229596936!5m2!1sen!2snp",
      nearby: [
        { name: "Phewa Lake", distance: "200 m" },
        { name: "Lakeside Market", distance: "350 m" },
        { name: "Tal Barahi Temple", distance: "1.2 km" },
        { name: "Restaurants & Cafes", distance: "300 m" },
        { name: "Sarangkot Viewpoint", distance: "12 km" },
        { name: "Pokhara Airport", distance: "4 km" },
      ],
    }},
    { key: "longterm_settings", value: {
      title: "Weekly & Monthly Stay Packages",
      subtitle: "Built for those who treat Pokhara as more than a stopover.",
      features: ["Fully Furnished", "Utilities Included", "Flexible Contracts", "Better Monthly Rates"],
      items: [
        { title: "Remote Workers", desc: "Tailored stay packages and rates available on request." },
        { title: "Digital Nomads", desc: "Tailored stay packages and rates available on request." },
        { title: "Business Travelers", desc: "Tailored stay packages and rates available on request." },
        { title: "Relocating Families", desc: "Tailored stay packages and rates available on request." },
      ],
      image: "/images/gal-lake.jpg",
    }},
    { key: "offer_settings", value: {
      title: "Ready to Experience Premium Living?",
      subtitle: "Book your luxury serviced apartment today. Our team will respond within the hour.",
      btn_text: "Book Now",
      image: "/images/4.jpeg",
    }},
    { key: "testimonial_settings", value: {
      title: "Loved by guests worldwide",
      widget_id: "a1bde9c4-658b-40a3-ac19-a19822b5bfa6",
      image: "/images/5.jpeg",
    }},
    { key: "gallery_settings", value: {
      title: "Inside POM'S Penthouse",
      subtitle: "A look through the residences, the building and the views that frame them.",
    }},
    { key: "faq_settings", value: {
      title: "Questions",
      items: [
        { q: "Is it freehold?", a: "Yes, full freehold ownership. Ready to transfer." },
        { q: "Can I book nightly stays?", a: "Yes, via Book a Stay. 2-night minimum. Instant request." },
        { q: "How far is the lake really?", a: "180 meters, about a 3-minute walk to Phewa Lake." },
        { q: "Airport transfer?", a: "Yes, रू3,500 add-on at booking. 25 minutes from PKR." },
        { q: "Is the penthouse furnished?", a: "Fully. Linen, ceramics, oak, Sonos — move-in ready." },
      ],
    }},
    { key: "residence_settings", value: {
      items: [
        { name: "3 BHK", image: "/images/6.jpeg", price: "$150", desc: "Spacious three-bedroom apartment with modern living room, fully equipped kitchen, and scenic balcony views.", capacity: "4–6 Guests", area: "120 m²", features: ["3 Bedrooms", "Living Room", "Full Kitchen", "2 Bathrooms"] },
        { name: "2 BHK", image: "/images/7.jpeg", price: "$110", desc: "Comfortable two-bedroom apartment perfect for families, featuring a bright hall and modular kitchen.", capacity: "3–5 Guests", area: "85 m²", features: ["2 Bedrooms", "Living Room", "Full Kitchen", "1 Bathroom"] },
        { name: "1 BHK", image: "/images/8.jpeg", price: "$75", desc: "Cozy one-bedroom apartment with an attached hall and kitchen — ideal for couples or solo travelers.", capacity: "1–3 Guests", area: "55 m²", features: ["1 Bedroom", "Living Room", "Kitchenette", "1 Bathroom"] },
        { name: "Studio Apartment", image: "/images/9.jpeg", price: "$55", desc: "Compact open-plan studio with a kitchenette and smart storage — designed for modern urban living.", capacity: "1–2 Guests", area: "35 m²", features: ["Open Layout", "Kitchenette", "Workspace", "Smart TV"] },
      ],
    }},
    { key: "rooms_settings", value: {
      items: [
        { name: "Single Room — Single Bed", image: "/images/gal-bedroom.jpg", price: "$30", size: "18 m²", beds: "1 Single Bed", view: "Courtyard View", features: ["Single Bed", "Desk", "WiFi", "AC"] },
        { name: "Single Room — Double Bed", image: "/images/10.jpeg", price: "$40", size: "22 m²", beds: "1 Double Bed", view: "Garden View", features: ["Double Bed", "Desk", "WiFi", "Smart TV"] },
        { name: "Single Room — Twin Bed", image: "/images/11.jpeg", price: "$45", size: "24 m²", beds: "2 Single Beds", view: "Mountain View", features: ["2 Singles", "Mini Fridge", "WiFi", "AC"] },
      ],
    }},
    { key: "footer_settings", value: {
      description: "Luxury serviced apartments in Lakeside, Pokhara — hotel comfort with home privacy.",
      facebook: "https://www.facebook.com/poms.penthouse",
      instagram: "https://www.instagram.com/poms_penthouse",
      whatsapp: "https://wa.me/9779840814142",
      contact: {
        address: "Lakeside, Pokhara, Nepal",
        phone: "+977 984-081-4142",
        email: "stay@pomspenthouse.com",
        tagline: "Views of Phewa & Annapurna",
      },
      explore_links: [
        { label: "Apartments", href: "/apartments" },
        { label: "Amenities", href: "/amenities" },
        { label: "Gallery", href: "/gallery" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      residence_links: [
        { label: "3 BHK", href: "/apartments" },
        { label: "2 BHK", href: "/apartments" },
        { label: "1 BHK", href: "/apartments" },
        { label: "Studio Apartment", href: "/apartments" },
        { label: "Single Bed Room", href: "/rooms" },
        { label: "Double Bed Room", href: "/rooms" },
        { label: "Twin Bed Room", href: "/rooms" },
      ],
    }},
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
