import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { photo } from "@/lib/images";
import { ui } from "@/lib/ui-store";

function TiltShift({ p }: { p: ReturnType<typeof photo> }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 220, damping: 22 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 220, damping: 22 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = (ref.current as HTMLDivElement).getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="relative overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)] aspect-[4/5]"
    >
      <img
        src={p.src}
        alt={p.alt}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </motion.div>
  );
}

function SplitScreen({ p }: { p: ReturnType<typeof photo> }) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)] aspect-[4/5]">
      {/* Night under-layer */}
      <img
        src={p.src}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 object-cover w-full h-full"
        style={{ filter: "brightness(0.45) saturate(0.8) hue-rotate(210deg)" }}
      />
      {/* Day top layer with diagonal clip */}
      <img
        src={p.src}
        alt={p.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 object-cover w-full h-full transition-[clip-path] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      />
      <style>{`
        .splitscreen-day { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
      `}</style>
      <div
        className="absolute inset-0 transition-all duration-[550ms]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      />
      <div
        className="absolute inset-0 group-hover:[clip-path:polygon(0_0,0_0,0_100%,0_100%)] transition-all duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-cover"
        style={{ backgroundImage: `url(${p.src})` }}
      />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="h3-lux">Sunset Lounge</h3>
        <p className="text-sm mt-1 opacity-90">
          Hover to see night. Low oak sofa. Hand-thrown ceramics. Vinyl.
        </p>
      </div>
    </div>
  );
}

export function Residence() {
  return (
    <section id="residence" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            {/* Photo 17/20 — Tilt & Shift */}
            <TiltShift p={photo(17)} />
            <div className="mt-6">
              <p className="eyebrow mb-2">Suite</p>
              <h3 className="h2-lux">Master Suite</h3>
              <p className="mt-3 opacity-80 max-w-md">
                King linen bed. Lake-facing glass. Limestone soaking bath. Walk-in cedar closet.
              </p>
              <button onClick={ui.openBooking} className="btn-primary mt-4 text-sm py-2 px-5">
                Book Now — $110 / night
              </button>
            </div>
          </div>
          <div>
            {/* Photo 18/20 — Split Screen */}
            <SplitScreen p={photo(18)} />
            <div className="mt-6">
              <p className="eyebrow mb-2">Lounge</p>
              <h3 className="h2-lux">Sunset Lounge</h3>
              <p className="mt-3 opacity-80 max-w-md">
                Hover to see night. Low oak sofa. Hand-thrown ceramics. Vinyl.
              </p>
              <button onClick={ui.openBooking} className="btn-primary mt-4 text-sm py-2 px-5">
                Book Now — $189 / night
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-[var(--gold)]/30 pt-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {[
            ["3", "Beds"],
            ["3.5", "Baths"],
            ["2,150", "Sq ft"],
            ["420", "Terrace sq ft"],
            ["2", "Parking"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-5xl">{n}</div>
              <div className="text-xs uppercase tracking-[0.2em] mt-2 opacity-60">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
