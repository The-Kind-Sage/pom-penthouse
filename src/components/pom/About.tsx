import aboutImg from "@/assets/405915680.jpg";

export function About() {
  return (
    <section id="about" className="relative bg-background py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img src={aboutImg} alt="" className="size-full object-cover" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-8 bg-gold" />About Us<span className="h-px w-8 bg-gold" />
        </div>
        <h2 className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
          About <span className="italic text-gold">POM&apos;S Penthouse</span>
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          POM&apos;S Penthouse provides luxury serviced apartments in Lakeside, Pokhara — offering
          hotel-level comfort with the privacy and convenience of home. Whether staying for a
          few days or several months, guests enjoy premium accommodations, modern amenities,
          and exceptional service.
        </p>
        <div className="mt-12 grid grid-cols-3 divide-x divide-border border-y border-border py-8">
          {[["12+", "Residences"], ["4.9★", "Guest Rating"], ["50+", "Countries Hosted"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl text-gold sm:text-4xl">{n}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
