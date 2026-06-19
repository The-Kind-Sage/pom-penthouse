import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { photo } from "@/lib/images";
import { ui } from "@/lib/ui-store";

export function Offer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const p20 = photo(20);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-48 text-[var(--sand)]"
      style={{ background: "var(--charcoal)" }}
    >
      {/* Photo 20/20 — Parallax + Liquid Smooth background */}
      <motion.img
        src={p20.src}
        alt={p20.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 object-cover w-full h-[130%] opacity-[0.36]"
        style={{ y }}
      />
      <div className="absolute inset-0 bg-[var(--charcoal)]/50" />
      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        <p className="eyebrow mb-5">Freehold</p>
        <h2 className="display-xl mb-3">Pom PentHouse</h2>
        <p className="font-display text-5xl text-[var(--gold)]">Freehold</p>
        <p className="mt-6 opacity-80">Ready to move · Full ownership · Lakeside Road, Pokhara</p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <button onClick={ui.openBooking} className="btn-primary">
            Book a Stay
          </button>
          <a href="#contact" className="btn-ghost text-[var(--sand)]">
            Purchase Inquiry
          </a>
        </div>
        <p className="mt-6 text-sm opacity-60 accent-italic">
          Prefer to try before you buy? Book a stay from $189/night.
        </p>
      </div>
    </section>
  );
}
