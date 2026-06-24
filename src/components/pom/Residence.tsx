import { motion } from "framer-motion";
import { Users, Square, ArrowRight } from "lucide-react";
import { useSettings } from "@/lib/hooks";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

function openBooking(apartment?: string) {
  window.dispatchEvent(new CustomEvent("poms:open-booking", { detail: apartment }));
}

export function Residence() {
  const { data: settings } = useSettings();
  const aptData = settings?.residence_settings || {};
  const apartments = aptData.items || [
    { name: "3 BHK", image: "", price: "$150", desc: "Spacious three-bedroom apartment with modern living room, fully equipped kitchen, and scenic balcony views.", capacity: "4–6 Guests", area: "120 m²", features: ["3 Bedrooms", "Living Room", "Full Kitchen", "2 Bathrooms"] },
    { name: "2 BHK", image: "", price: "$110", desc: "Comfortable two-bedroom apartment perfect for families, featuring a bright hall and modular kitchen.", capacity: "3–5 Guests", area: "85 m²", features: ["2 Bedrooms", "Living Room", "Full Kitchen", "1 Bathroom"] },
    { name: "1 BHK", image: "", price: "$75", desc: "Cozy one-bedroom apartment with an attached hall and kitchen — ideal for couples or solo travelers.", capacity: "1–3 Guests", area: "55 m²", features: ["1 Bedroom", "Living Room", "Kitchenette", "1 Bathroom"] },
    { name: "Studio Apartment", image: "", price: "$55", desc: "Compact open-plan studio with a kitchenette and smart storage — designed for modern urban living.", capacity: "1–2 Guests", area: "35 m²", features: ["Open Layout", "Kitchenette", "Workspace", "Smart TV"] },
  ];

  return (
    <section id="apartments" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />The Residences<span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            Featured <span className="italic text-gold">Apartments</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Four thoughtfully designed residences to suit every need — from studio living to family comfort.
          </p>
        </div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
        >
          {apartments.map((a: any) => (
            <motion.article
              key={a.name} variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-[2px] border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-30px_rgba(17,17,17,0.4)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={a.image || ""} alt={a.name} loading="lazy" className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/10 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-gold/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black">
                  Available
                </span>
                <span className="absolute right-5 top-5 flex items-baseline gap-1 rounded-full border border-white/30 bg-luxury-black/40 px-3 py-1 text-white backdrop-blur-md">
                  <span className="font-display text-base">{a.price}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">/ night</span>
                </span>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                  <h3 className="font-display text-2xl font-medium sm:text-3xl">{a.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-white/85">
                    <span className="inline-flex items-center gap-1"><Users className="size-3.5 text-gold" />{a.capacity}</span>
                    <span className="inline-flex items-center gap-1"><Square className="size-3.5 text-gold" />{a.area}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {a.features?.map((f: string) => (
                    <span key={f} className="rounded-full border border-border bg-muted px-3 py-1 text-[11px] text-luxury-black/80">{f}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">From</span>
                    <span className="font-display text-xl text-luxury-black">{a.price}<span className="ml-1 text-xs text-muted-foreground">/ night</span></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openBooking(a.name)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-luxury-black px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-black"
                  >
                    Book Now <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
