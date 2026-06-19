import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { photo } from "@/lib/images";

export function About() {
  const pushRef = useRef<HTMLImageElement>(null);
  const pushInView = useInView(pushRef, { once: true, amount: 0.2 });

  const maskRef = useRef<SVGCircleElement>(null);
  const maskWrapRef = useRef<HTMLDivElement>(null);
  const maskInView = useInView(maskWrapRef, { once: true, amount: 0.3 });

  // Distortion wave on Photo 6: mouse-driven SVG displacement
  const waveWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = waveWrapRef.current;
    if (!el) return;
    const turb = el.querySelector("feTurbulence");
    const disp = el.querySelector("feDisplacementMap");
    if (!turb || !disp) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const dist = Math.hypot(x - 0.5, y - 0.5);
      turb.setAttribute("baseFrequency", String(0.008 + dist * 0.02));
      disp.setAttribute("scale", String(Math.min(8, dist * 16)));
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const p4 = photo(4),
    p5 = photo(5),
    p6 = photo(6);

  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-6">Lakeside Sanctuary</p>
          <h2 className="h1-lux mb-8">
            Stillness,
            <br />
            with a view.
          </h2>
          <div className="space-y-5 text-lg opacity-85 max-w-[520px]">
            <p>Three bedrooms above Phewa Lake. Floor-to-ceiling glass facing the Annapurnas.</p>
            <p>Limestone, cedar, and hand-woven linen. Quiet by design.</p>
            <p>
              180 meters to the water. Four minutes to Lakeside Street cafés. Twenty-five minutes to
              Pokhara Airport.
            </p>
          </div>
          <p className="accent-italic mt-8 text-xl text-[var(--gold)]">
            3 Beds · 3.5 Baths · 2,150 sq ft
          </p>
          <a
            href="#gallery"
            className="link-underline mt-8 inline-block text-sm uppercase tracking-[0.2em]"
          >
            View Gallery →
          </a>
        </div>

        <div className="space-y-10">
          {/* Photo 4/20 — Push */}
          <figure className="overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)]">
            <motion.img
              ref={pushRef}
              src={p4.src}
              alt={p4.alt}
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-[260px] sm:h-[320px] md:h-[420px]"
              initial={{ x: 80, scale: 0.96, opacity: 0 }}
              animate={pushInView ? { x: 0, scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <figcaption className="mt-3 text-sm opacity-60">Morning light</figcaption>
          </figure>

          {/* Photo 5/20 — Mask Reveal */}
          <figure ref={maskWrapRef} className="relative">
            <div className="overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)]">
              <svg viewBox="0 0 100 100" className="absolute w-0 h-0">
                <defs>
                  <clipPath id="circle-mask" clipPathUnits="objectBoundingBox">
                    <circle ref={maskRef} cx="0.5" cy="0.5" r={maskInView ? 0.75 : 0}>
                      <animate
                        attributeName="r"
                        from="0"
                        to="0.75"
                        dur="1.4s"
                        begin={maskInView ? "0s" : "indefinite"}
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.22 1 0.36 1"
                      />
                    </circle>
                  </clipPath>
                </defs>
              </svg>
              <img
                src={p5.src}
                alt={p5.alt}
                loading="lazy"
                decoding="async"
              className="object-cover w-full h-[260px] sm:h-[320px] md:h-[420px]"
                style={{ clipPath: "url(#circle-mask)" }}
              />
            </div>
            <figcaption className="mt-3 text-sm opacity-60">Stone bath</figcaption>
          </figure>

          {/* Photo 6/20 — Distortion Wave */}
          <figure
            ref={waveWrapRef}
            className="relative overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)]"
          >
            <svg className="absolute w-0 h-0">
              <filter id="liquid-distort">
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="3" />
                <feDisplacementMap in="SourceGraphic" scale="0" />
              </filter>
            </svg>
            <img
              src={p6.src}
              alt={p6.alt}
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-[260px] sm:h-[320px] md:h-[420px]"
              style={{ filter: "url(#liquid-distort)" }}
            />
            <figcaption className="mt-3 text-sm opacity-60">Cedar detail</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
