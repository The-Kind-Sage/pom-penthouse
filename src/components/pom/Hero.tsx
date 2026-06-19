import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ui } from "@/lib/ui-store";
import { IMAGES, photo } from "@/lib/images";

const slides = [photo(1), photo(2), photo(3)];

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden flex items-end pb-24 lg:pb-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Photo 1/20 — Crossfade */}
      {/* Photo 2/20 — Ken Burns */}
      {/* Photo 3/20 — Crossfade */}
      {slides.map((s, idx) => (
        <motion.div
          key={s.id + "-" + idx}
          aria-hidden={i !== idx}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === idx ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={s.src}
            alt={s.alt}
            loading="eager"
            decoding="async"
            className={`object-cover w-full h-full ${idx === 1 ? "kenburns" : ""}`}
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/25" />
      <div className="absolute inset-0 film-grain" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1200px] w-full px-6 lg:px-12 text-[var(--off-white)]">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[640px]"
        >
          <p className="eyebrow text-[var(--gold-soft)] mb-5">Pokhara, Nepal</p>
          <h1 className="display-xl text-[var(--off-white)]">Pom PentHouse</h1>
          <p className="accent-italic text-xl md:text-2xl mt-4 opacity-90">
            A Lakeside Sanctuary — 180 meters from Phewa Lake
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--gold)]/60 backdrop-blur bg-white/10 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            $50,000 USD · Freehold
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Schedule a Private Viewing
            </a>
            <button onClick={ui.openBooking} className="btn-ghost text-[var(--off-white)]">
              Book a Stay
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-6 lg:left-12 z-10 text-[var(--off-white)] flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
        <span>Scroll</span>
        <span className="block w-px h-12 bg-[var(--off-white)]/70 origin-top animate-[scroll-line_2.4s_ease-in-out_infinite]" />
      </div>

      <div className="absolute bottom-8 right-6 lg:right-12 z-10 text-[var(--off-white)]/90 text-xs tracking-[0.2em] tabular-nums">
        {String(i + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-[var(--gold)]" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
