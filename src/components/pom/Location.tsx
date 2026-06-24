import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useSettings } from "@/lib/hooks";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

export function Location() {
  const { data: settings } = useSettings();
  const loc = settings?.location_settings || {};
  const title = loc.title || "Lakeside, Pokhara";
  const subtitle = loc.subtitle || "Tucked between the lake and the mountains — moments from the city's best dining, boating and trails.";
  const mapUrl = loc.map_url || "";
  const nearby = loc.nearby || [];

  return (
    <section id="location" className="bg-luxury-black py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />The Location<span className="h-px w-8 bg-gold" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p variants={fadeUp} className="mt-5 text-base text-white/70">{subtitle}</motion.p>
          )}
        </motion.div>
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {mapUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9 }}
              className="relative h-80 overflow-hidden border border-white/10 sm:h-96 lg:h-full"
            >
              <iframe
                title="Map"
                src={mapUrl}
                className="h-full w-full"
                style={{ colorScheme: "light" }}
                loading="lazy"
              />
            </motion.div>
          )}
          {nearby.length > 0 && (
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              <motion.h3 variants={fadeUp} className="font-display text-3xl text-white sm:text-4xl">Nearby Attractions</motion.h3>
              <motion.p variants={fadeUp} className="mt-4 max-w-lg text-white/65">
                Step out of the building and you're already where everyone else came to be.
              </motion.p>
              <motion.ul variants={stagger} className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {nearby.map((n: any) => (
                  <motion.li key={n.name} variants={fadeUp} className="flex items-center justify-between py-5">
                    <div className="flex items-center gap-4">
                      <MapPin className="size-4 text-gold" />
                      <span className="font-display text-lg">{n.name}</span>
                    </div>
                    <span className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">{n.distance}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
