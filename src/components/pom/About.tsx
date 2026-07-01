import { motion, useScroll, useTransform } from "framer-motion";
import { useSettings } from "@/lib/hooks";
import aboutBg from "@/assets/8.jpeg";
import { useRef } from "react";
import { fadeUp } from "@/lib/animations";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };

export function About() {
  const { data: settings } = useSettings();
  const about = settings?.about_settings || {};
  const title = about.title || "About POM'S Penthouse";
  const text = about.text || "POM'S Penthouse provides luxury serviced apartments in Lakeside, Pokhara — offering hotel-level comfort with the privacy and convenience of home.";
  const stats = about.stats || [{ label: "Residences", value: "12+" }, { label: "Guest Rating", value: "4.9★" }, { label: "Countries Hosted", value: "50+" }];
  const bgImg = aboutBg;

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} id="about" className="relative py-24 sm:py-32 overflow-hidden isolate">
      <div className="absolute inset-0">
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          <img src={bgImg} alt="" className="size-full object-cover blur-sm scale-110" />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />About Us<span className="h-px w-8 bg-gold" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-4xl font-medium leading-tight text-white sm:text-5xl [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
            {title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-8 text-lg leading-relaxed text-white/85 [text-shadow:0_1px_15px_rgba(0,0,0,0.6)]">{text}</motion.p>
          <motion.div variants={fadeUp} className="mt-12 grid grid-cols-3 divide-x divide-white/20 border-y border-white/20 py-8 backdrop-blur-sm bg-black/20 rounded-xl">
            {stats.map((s: any) => (
              <div key={s.label} className="px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-3xl text-gold sm:text-4xl"
                >
                  {s.value}
                </motion.div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/70">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
