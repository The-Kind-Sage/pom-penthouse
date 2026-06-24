import { motion } from "framer-motion";
import { useSettings } from "@/lib/hooks";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

export function WhyChoose() {
  const { data: settings } = useSettings();
  const wc = settings?.whychoose_settings || {};
  const title = wc.title || "A new standard for serviced living in Pokhara.";
  const subtitle = wc.subtitle || "Designed for travelers who expect the consistency of a five-star hotel and the soul of a private residence.";
  const items = wc.items || [
    { title: "Fully Furnished", desc: "Designer interiors, every detail considered." },
    { title: "High-Speed WiFi", desc: "Fibre-grade connectivity, ideal for remote work." },
    { title: "Housekeeping", desc: "Daily service to keep your stay effortless." },
    { title: "Secure Parking", desc: "Private, 24/7 monitored parking on premises." },
    { title: "Elevator Access", desc: "Every floor reached in quiet comfort." },
    { title: "Flexible Packages", desc: "Daily, weekly and monthly stays — your way." },
    { title: "Mountain Views", desc: "Wake up to the Annapurnas from your window." },
    { title: "Lakeside Location", desc: "Steps from Phewa Lake and Lakeside Marg." },
  ];
  const imgSrc = wc.image || "";

  return (
    <section className="bg-muted py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
        {imgSrc && (
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img src={imgSrc} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
          </motion.div>
        )}

        <div>
          <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Why POM&apos;S Penthouse
          </div>
          <h2 className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">{subtitle}</p>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="mt-10 grid gap-x-6 gap-y-5 sm:grid-cols-2"
          >
            {items.map((item: any) => (
              <motion.div key={item.title} variants={fadeUp} className="group flex gap-4 border-l border-border pl-4 transition hover:border-gold">
                <div className="mt-1 size-1.5 shrink-0 rounded-full bg-gold" />
                <div>
                  <h4 className="font-display text-base font-semibold text-luxury-black">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
