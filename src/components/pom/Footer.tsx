import { Instagram, Facebook, MessageCircle, MapPin, Phone, Mail, Mountain } from "lucide-react";
import { useSettings } from "@/lib/hooks";
import logoUrl from "../../favicon/logo.png?url";

export function Footer() {
  const { data: settings } = useSettings();
  const footer = settings?.footer_settings || {};
  const desc = footer.description || "Luxury serviced apartments in Lakeside, Pokhara — hotel comfort with home privacy.";
  const fb = footer.facebook || "https://www.facebook.com/poms.penthouse";
  const ig = footer.instagram || "https://www.instagram.com/poms_penthouse";
  const wa = footer.whatsapp || "https://wa.me/9779840814142";
  const contact = footer.contact || {};
  const exploreLinks = footer.explore_links || [
    { label: "Apartments", href: "/apartments" },
    { label: "Amenities", href: "/amenities" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  const residenceLinks = footer.residence_links || [
    { label: "3 BHK", href: "/apartments" },
    { label: "2 BHK", href: "/apartments" },
    { label: "1 BHK", href: "/apartments" },
    { label: "Studio Apartment", href: "/apartments" },
    { label: "Single Bed Room", href: "/rooms" },
    { label: "Double Bed Room", href: "/rooms" },
    { label: "Twin Bed Room", href: "/rooms" },
  ];

  return (
    <footer className="bg-luxury-black pt-20 pb-10 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4">
        <div>
          <a href="/" className="block">
            <img src={logoUrl} alt="POM'S Penthouse" className="h-24 w-auto" />
          </a>
          <p className="mt-5 text-sm leading-relaxed">{desc}</p>
          <div className="mt-6 flex gap-3">
            <a href={fb} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold">
              <Facebook className="size-4" />
            </a>
            <a href={ig} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold">
              <Instagram className="size-4" />
            </a>
            <a href={wa} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold">
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.3em] text-gold">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {exploreLinks.map((l: any) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-gold">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.3em] text-gold">Residences</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {residenceLinks.map((a: any) => (
              <li key={a.label}><a href={a.href} className="transition hover:text-gold">{a.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.3em] text-gold">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {contact.address && <li className="flex gap-3"><MapPin className="mt-0.5 size-4 text-gold" /> {contact.address}</li>}
            {contact.phone && <li className="flex gap-3"><Phone className="mt-0.5 size-4 text-gold" /> {contact.phone}</li>}
            {contact.email && <li className="flex gap-3"><Mail className="mt-0.5 size-4 text-gold" /> {contact.email}</li>}
            {contact.tagline && <li className="flex gap-3"><Mountain className="mt-0.5 size-4 text-gold" /> {contact.tagline}</li>}
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
