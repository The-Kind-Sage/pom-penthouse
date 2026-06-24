import { Instagram, Facebook, MessageCircle, MapPin, Phone, Mail, Mountain } from "lucide-react";
import logoUrl from "../../favicon/logo.png?url";

export function Footer() {
  return (
    <footer className="bg-luxury-black pt-20 pb-10 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4">
        <div>
          <a href="/" className="block">
            <img src={logoUrl} alt="POM'S Penthouse" className="h-24 w-auto" />
          </a>
          <p className="mt-5 text-sm leading-relaxed">
            Luxury serviced apartments in Lakeside, Pokhara — hotel comfort with home privacy.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="https://www.facebook.com/poms.penthouse" target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold">
              <Facebook className="size-4" />
            </a>
            <a href="https://www.instagram.com/poms_penthouse" target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold">
              <Instagram className="size-4" />
            </a>
            <a href="https://wa.me/9779840814142" target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold">
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.3em] text-gold">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {["Apartments", "Amenities", "Gallery", "About", "Contact"].map((l) => (
              <li key={l}><a href={`/${l.toLowerCase()}`} className="transition hover:text-gold">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.3em] text-gold">Residences</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {["3 BHK", "2 BHK", "1 BHK", "Studio Apartment", "Single Bed Room", "Double Bed Room", "Twin Bed Room"].map((a) => (
              <li key={a}><a href="/apartments" className="transition hover:text-gold">{a}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.3em] text-gold">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 text-gold" /> Lakeside, Pokhara, Nepal</li>
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 text-gold" /> +977 984-081-4142</li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 text-gold" /> stay@pomspenthouse.com</li>
            <li className="flex gap-3"><Mountain className="mt-0.5 size-4 text-gold" /> Views of Phewa & Annapurna</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 px-6 pt-6 text-xs text-white/40 sm:flex-row">
        <span>&copy; {new Date().getFullYear()} POM&apos;S Penthouse. All rights reserved.</span>
        <a href="https://www.drillthru.tech" target="_blank" rel="noreferrer" className="transition hover:text-gold">Made with Love ❤️ by Drill Thru</a>
      </div>
    </footer>
  );
}
