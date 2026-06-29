import { motion } from "framer-motion";
import { MapPin, Navigation, Plane } from "lucide-react";
import { useSettings } from "@/lib/hooks";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const icons: Record<string, typeof MapPin> = {
  "Phewa Lake": Navigation,
  "Pokhara Airport": Plane,
  default: MapPin,
};

export function Location() {
  const { data: settings } = useSettings();
  const loc = settings?.location_settings || {};
  const title = loc.title || "Lakeside, Pokhara";
  const subtitle = loc.subtitle || "Tucked between the lake and the mountains — moments from the city's best dining, boating and trails.";
  const mapUrl = loc.map_url || "";
  const nearby = loc.nearby || [
    { name: "Phewa Lake", distance: "200 m" },
    { name: "Lakeside Market", distance: "350 m" },
    { name: "Tal Barahi Temple", distance: "1.2 km" },
    { name: "Restaurants & Cafes", distance: "300 m" },
    { name: "Sarangkot Viewpoint", distance: "12 km" },
    { name: "Pokhara Airport", distance: "4 km" },
  ];

  return (
    <section id="location" className="relative overflow-hidden bg-luxury-black">
      <div className="absolute inset-0">
        <img
          src="/images/life-balcony.jpg"
          alt=""
          className="size-full object-cover opacity-30"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-black/90 to-luxury-black" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
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
            <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-white/80">{subtitle}</motion.p>
          )}
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {mapUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9 }}
              className="relative overflow-hidden rounded-2xl border border-white/10"
            >
              <div className="aspect-[4/3] sm:aspect-video lg:aspect-[4/3]">
                <iframe
                  title="Map"
                  src={mapUrl}
                  className="h-full w-full"
                  style={{ colorScheme: "light" }}
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="size-4 text-gold" />
                  <span className="text-sm font-medium">POM&apos;S Penthouse, Lakeside</span>
                </div>
              </div>
            </motion.div>
          )}

          {nearby.length > 0 && (
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              <motion.h3 variants={fadeUp} className="font-display text-3xl text-white sm:text-4xl">Nearby Attractions</motion.h3>
              <motion.p variants={fadeUp} className="mt-4 max-w-lg text-white/70">
                Step out and you&apos;re already where everyone else came to be.
              </motion.p>
              <motion.div variants={stagger} className="mt-8 grid gap-3 sm:grid-cols-2">
                {nearby.map((n: any) => {
                  const Icon = icons[n.name] || icons.default;
                  return (
                    <motion.div
                      key={n.name} variants={fadeUp}
                      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-gold/40 hover:bg-white/10"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-sm font-medium text-white">{n.name}</div>
                        <div className="mt-0.5 text-xs text-gold">{n.distance}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
