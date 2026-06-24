import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ui } from "@/lib/ui-store";
import { useSettings } from "@/lib/hooks";

export function Hero() {
  const { data: settings } = useSettings();
  const heroSettings = settings?.hero_settings || {};
  const heroSlides = heroSettings.slides || [];
  const title = settings?.hero_title || "Pom PentHouse";
  const subtitle = settings?.hero_subtitle || "A Lakeside Sanctuary — 180 meters from Phewa Lake";
  const tagline = heroSettings.tagline || "Pokhara, Nepal";
  const badge = heroSettings.badge || "Freehold";
  const btnPrimary = heroSettings.btn_primary || "Schedule a Private Viewing";
  const btnSecondary = heroSettings.btn_secondary || "Book a Stay";

  const slides = heroSlides.length > 0
    ? heroSlides.map((s: any, idx: number) => ({ id: idx, src: s.src, alt: s.alt || `Slide ${idx + 1}` }))
    : [];

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length === 0) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden flex items-end pb-24 lg:pb-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.length > 0 ? slides.map((s: any, idx: number) => (
        <motion.div
          key={s.id}
          aria-hidden={i !== idx}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === idx ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={s.src}
            alt={s.alt}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
            className="object-cover w-full h-full"
          />
        </motion.div>
      )) : (
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-luxury-black/95 to-luxury-black" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/25" />
      <div className="absolute inset-0 film-grain" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1200px] w-full px-6 lg:px-12 text-[var(--off-white)]">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[640px]"
        >
          <p className="eyebrow text-[var(--gold-soft)] mb-5">{tagline}</p>
          <h1 className="display-xl text-[var(--off-white)]">{title}</h1>
          <p className="accent-italic text-xl md:text-2xl mt-4 opacity-90">
            {subtitle}
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--gold)]/60 backdrop-blur bg-white/10 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            {badge}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/contact" className="btn-primary">
              {btnPrimary}
            </a>
            <button onClick={ui.openBooking} className="btn-ghost text-[var(--off-white)]">
              {btnSecondary}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-6 lg:left-12 z-10 text-[var(--off-white)] flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
        <span>Scroll</span>
        <span className="block w-px h-12 bg-[var(--off-white)]/70 origin-top animate-[scroll-line_2.4s_ease-in-out_infinite]" />
      </div>

      {slides.length > 0 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {slides.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "w-5 bg-[var(--gold)]" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
