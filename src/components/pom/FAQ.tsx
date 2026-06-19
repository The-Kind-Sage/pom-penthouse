import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Is it freehold?", a: "Yes, full freehold ownership. Ready to transfer." },
  { q: "Can I book nightly stays?", a: "Yes, via Book a Stay. 2-night minimum. Instant request." },
  { q: "How far is the lake really?", a: "180 meters, about a 3-minute walk to Phewa Lake." },
  { q: "Airport transfer?", a: "Yes, $25 add-on at booking. 25 minutes from PKR." },
  { q: "Is the penthouse furnished?", a: "Fully. Linen, ceramics, oak, Sonos — move-in ready." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 max-w-[720px] mx-auto px-6">
      <p className="eyebrow text-center mb-5">FAQ</p>
      <h2 className="h1-lux text-center mb-12">Questions</h2>
      <ul className="divide-y border-y">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left gap-6"
                aria-expanded={isOpen}
              >
                <span className="font-display text-xl md:text-2xl">{f.q}</span>
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 opacity-80">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
