import { motion } from "framer-motion";
import { Bed, Square, ArrowRight } from "lucide-react";
import aptExec from "@/assets/apt-executive.jpg";
import aptStudio from "@/assets/apt-studio.jpg";
import aptFamily from "@/assets/apt-family.jpg";
import aptPent from "@/assets/apt-penthouse.jpg";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

function openBooking(room?: string) {
  window.dispatchEvent(new CustomEvent("poms:open-booking", { detail: room }));
}

const ROOMS = [
  { name: "Mountain View King Room", img: aptExec, price: "रू55", size: "26 m²", beds: "1 King Bed", view: "Annapurna View", features: ["King Bed", "Smart TV", "Workspace", "En-suite Bath"] },
  { name: "Twin Comfort Room", img: aptStudio, price: "रू48", size: "24 m²", beds: "2 Single Beds", view: "Garden View", features: ["2 Singles", "Mini Fridge", "Smart TV", "AC"] },
  { name: "Deluxe Double Room", img: aptFamily, price: "रू70", size: "30 m²", beds: "1 Queen Bed", view: "Lakeside View", features: ["Queen Bed", "Lounge Chair", "Smart TV", "Rain Shower"] },
  { name: "Premier Lake View Room", img: aptPent, price: "रू90", size: "34 m²", beds: "1 King Bed", view: "Phewa Lake View", features: ["King Bed", "Balcony", "Bathtub", "Premium Linen"] },
  { name: "Family Triple Room", img: aptFamily, price: "रू110", size: "40 m²", beds: "1 Queen + 1 Single", view: "Mountain View", features: ["Sleeps 3", "Wardrobe", "Tea/Coffee", "AC"] },
  { name: "Penthouse Master Room", img: aptPent, price: "रू160", size: "46 m²", beds: "1 King Bed", view: "Panoramic View", features: ["Private Terrace", "Soaking Tub", "Lounge", "Premium Service"] },
];

export function Rooms() {
  return (
    <section id="rooms" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Our Rooms<span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            Choose Your <span className="italic text-gold">Room</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Individual rooms for shorter stays — refined, comfortable, and ready when you are.
          </p>
        </div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}
          className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ROOMS.map((r) => (
            <motion.article
              key={r.name} variants={fadeUp}
              className="group flex flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_30px_60px_-25px_rgba(17,17,17,0.35)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={r.img} alt={r.name} loading="lazy" className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/75 via-luxury-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-luxury-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-md">
                  {r.view}
                </span>
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <h3 className="font-display text-xl font-medium">{r.name}</h3>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-white/85">
                    <span className="inline-flex items-center gap-1"><Bed className="size-3 text-gold" />{r.beds}</span>
                    <span className="inline-flex items-center gap-1"><Square className="size-3 text-gold" />{r.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-1.5">
                  {r.features.map((f) => (
                    <span key={f} className="rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] text-luxury-black/75">{f}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">From</span>
                    <span className="font-display text-lg text-luxury-black">{r.price}<span className="ml-1 text-xs text-muted-foreground">/ night</span></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openBooking(r.name)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-luxury-black px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-luxury-black"
                  >
                    Book Now <ArrowRight className="size-3" />
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
