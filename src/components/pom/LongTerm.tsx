import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Wifi, Star, Bed, Check, Home } from "lucide-react";
import { useSettings } from "@/lib/hooks";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const ICONS: Record<string, any> = { "Remote Workers": Briefcase, "Digital Nomads": Wifi, "Business Travelers": Star, "Relocating Families": Bed };

function openBooking() {
  window.dispatchEvent(new CustomEvent("poms:open-booking"));
}

export function LongTerm() {
  const { data: settings } = useSettings();
  const lt = settings?.longterm_settings || {};
  const title = lt.title || "Weekly & Monthly Stay Packages";
  const subtitle = lt.subtitle || "Built for those who treat Pokhara as more than a stopover.";
  const features = lt.features || ["Fully Furnished", "Utilities Included", "Flexible Contracts", "Better Monthly Rates"];
  const items = lt.items || [];
  const bgImg = lt.image || "/images/gal-bedroom.jpg";

  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
              <span className="h-px w-8 bg-gold" />Stay Longer, Live Better
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
              {title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-lg text-muted-foreground">{subtitle}</motion.p>

            <motion.div variants={stagger} className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((b: string) => (
                <motion.div
                  key={b} variants={fadeUp}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <Check className="size-4" />
                  </div>
                  <span className="text-sm font-medium text-luxury-black">{b}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <button
                onClick={openBooking}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-black transition hover:brightness-110"
              >
                Request Long-Term Pricing <ArrowRight className="size-4" />
              </button>
            </motion.div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <img src={bgImg} alt="Long term stay" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="flex size-10 items-center justify-center rounded-full bg-gold/25">
                    <Home className="size-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Your Home in Pokhara</div>
                    <div className="text-xs text-white/60">Live like a local, not a tourist</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -bottom-6 -right-4 left-4 rounded-xl border border-border bg-background p-4 shadow-xl sm:right-6 sm:left-auto sm:w-64"
              >
                <div className="grid grid-cols-2 gap-3">
                  {items.slice(0, 4).map((item: any) => {
                    const Icon = ICONS[item.title] || Briefcase;
                    return (
                      <div key={item.title} className="flex items-center gap-2">
                        <Icon className="size-3.5 text-gold" />
                        <span className="text-xs font-medium text-luxury-black">{item.title}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
