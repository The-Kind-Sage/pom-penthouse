import { ArrowRight, Briefcase, Wifi, Star, Bed, Sparkles } from "lucide-react";
import { useSettings } from "@/lib/hooks";

const ICONS: Record<string, any> = { "Remote Workers": Briefcase, "Digital Nomads": Wifi, "Business Travelers": Star, "Relocating Families": Bed };

export function LongTerm() {
  const { data: settings } = useSettings();
  const lt = settings?.longterm_settings || {};
  const title = lt.title || "Weekly & Monthly Stay Packages";
  const subtitle = lt.subtitle || "Built for those who treat Pokhara as more than a stopover.";
  const features = lt.features || ["Fully Furnished", "Utilities Included", "Flexible Contracts", "Better Monthly Rates"];
  const items = lt.items || [];
  const bgImg = lt.image || "";

  return (
    <section className="relative bg-luxury-black py-24 text-white sm:py-32 overflow-hidden">
      {bgImg && <div className="absolute inset-0 opacity-20"><img src={bgImg} alt="" className="size-full object-cover" /></div>}
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/95 to-luxury-black/80" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Stay Longer, Live Better
          </div>
          <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-white/70">{subtitle}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((b: string) => (
              <li key={b} className="flex items-center gap-3 border border-white/10 px-4 py-3">
                <Sparkles className="size-4 text-gold" /><span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
          <a href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-black transition hover:brightness-110">
            Request Long-Term Pricing <ArrowRight className="size-4" />
          </a>
        </div>
        {items.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {items.map((item: any) => {
              const Icon = ICONS[item.title] || Briefcase;
              return (
                <div key={item.title} className="group flex flex-col gap-4 border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/40 hover:bg-white/[0.06]">
                  <Icon className="size-6 text-gold" />
                  <div className="font-display text-xl">{item.title}</div>
                  <div className="text-xs text-white/55">{item.desc}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
