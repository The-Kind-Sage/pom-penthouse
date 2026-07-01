import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useSettings } from "@/lib/hooks";

function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const { data: settings } = useSettings();
  const heroSettings = settings?.hero_settings || {};
  const heroSlides = heroSettings.slides || [];
  const title = settings?.hero_title || "POM'S Penthouse";
  const subtitle = settings?.hero_subtitle || "A Lakeside Sanctuary — 180 meters from Phewa Lake";
  const tagline = heroSettings.tagline || "Pokhara, Nepal";
  const badge = heroSettings.badge || "Freehold";

  const slides = heroSlides.length > 0
    ? heroSlides.map((s: any, idx: number) => ({ id: idx, src: s.src, alt: s.alt || `Slide ${idx + 1}` }))
    : [
        { id: 0, src: "/images/dip.webp", alt: "POM'S Penthouse exterior" },
        { id: 1, src: "/images/1.jpeg", alt: "POM'S Penthouse living room" },
        { id: 2, src: "/images/2.jpeg", alt: "POM'S Penthouse interior" },
      ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 20 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = ((e.clientX - centerX) / centerX) * 5;
      const y = ((e.clientY - centerY) / centerY) * 5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-screen w-full overflow-hidden bg-luxury-black"
    >
      {/* Background images with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {slides.map((slide: { id: number; src: string; alt: string }, idx: number) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === idx ? 1 : 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={slide.src}
              alt={slide.alt}
              className="size-full object-cover"
              style={{
                scale: 1.1,
                x: parallaxX,
                y: parallaxY,
              }}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-luxury-black/70 via-luxury-black/30 to-luxury-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-luxury-black/50 via-transparent to-luxury-black/50" />

      {/* Golden glow effect */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-[150px]" />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ y: textY, opacity }}
      >
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-gold">
            <span className="h-px w-8 bg-gold/50" />
            {tagline}
            <span className="h-px w-8 bg-gold/50" />
          </span>
        </motion.div>

        {/* Title - word by word reveal */}
        <motion.h1
          className="font-display text-5xl font-medium leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          {title.split(" ").map((word: string, i: number) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4 + i * 0.12,
              }}
              className="inline-block"
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          className="mt-6 max-w-xl text-base text-white/70 sm:text-lg md:text-xl"
        >
          {subtitle}
        </motion.p>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 backdrop-blur-sm"
        >
          <span className="size-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-xs font-medium text-gold">{badge}</span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("poms:open-booking"))}
            className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-black transition-all duration-500 hover:shadow-[0_0_50px_rgba(201,168,108,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Your Stay
              <svg className="size-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-soft to-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </button>

          <a
            href="/apartments"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:bg-white/10 hover:text-gold hover:shadow-[0_0_30px_rgba(201,168,108,0.15)]"
          >
            Explore Residences
            <svg className="size-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Slide indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2"
      >
        {slides.map((_: any, idx: number) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              currentSlide === idx ? "w-8 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-gold/60 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Film grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
      </div>
    </section>
  );
}

export { Hero };
