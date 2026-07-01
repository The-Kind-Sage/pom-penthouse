import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSettings } from "@/lib/hooks";
import { LuxuryRoomCard } from "@/components/three/LuxuryRoomCard";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

function openBooking(apartment?: string, image?: string) {
  window.dispatchEvent(new CustomEvent("poms:open-booking", { detail: { name: apartment, image } }));
}

export function Residence() {
  const { data: settings } = useSettings();
  const aptData = settings?.residence_settings || {};
  const apartments = aptData.items || [
    { name: "3 BHK", images: ["/images/apartment-3bhk.jpg"], price: "$150", desc: "Spacious three-bedroom apartment with modern living room, fully equipped kitchen, and scenic balcony views.", capacity: "4–6 Guests", area: "120 m²", features: ["3 Bedrooms", "Living Room", "Full Kitchen", "2 Bathrooms"] },
    { name: "2 BHK", images: ["/images/apartment-2bhk.jpg"], price: "$110", desc: "Comfortable two-bedroom apartment perfect for families, featuring a bright hall and modular kitchen.", capacity: "3–5 Guests", area: "85 m²", features: ["2 Bedrooms", "Living Room", "Full Kitchen", "1 Bathroom"] },
    { name: "1 BHK", images: ["/images/apartment-1bhk.jpg"], price: "$75", desc: "Cozy one-bedroom apartment with an attached hall and kitchen — ideal for couples or solo travelers.", capacity: "1–3 Guests", area: "55 m²", features: ["1 Bedroom", "Living Room", "Kitchenette", "1 Bathroom"] },
    { name: "Studio Apartment", images: ["/images/apartment-studio.jpg"], price: "$55", desc: "Compact open-plan studio with a kitchenette and smart storage — designed for modern urban living.", capacity: "1–2 Guests", area: "35 m²", features: ["Open Layout", "Kitchenette", "Workspace", "Smart TV"] },
  ];

  return (
    <section id="apartments" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />The Residences<span className="h-px w-8 bg-gold" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            Featured <span className="italic text-gold">Apartments</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-5 text-muted-foreground">
            Four thoughtfully designed residences to suit every need — from studio living to family comfort.
          </motion.p>
        </div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}
          className="mt-16 perspective-1200 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {apartments.map((a: any, i: number) => (
            <motion.div key={a.name} variants={fadeUp}>
              <LuxuryRoomCard
                image={a.images?.[0] || a.image || "/images/placeholder.jpg"}
                title={a.name}
                description={a.desc}
                price={`${a.price}/night`}
                features={a.features || []}
                onBook={() => openBooking(a.name, a.images?.[0])}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
