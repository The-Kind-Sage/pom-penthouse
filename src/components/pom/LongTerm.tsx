import { ArrowRight, Briefcase, Wifi, Star, Bed, Sparkles } from "lucide-react";

export function LongTerm() {
  return (
    <section className="bg-luxury-black py-24 text-white sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Stay Longer, Live Better
          </div>
          <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
            Weekly & Monthly <span className="italic text-gold">Stay Packages</span>
          </h2>
          <p className="mt-5 max-w-lg text-white/70">
            Built for those who treat Pokhara as more than a stopover. Better monthly rates,
            utilities included, flexible contracts and a residence that feels like yours.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Fully Furnished", "Utilities Included", "Flexible Contracts", "Better Monthly Rates"].map((b) => (
              <li key={b} className="flex items-center gap-3 border border-white/10 px-4 py-3">
                <Sparkles className="size-4 text-gold" /><span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
          <a href="#contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-luxury-black transition hover:brightness-110">
            Request Long-Term Pricing <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {([
            ["Remote Workers", Briefcase],
            ["Digital Nomads", Wifi],
            ["Business Travelers", Star],
            ["Relocating Families", Bed],
          ] as const).map(([t, Icon]) => (
            <div key={t} className="group flex flex-col gap-4 border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/40 hover:bg-white/[0.06]">
              <Icon className="size-6 text-gold" />
              <div className="font-display text-xl">{t}</div>
              <div className="text-xs text-white/55">Tailored stay packages and rates available on request.</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
