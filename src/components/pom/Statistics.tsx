import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/three/AnimatedCounter";

function Statistics() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Our Legacy
            <span className="h-px w-8 bg-gold/50" />
          </span>
          <h2 className="mt-4 font-display text-4xl font-medium text-luxury-black dark:text-white sm:text-5xl">
            Trusted by <span className="italic text-gold">Guests</span> Worldwide
          </h2>
        </motion.div>

        {/* Statistics grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <AnimatedCounter
            end={12}
            suffix="+"
            label="Luxury Residences"
            duration={2}
          />
          <AnimatedCounter
            end={98}
            suffix="%"
            label="Guest Satisfaction"
            duration={2.5}
          />
          <AnimatedCounter
            end={50}
            suffix="+"
            label="Countries Hosted"
            duration={2}
          />
          <AnimatedCounter
            end={5}
            label="Years of Excellence"
            duration={1.8}
          />
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Where luxury meets authenticity — creating unforgettable experiences since 2019
        </motion.p>
      </div>
    </section>
  );
}

export { Statistics };
