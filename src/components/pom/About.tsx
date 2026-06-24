import { useSettings } from "@/lib/hooks";

export function About() {
  const { data: settings } = useSettings();
  const about = settings?.about_settings || {};
  const title = about.title || "About POM'S Penthouse";
  const text = about.text || "POM'S Penthouse provides luxury serviced apartments in Lakeside, Pokhara — offering hotel-level comfort with the privacy and convenience of home.";
  const stats = about.stats || [{ label: "Residences", value: "12+" }, { label: "Guest Rating", value: "4.9★" }, { label: "Countries Hosted", value: "50+" }];
  const bgImg = about.image || "";

  return (
    <section id="about" className="relative bg-background py-24 sm:py-32 overflow-hidden">
      {bgImg && (
        <div className="absolute inset-0 opacity-5">
          <img src={bgImg} alt="" className="size-full object-cover" />
        </div>
      )}
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-8 bg-gold" />About Us<span className="h-px w-8 bg-gold" />
        </div>
        <h2 className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
          {title}
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{text}</p>
        <div className="mt-12 grid grid-cols-3 divide-x divide-border border-y border-border py-8">
          {stats.map((s: any) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-gold sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
