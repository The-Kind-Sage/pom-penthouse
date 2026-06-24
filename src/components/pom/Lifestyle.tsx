import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import galBedroom from "@/assets/gal-bedroom.jpg";
import lifeNomad from "@/assets/395344844.jpg";
import lifeBalcony from "@/assets/life-balcony.jpg";
import travelImg from "@/assets/405915699.jpg";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const LIFESTYLE = [
  { title: "Hotel comfort. Home privacy.", body: "Crisp linens, daily housekeeping and a concierge that anticipates — without ever knocking unannounced.", img: galBedroom, tag: "The Experience" },
  { title: "Perfect for digital nomads.", body: "Quiet workspaces, fibre WiFi and backup power so deadlines never depend on the city grid.", img: lifeNomad, tag: "Work From Pokhara" },
  { title: "Ideal for long-term living.", body: "Monthly rates, utilities included, flexible contracts — designed for stays measured in months, not nights.", img: lifeBalcony, tag: "Extended Stays" },
  { title: "Designed for modern travelers.", body: "From late check-ins to airport pickups, every touchpoint is curated to feel effortless and discreet.", img: travelImg, tag: "Signature Service" },
];

export function Lifestyle() {
  return (
    <section className="bg-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl space-y-24 px-6 sm:space-y-32">
        {LIFESTYLE.map((item, i) => {
          const reverse = i % 2 === 1;
          return (
            <div key={item.title} className={`grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}
                className="overflow-hidden"
              >
                <img src={item.img} alt={item.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </motion.div>
              <motion.div
                initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}
              >
                <motion.span variants={fadeUp} className="text-[10px] uppercase tracking-[0.4em] text-gold">{item.tag}</motion.span>
                <motion.h3 variants={fadeUp} className="mt-4 font-display text-3xl font-medium leading-tight text-luxury-black sm:text-4xl lg:text-5xl">
                  {item.title}
                </motion.h3>
                <motion.p variants={fadeUp} className="mt-5 max-w-lg text-muted-foreground">{item.body}</motion.p>
                <motion.a variants={fadeUp} href="/contact" className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-luxury-black transition hover:text-gold">
                  Enquire Now <ArrowRight className="size-4" />
                </motion.a>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
