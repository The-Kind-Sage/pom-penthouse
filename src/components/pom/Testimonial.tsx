import { useEffect, useRef } from "react";
import testImg from "@/assets/405915677.jpg";

declare global {
  interface Window {
    eApps?: { init?: () => void };
  }
}

export function Testimonial() {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize widget after script loads
    script.onload = () => {
      if (window.eApps?.init) {
        window.eApps.init();
      }
    };
  }, []);

  return (
    <section className="relative bg-muted overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 opacity-[0.03]">
        <img src={testImg} alt="" className="size-full object-cover" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Guest Stories<span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            Loved by guests <span className="italic text-gold">worldwide</span>
          </h2>
        </div>

        <div className="mt-16">
          <div className="elfsight-app-a1bde9c4-658b-40a3-ac19-a19822b5bfa6" data-elfsight-app-lazy />
        </div>
      </div>
    </section>
  );
}
