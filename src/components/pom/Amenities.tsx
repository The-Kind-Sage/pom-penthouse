import { Mountain, Cpu, Bell, Sunrise, Sparkles } from "lucide-react";
import { photo } from "@/lib/images";

function FadeToSolid({ p }: { p: ReturnType<typeof photo> }) {
  return (
    <div className="group relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)]">
      <img
        src={p.src}
        alt={p.alt}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full transition-opacity duration-[450ms] group-hover:opacity-0"
      />
      <div className="absolute inset-0 bg-[var(--gold)]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-[450ms] flex flex-col justify-end p-7 text-[var(--charcoal)]">
        <Sunrise size={22} className="mb-3" />
        <h3 className="h3-lux">Rooftop Terrace</h3>
        <p className="text-sm mt-2 opacity-90">Annapurna sunsets. Cedar daybed. Outdoor shower.</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-0 transition-opacity">
        <h3 className="h3-lux">Rooftop Terrace</h3>
      </div>
    </div>
  );
}

function ColorWash({ p }: { p: ReturnType<typeof photo> }) {
  return (
    <div className="group relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)]">
      <img
        src={p.src}
        alt={p.alt}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-[var(--lake-blue)] mix-blend-multiply translate-y-full group-hover:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <Mountain size={22} className="mb-2" />
        <h3 className="h3-lux">Infinity View</h3>
        <p className="text-sm mt-1 opacity-90">Floor-to-ceiling lake glass. No curtains needed.</p>
      </div>
    </div>
  );
}

function CardFlip({ p }: { p: ReturnType<typeof photo> }) {
  return (
    <div className="group relative aspect-[4/5] [perspective:1200px]">
      <div className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)] [backface-visibility:hidden]">
          <img
            src={p.src}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent">
            <Cpu size={22} className="mb-2" />
            <h3 className="h3-lux">Smart Home</h3>
          </div>
        </div>
        <div className="absolute inset-0 rounded-[28px] overflow-hidden bg-[var(--charcoal)] text-[var(--sand)] p-7 flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Sparkles size={22} className="mb-4 text-[var(--gold)]" />
          <ul className="space-y-2 font-display text-xl">
            <li>Lutron lighting</li>
            <li>Climate zones</li>
            <li>Keyless entry</li>
            <li>Sonos</li>
            <li>600mbps fiber</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function GrayscaleColor({ p }: { p: ReturnType<typeof photo> }) {
  return (
    <div className="group relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)]">
      <img
        src={p.src}
        alt={p.alt}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full transition-[filter] duration-[600ms] grayscale contrast-[1.05] group-hover:grayscale-0"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent">
        <Bell size={22} className="mb-2" />
        <h3 className="h3-lux">Concierge</h3>
        <p className="text-sm mt-1 opacity-90">
          Airport transfer, trek guides, private chef — on message.
        </p>
      </div>
    </div>
  );
}

export function Amenities() {
  return (
    <section id="amenities" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-5">Service</p>
          <h2 className="h1-lux">Everything, nothing extra</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {/* Photo 13/20 — Fade to Solid */}
          <FadeToSolid p={photo(13)} />
          {/* Photo 14/20 — Color Wash */}
          <ColorWash p={photo(14)} />
          {/* Photo 15/20 — Card Flip */}
          <CardFlip p={photo(15)} />
          {/* Photo 16/20 — Grayscale to Color */}
          <GrayscaleColor p={photo(16)} />
        </div>
      </div>
    </section>
  );
}
