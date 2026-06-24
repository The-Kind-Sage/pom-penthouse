import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ui } from "@/lib/ui-store";
import hero1 from "@/assets/1.jpeg";
import hero2 from "@/assets/2.jpeg";
import hero3 from "@/assets/3.jpeg";
import hero4 from "@/assets/4.jpeg";
import hero5 from "@/assets/5.jpeg";
import hero6 from "@/assets/6.jpeg";
import hero7 from "@/assets/7.jpeg";
import hero8 from "@/assets/8.jpeg";
import hero9 from "@/assets/9.jpeg";
import hero10 from "@/assets/10.jpeg";
import hero11 from "@/assets/11.jpeg";
import hero12 from "@/assets/12.jpeg";
import hero13 from "@/assets/13.jpeg";
import heroHome from "@/assets/home.jpg";

const slides = [
  { id: 1, src: hero1, alt: "POM'S Penthouse Exterior" },
  { id: 2, src: hero2, alt: "POM'S Penthouse Interior" },
  { id: 3, src: hero3, alt: "Luxury Living Room" },
  { id: 4, src: hero4, alt: "Modern Kitchen" },
  { id: 5, src: hero5, alt: "Cozy Bedroom" },
  { id: 6, src: hero6, alt: "Spacious Hall" },
  { id: 7, src: hero7, alt: "Balcony View" },
  { id: 8, src: hero8, alt: "Bathroom" },
  { id: 9, src: hero9, alt: "Lake View" },
  { id: 10, src: hero10, alt: "Mountain View" },
  { id: 11, src: hero11, alt: "Pokhara City" },
  { id: 12, src: hero12, alt: "Penthouse Suite" },
  { id: 13, src: hero13, alt: "Dining Area" },
  { id: 14, src: heroHome, alt: "POM'S Penthouse Home" },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden flex items-end pb-24 lg:pb-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, idx) => (
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
            Freehold
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/contact" className="btn-primary">
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

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "w-5 bg-[var(--gold)]" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
