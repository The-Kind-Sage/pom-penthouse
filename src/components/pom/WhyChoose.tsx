import { motion } from "framer-motion";
import whyImg from "@/assets/home.jpg";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const WHY = [
  ["Fully Furnished", "Designer interiors, every detail considered."],
  ["High-Speed WiFi", "Fibre-grade connectivity, ideal for remote work."],
  ["Housekeeping", "Daily service to keep your stay effortless."],
  ["Secure Parking", "Private, 24/7 monitored parking on premises."],
  ["Elevator Access", "Every floor reached in quiet comfort."],
  ["Flexible Packages", "Daily, weekly and monthly stays — your way."],
  ["Mountain Views", "Wake up to the Annapurnas from your window."],
  ["Lakeside Location", "Steps from Phewa Lake and Lakeside Marg."],
];

export function WhyChoose() {
  return (
    <section className="bg-muted py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
          className="relative"
        >
          <div className="relative overflow-hidden">
            <img src={whyImg} alt="POM'S Penthouse building exterior" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 border border-gold bg-background p-5 sm:block">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="font-display text-3xl text-gold">12+</span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Premium Units</span>
            </div>
          </div>
        </motion.div>

        <div>
          <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Why POM&apos;S Penthouse
          </div>
          <h2 className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            A new standard for <span className="italic text-gold">serviced living</span> in Pokhara.
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Designed for travelers who expect the consistency of a five-star hotel and the
            soul of a private residence.
          </p>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="mt-10 grid gap-x-6 gap-y-5 sm:grid-cols-2"
          >
            {WHY.map(([t, d]) => (
              <motion.div key={t} variants={fadeUp} className="group flex gap-4 border-l border-border pl-4 transition hover:border-gold">
                <div className="mt-1 size-1.5 shrink-0 rounded-full bg-gold" />
                <div>
                  <h4 className="font-display text-base font-semibold text-luxury-black">{t}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
