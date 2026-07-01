import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function VideoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.8, 1.05, 1, 1.05, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const brightness = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1.1, 1.1, 0.6]);

  const springScale = useSpring(scale, { stiffness: 120, damping: 25, mass: 0.8 });
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 25, mass: 0.8 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const handleLoadedData = () => {
      setIsVideoReady(true);
      video.pause();
    };

    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  useEffect(() => {
    if (!isVideoReady) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let rafId: number;
    let lastTime = 0;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const scrollStart = windowHeight;
        const scrollEnd = -rect.height;
        const currentScroll = rect.top;

        const progress = 1 - (currentScroll - scrollEnd) / (scrollStart - scrollEnd);
        const clampedProgress = Math.max(0, Math.min(1, progress));

        if (video.duration) {
          const targetTime = clampedProgress * video.duration;
          const diff = targetTime - video.currentTime;

          if (Math.abs(diff) > 0.01) {
            video.currentTime += diff * 0.15;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVideoReady]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-luxury-black"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            y,
            scale: springScale,
            rotateX: springRotateX,
            opacity,
            transformPerspective: 1200,
            transformOrigin: "center center",
          }}
          className="relative w-full h-full"
        >
          <video
            ref={videoRef}
            src="/assets/video1.mp4"
            className="size-full object-cover"
            muted
            playsInline
            preload="auto"
            style={{
              willChange: "transform",
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

          <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-luxury-black to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-black to-transparent" />

          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/8 blur-[120px] rounded-full" />
        </motion.div>

        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center px-6"
          >
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-gold mb-6"
            >
              <span className="h-px w-12 bg-gold/60" />
              The Experience
              <span className="h-px w-12 bg-gold/60" />
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-medium text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl"
            >
              Life at <span className="italic text-gold">POM&apos;S</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-lg mx-auto text-sm text-white/70 sm:text-base drop-shadow-lg"
            >
              Where every moment is crafted for luxury living
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 pointer-events-auto"
            >
              <a
                href="/apartments"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm transition-all duration-500 hover:bg-gold/20 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(201,168,108,0.3)]"
              >
                Explore
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll to explore</span>
            <motion.div
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-12 w-px bg-gradient-to-b from-gold/80 to-transparent origin-top"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export { VideoScroll };
