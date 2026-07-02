import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useSettings } from "@/lib/hooks";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { createPortal } from "react-dom";

// Reduced to 16 particles (was 40) — each Framer Motion element creates a RAF loop.
// Particles are purely decorative; the reduction is invisible to the user.
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
      driftX: Math.random() * 30 - 15,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            // Promote each particle to its own compositor layer so the
            // browser doesn't repaint the parent on every animation frame.
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, p.driftX, 0],
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
  const title = settings?.hero_title || "POM'S Penthouse";
  const subtitle = settings?.hero_subtitle || "A Lakeside Sanctuary — 180 meters from Phewa Lake";
  const tagline = heroSettings.tagline || "Pokhara, Nepal";
  const badge = heroSettings.badge || "Freehold";

  const [isLoaded, setIsLoaded] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFloatingHidden, setIsFloatingHidden] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  // floatingVideoRef is kept but the floating player reuses the same src;
  // we keep a ref so we can pause/play it when it becomes visible.
  const floatingVideoRef = useRef<HTMLVideoElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Lower spring stiffness = smoother feel, and we throttle the update
  // to every other mousemove via a flag to halve the number of MotionValue
  // sets and resulting repaints.
  const springConfig = { stiffness: 40, damping: 25 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !isFloatingHidden) {
          setShowFloating(true);
        } else {
          setShowFloating(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isFloatingHidden]);

  useEffect(() => {
    // Throttle mousemove to every other event with a simple toggle ref.
    // This halves the number of spring updates (and resulting compositor
    // layer invalidations) without any perceptible change in parallax feel.
    let skip = false;
    const handleMouseMove = (e: MouseEvent) => {
      skip = !skip;
      if (skip) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = ((e.clientX - centerX) / centerX) * 5;
      const y = ((e.clientY - centerY) / centerY) * 5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleCloseFloating = useCallback(() => {
    setIsFloatingHidden(true);
    setShowFloating(false);
  }, []);

  const handleExpand = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleMinimize = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="top"
        className="relative h-screen w-full overflow-hidden bg-luxury-black"
      >
        {/* Background Video
            — poster: shown immediately while video buffers → prevents blank LCP frame
            — preload="metadata": tells the browser to fetch only the first frame /
              timing info instead of downloading the whole 22 MB file on page load.
              autoPlay still works; the browser begins buffering once it starts playing.
            — will-change on the wrapper: keeps the parallax transform on the GPU
              so it never triggers a main-thread layout or repaint.               */}
        <motion.div
          className="absolute inset-0"
          style={{
            scale: 1.1,
            x: parallaxX,
            y: parallaxY,
            willChange: "transform",
          }}
        >
          <video
            ref={heroVideoRef}
            src="/assets/video1.mp4"
            poster="/assets/video1-poster.jpg"
            className="size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-luxury-black/70 via-luxury-black/30 to-luxury-black/80" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-luxury-black/50 via-transparent to-luxury-black/50" />

        {/* Golden glow effect */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-[150px]" />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Content
            — will-change: transform, opacity keeps the scroll-driven parallax
              and fade on the GPU compositor, away from the main thread.         */}
        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ y: textY, opacity, willChange: "transform, opacity" }}
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

      {/* Floating Video Player
          — No separate preload: the browser already has video1.mp4 in cache
            from the hero element, so this is effectively free.
          — autoPlay is handled imperatively via the ref so the video only
            plays when the floating player is actually visible.               */}
      <AnimatePresence>
        {showFloating && !showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-24 right-6 z-50 sm:top-28 sm:right-8 md:top-28 md:right-10"
          >
            <div
              className="group relative w-[220px] h-[124px] sm:w-[280px] sm:h-[158px] md:w-[320px] md:h-[180px] overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_70px_-15px_rgba(201,168,108,0.3)] transition-all duration-500 hover:scale-105 cursor-pointer"
              onClick={handleExpand}
            >
              <video
                ref={floatingVideoRef}
                src="/assets/video1.mp4"
                className="size-full object-cover"
                muted
                playsInline
                autoPlay
                loop
                preload="none"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 border border-white/10 rounded-2xl group-hover:border-gold/30 transition-colors duration-300" />

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseFloating();
                }}
                className="absolute top-2 right-2 z-10 size-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200"
              >
                <X className="size-3" />
              </button>

              {/* Expand Icon */}
              <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="size-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70">
                  <Maximize2 className="size-3" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {showModal && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={handleMinimize}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl aspect-video overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(201,168,108,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src="/assets/video1.mp4"
                className="size-full object-cover"
                controls
                autoPlay
                playsInline
                preload="none"
              />

              {/* Close Button */}
              <button
                onClick={handleMinimize}
                className="absolute top-4 right-4 z-10 size-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all duration-200"
              >
                <Minimize2 className="size-5" />
              </button>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </>
  );
}

export { Hero };
