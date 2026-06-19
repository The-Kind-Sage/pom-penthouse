import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { photo } from "@/lib/images";
import { ui } from "@/lib/ui-store";

function Wipe({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[28px] h-full">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full"
      />
      <motion.div
        className="absolute inset-y-0 left-0 w-px bg-[var(--gold)]"
        initial={{ scaleX: 0, x: 0 }}
        animate={inView ? { x: ["0%", "100%"] } : {}}
        style={{
          originX: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent 0%, transparent 49.9%, var(--gold) 50%, transparent 50.1%, transparent 100%)",
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 bg-[var(--sand-soft)]"
        initial={{ x: 0 }}
        animate={inView ? { x: "101%" } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function ZoomIn({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] h-full group">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full transition-transform duration-[2500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
      />
    </div>
  );
}

function ZoomOut({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[28px] h-full">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ scale }}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

function BlurDissolve({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[28px] h-full">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full"
        initial={{ filter: "blur(24px)", scale: 1.03 }}
        animate={inView ? { filter: "blur(0px)", scale: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function CubeFlip({ src, alt, back }: { src: string; alt: string; back: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setFlipped((f) => !f);
      }}
      className="relative h-full w-full rounded-[28px] overflow-hidden text-left"
      style={{ perspective: "1200px" }}
      aria-label="Flip image"
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 90 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full"
          />
          <span className="absolute top-3 right-3 text-[11px] md:text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full bg-black/50 text-white">
            Tap to flip
          </span>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center bg-[var(--charcoal)] text-[var(--sand)]"
          style={{ transform: "rotateY(-90deg) translateZ(1px)", backfaceVisibility: "hidden" }}
        >
          <img
            src={back}
            alt="Evening view"
            className="object-cover w-full h-full absolute inset-0 opacity-70"
          />
          <span className="relative accent-italic text-2xl">Evening view</span>
        </div>
      </motion.div>
    </button>
  );
}

function PageTurn({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] h-full group">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full"
      />
      <div
        className="absolute bottom-0 right-0 w-16 h-16 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-28 group-hover:h-28"
        style={{
          background:
            "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.25) 50%, rgba(201,168,108,0.7) 70%, transparent 75%)",
          boxShadow: "inset -6px -6px 12px rgba(0,0,0,0.2)",
          transform: "rotate(0deg)",
        }}
      />
    </div>
  );
}

export function Gallery() {
  const p7 = photo(7),
    p8 = photo(8),
    p9 = photo(9),
    p10 = photo(10),
    p11 = photo(11),
    p12 = photo(12),
    p2 = photo(2);

  const tiles = [
    {
      key: "p7",
      el: <Wipe src={p7.src} alt={p7.alt} />,
      cls: "md:row-span-2 min-h-[220px] md:min-h-0 md:h-full",
      idx: 6,
      label: "Living Room",
    },
    {
      key: "p8",
      el: <ZoomIn src={p8.src} alt={p8.alt} />,
      cls: "min-h-[200px] md:h-[300px]",
      idx: 7,
      label: "Kitchen",
    },
    {
      key: "p9",
      el: <ZoomOut src={p9.src} alt={p9.alt} />,
      cls: "min-h-[200px] md:h-[300px]",
      idx: 8,
      label: "Lounge",
    },
    {
      key: "p10",
      el: <BlurDissolve src={p10.src} alt={p10.alt} />,
      cls: "min-h-[220px] md:h-[460px] lg:row-span-2",
      idx: 9,
      label: "Bedroom",
    },
    {
      key: "p11",
      el: <CubeFlip src={p11.src} alt={p11.alt} back={p2.src} />,
      cls: "min-h-[200px] md:h-[300px]",
      idx: 10,
      label: "Terrace",
    },
    {
      key: "p12",
      el: <PageTurn src={p12.src} alt={p12.alt} />,
      cls: "min-h-[200px] md:h-[300px]",
      idx: 11,
      label: "Bathroom",
    },
  ];

  return (
    <section id="gallery" className="py-24 md:py-32" style={{ background: "var(--sand-soft)" }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-5">In quiet light</p>
          <h2 className="h1-lux">
            Six frames
            <br />
            from the penthouse
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto md:auto-rows-[300px] gap-7">
          {tiles.map((t) => (
            <div key={t.key} className={`relative group ${t.cls}`}>
              <div
                className="relative h-full cursor-zoom-in"
                onClick={() => ui.openLightbox(t.idx)}
              >
                {/* Photo 07-12/20 — Gallery tile */}
                {t.el}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 group-hover:bg-black/30 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto rounded-[28px]">
                <span className="text-white/0 group-hover:text-white/90 text-xs tracking-[0.2em] uppercase transition-all duration-500">
                  {t.label}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    ui.openBooking();
                  }}
                  className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 btn-primary text-sm py-2 px-5 pointer-events-auto"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm opacity-60 tracking-[0.2em]">07 – 12 / 20</p>
      </div>
    </section>
  );
}
