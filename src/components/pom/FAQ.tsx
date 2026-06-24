import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useSettings } from "@/lib/hooks";

export function FAQ() {
  const { data: settings } = useSettings();
  const faq = settings?.faq_settings || {};
  const title = faq.title || "Questions";
  const faqs = faq.items || [
    { q: "Is it freehold?", a: "Yes, full freehold ownership. Ready to transfer." },
    { q: "Can I book nightly stays?", a: "Yes, via Book a Stay. 2-night minimum. Instant request." },
  ];

  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-background py-24">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-8 bg-gold" />FAQ<span className="h-px w-8 bg-gold" />
        </div>
        <h2 className="font-display text-center text-4xl font-medium leading-tight text-luxury-black sm:text-5xl mb-12">{title}</h2>
        <ul className="divide-y border-y border-border">
          {faqs.map((f: any, i: number) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center py-5 text-left gap-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl md:text-2xl text-luxury-black">{f.q}</span>
                  {isOpen ? <Minus size={18} className="text-gold shrink-0" /> : <Plus size={18} className="text-gold shrink-0" />}
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
                      <p className="pb-5 text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
