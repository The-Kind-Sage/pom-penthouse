import { useSettings } from "@/lib/hooks";
import aboutBg from "@/assets/8.jpeg";

export function About() {
  const { data: settings } = useSettings();
  const about = settings?.about_settings || {};
  const title = about.title || "About POM'S Penthouse";
  const text = about.text || "POM'S Penthouse provides luxury serviced apartments in Lakeside, Pokhara — offering hotel-level comfort with the privacy and convenience of home.";
  const stats = about.stats || [{ label: "Residences", value: "12+" }, { label: "Guest Rating", value: "4.9★" }, { label: "Countries Hosted", value: "50+" }];
  const bgImg = aboutBg;

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden isolate">
      <div className="absolute inset-0">
        <img src={bgImg} alt="" className="size-full object-cover blur-sm scale-105" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-8 bg-gold" />About Us<span className="h-px w-8 bg-gold" />
        </div>
        <h2 className="font-display text-4xl font-medium leading-tight text-white sm:text-5xl [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
          {title}
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-white/85 [text-shadow:0_1px_15px_rgba(0,0,0,0.6)]">{text}</p>
        <div className="mt-12 grid grid-cols-3 divide-x divide-white/20 border-y border-white/20 py-8 backdrop-blur-sm bg-black/20">
          {stats.map((s: any) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-gold sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
