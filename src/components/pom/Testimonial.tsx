import { useEffect, useRef } from "react";
import { useSettings } from "@/lib/hooks";

export function Testimonial() {
  const { data: settings } = useSettings();
  const testimonial = settings?.testimonial_settings || {};
  const widgetId = testimonial.widget_id || "a1bde9c4-658b-40a3-ac19-a19822b5bfa6";
  const title = testimonial.title || "Loved by guests worldwide";
  const bgImage = testimonial.image || "";

  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const script = document.createElement("script");
    script.src = "https://widgets.sociablekit.com/google-reviews/widget.js";
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.eApps?.init) {
        window.eApps.init();
      }
    };
  }, []);

  return (
    <section className="relative bg-muted overflow-hidden py-24 sm:py-32">
      {bgImage && (
        <div className="absolute inset-0 opacity-[0.03]">
          <img src={bgImage} alt="" className="size-full object-cover" />
        </div>
      )}
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Guest Stories<span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            {title}
          </h2>
        </div>

        <div className="mt-16">
          <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy />
        </div>
      </div>
    </section>
  );
}
