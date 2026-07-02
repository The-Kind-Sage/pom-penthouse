import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSettings } from "@/lib/hooks";
import { useRef } from "react";
import { fadeUp, stagger } from "@/lib/animations";

const fallbackItems = [
  {
    tag: "The Space",
    title: "Designed for Modern Living",
    body: "Every detail has been thoughtfully curated to create a space that feels like home from the moment you step inside. From the custom Italian furniture to the panoramic windows framing the lakeside, this is luxury redefined.",
    image: "/images/lifestyle-1.jpg"
  },
  {
    tag: "The Experience",
    title: "Where Comfort Meets Elegance",
    body: "Wake up to breathtaking views of Phewa Lake and the Annapurna range. Our residences blend contemporary design with warm Nepali hospitality to create an unforgettable stay.",
    image: "/images/lifestyle-2.jpg"
  }
];

export function Lifestyle() {
  const { data: settings } = useSettings();
  const life = settings?.lifestyle_settings || {};
  const items = life.items?.length > 0 ? life.items : fallbackItems;

  if (items.length === 0) return null;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-muted" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl space-y-24 px-6 sm:space-y-32">
        {items.map((item: any, i: number) => {
          const reverse = i % 2 === 1;
          return (
            <div key={item.title || i} className={`grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              {item.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}
                  className="overflow-hidden rounded-2xl"
                >
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6 }}
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </motion.div>
              )}
              <motion.div
                initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}
              >
                <motion.span variants={fadeUp} className="text-[10px] uppercase tracking-[0.4em] text-gold">{item.tag}</motion.span>
                <motion.h3 variants={fadeUp} className="mt-4 font-display text-3xl font-medium leading-tight text-luxury-black sm:text-4xl lg:text-5xl">
                  {item.title}
                </motion.h3>
                <motion.p variants={fadeUp} className="mt-5 max-w-lg text-muted-foreground leading-relaxed">{item.body}</motion.p>
                <motion.div variants={fadeUp} className="mt-8">
                  <motion.a
                    whileHover={{ x: 4 }}
                    href="/contact" className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-luxury-black transition hover:text-gold"
                  >
                    Enquire Now
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
