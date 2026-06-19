import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { photo } from "@/lib/images";

function LiquidSmooth({ p }: { p: ReturnType<typeof photo> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)]"
    >
      <svg className="absolute w-0 h-0" aria-hidden>
        <defs>
          <clipPath id={`blob-${p.id}`} clipPathUnits="objectBoundingBox">
            <motion.path
              initial={{ d: "M0,0 L1,0 L1,1 L0,1 Z" }}
              animate={
                inView
                  ? {
                      d: [
                        "M0,0 L1,0 L1,1 L0,1 Z",
                        "M0.02,0.05 C0.3,-0.02 0.7,0.02 1,0.04 L0.98,0.95 C0.7,1.02 0.3,0.98 0.02,0.96 Z",
                        "M0,0 L1,0 L1,1 L0,1 Z",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </clipPath>
          <filter id={`turb-${p.id}`}>
            <feTurbulence
              type="fractalNoise"
              numOctaves={2}
              baseFrequency={inView ? 0.024 : 0.012}
            />
            <feDisplacementMap in="SourceGraphic" scale="4" />
          </filter>
        </defs>
      </svg>
      <img
        src={p.src}
        alt={p.alt}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full"
        style={{ clipPath: `url(#blob-${p.id})` }}
      />
    </div>
  );
}

export function Location() {
  return (
    <section id="location" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Photo 19/20 — Liquid Smooth */}
        <LiquidSmooth p={photo(19)} />
        <div>
          <p className="eyebrow mb-5">Pokhara Lakeside</p>
          <h2 className="h1-lux">180 meters to the water.</h2>
          <p className="mt-6 opacity-85 max-w-lg">
            Four minute walk to Lakeside Street. Cafés, boats, yoga. Twenty-five minutes to Pokhara
            International Airport. Annapurna trailheads one hour north.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>📍 180m Phewa Lake</li>
            <li>☕ 4 min Lakeside Street</li>
            <li>✈ 25 min PKR Airport</li>
            <li>⛰ Annapurna views</li>
          </ul>
          <p className="mt-8 accent-italic text-xl text-[var(--gold)]">
            Lakeside Road, Pokhara 33700, Nepal
          </p>
        </div>
      </div>

      <div className="mt-20 max-w-4xl mx-auto px-6">
        <p className="eyebrow text-center mb-6">Around Pom</p>
        <div className="grid md:grid-cols-3 gap-8 text-center opacity-85 text-sm">
          <div>Boats at dawn — Phewa Lake, 3 min</div>
          <div>Himalayan Java — espresso, 5 min</div>
          <div>World Peace Pagoda — hike 40 min</div>
        </div>
      </div>
    </section>
  );
}
