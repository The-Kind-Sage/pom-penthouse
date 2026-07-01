import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2, label }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const durationMs = duration * 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOutExpo * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group text-center"
    >
      <div className="relative inline-block">
        <span className="font-display text-5xl font-medium text-luxury-black dark:text-white sm:text-6xl md:text-7xl">
          {prefix}
          {count}
          {suffix}
        </span>

        {/* Subtle gold glow behind number */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-30">
          <span className="font-display text-5xl font-medium text-gold sm:text-6xl md:text-7xl">
            {prefix}
            {count}
            {suffix}
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export { AnimatedCounter };
