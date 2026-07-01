import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { PenthouseBuilding } from "./PenthouseBuilding";
import { AmbientParticles } from "./AmbientParticles";
import { useSettings } from "@/lib/hooks";

function Scene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#fff5e6" castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#c9a86c" />
      <pointLight position={[0, 3, 2]} intensity={0.8} color="#ffd700" distance={8} decay={2} />
      <spotLight
        position={[0, 6, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.6}
        color="#fff8e7"
        castShadow
      />

      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
        <PenthouseBuilding mouse={mouse} />
      </Float>

      <AmbientParticles count={60} />

      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.4}
        scale={12}
        blur={2.5}
        far={4}
        color="#1a1a2e"
      />

      <Environment preset="city" environmentIntensity={0.5} />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
        <span className="text-xs uppercase tracking-[0.3em] text-gold/60">Loading Experience</span>
      </div>
    </div>
  );
}

function Hero3D() {
  const { data: settings } = useSettings();
  const hero = settings?.hero_settings || {};
  const title = hero.title || "POM'S Penthouse";
  const subtitle = hero.subtitle || "Luxury Redefined in the Heart of Pokhara";

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-black">
      {/* Cinematic entrance overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-luxury-black"
          >
            <LoadingFallback />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 1, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <Scene mouse={mouse} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-transparent to-luxury-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-luxury-black/40 via-transparent to-luxury-black/40" />

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <AnimatePresence>
          {showContent && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-gold">
                  <span className="h-px w-8 bg-gold/50" />
                  Luxury Living
                  <span className="h-px w-8 bg-gold/50" />
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="font-display text-5xl font-medium leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
              >
                {title.split(" ").map((word: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 + i * 0.1 }}
                    className="inline-block"
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
                className="mt-6 max-w-xl text-base text-white/70 sm:text-lg md:text-xl"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("poms:open-booking"))}
                  className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-black transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_40px_rgba(201,168,108,0.3)]"
                >
                  Book Your Stay
                  <svg
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <a
                  href="/apartments"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-white/10 hover:text-gold"
                >
                  Explore Residences
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
      </div>

      {/* Film grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </section>
  );
}

export { Hero3D };
