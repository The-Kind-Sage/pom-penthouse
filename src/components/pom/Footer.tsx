import { motion } from "framer-motion";
import { Instagram, Facebook, MessageCircle, MapPin, Phone, Mail, Mountain } from "lucide-react";
import { useSettings } from "@/lib/hooks";
import logoUrl from "../../favicon/logo.png?url";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export function Footer() {
  const { data: settings } = useSettings();
  const footer = settings?.footer_settings || {};
  const navbar = settings?.navbar_settings || {};
  const navLogo = navbar.logo || logoUrl;
  const desc = footer.description || "Luxury serviced apartments in Lakeside, Pokhara — hotel comfort with home privacy.";
  const fb = footer.facebook || "https://www.facebook.com/poms.penthouse";
  const ig = footer.instagram || "https://www.instagram.com/poms_penthouse";
  const wa = footer.whatsapp || "https://wa.me/9779840814142";
  const contact = footer.contact || {
    address: "Lakeside, Pokhara, Nepal",
    phone: "+977 984-081-4142",
    email: "stay@pomspenthouse.com",
    tagline: "Views of Phewa & Annapurna",
  };
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
    <footer className="relative bg-luxury-black pt-20 pb-10 text-white/70 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp}>
            <a href="/" className="block">
              <img src={navLogo} alt="POM'S Penthouse" className="h-40 w-auto" />
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-5 text-sm leading-relaxed">{desc}</motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex gap-3">
            <a href={fb} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/15 transition-all duration-300 hover:border-gold hover:text-gold hover:scale-110 hover:shadow-[0_0_20px_rgba(201,168,108,0.3)]">
              <Facebook className="size-4" />
            </a>
            <a href={ig} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/15 transition-all duration-300 hover:border-gold hover:text-gold hover:scale-110 hover:shadow-[0_0_20px_rgba(201,168,108,0.3)]">
              <Instagram className="size-4" />
            </a>
            <a href={wa} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/15 transition-all duration-300 hover:border-gold hover:text-gold hover:scale-110 hover:shadow-[0_0_20px_rgba(201,168,108,0.3)]">
              <MessageCircle className="size-4" />
            </a>
          </motion.div>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h4 variants={fadeUp} className="font-display text-sm uppercase tracking-[0.3em] text-gold">Explore</motion.h4>
          <motion.ul variants={stagger} className="mt-5 space-y-3 text-sm">
            {exploreLinks.map((l: any) => (
              <motion.li key={l.label} variants={fadeUp}><a href={l.href} className="transition-colors hover:text-gold">{l.label}</a></motion.li>
            ))}
          </motion.ul>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h4 variants={fadeUp} className="font-display text-sm uppercase tracking-[0.3em] text-gold">Residences</motion.h4>
          <motion.ul variants={stagger} className="mt-5 space-y-3 text-sm">
            {residenceLinks.map((a: any) => (
              <motion.li key={a.label} variants={fadeUp}><a href={a.href} className="transition-colors hover:text-gold">{a.label}</a></motion.li>
            ))}
          </motion.ul>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h4 variants={fadeUp} className="font-display text-sm uppercase tracking-[0.3em] text-gold">Contact</motion.h4>
          <motion.ul variants={stagger} className="mt-5 space-y-4 text-sm">
            {contact.address && <motion.li variants={fadeUp} className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {contact.address}</motion.li>}
            {contact.phone && <motion.li variants={fadeUp} className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-gold" /> {contact.phone}</motion.li>}
            {contact.email && <motion.li variants={fadeUp} className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-gold" /> {contact.email}</motion.li>}
            {contact.tagline && <motion.li variants={fadeUp} className="flex gap-3"><Mountain className="mt-0.5 size-4 shrink-0 text-gold" /> {contact.tagline}</motion.li>}
          </motion.ul>
        </motion.div>
      </div>
      <div className="relative mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 px-6 pt-6 text-xs text-white/40 sm:flex-row">
        <span>&copy; {new Date().getFullYear()} POM&apos;S Penthouse. All rights reserved.</span>
        <a href="https://www.drillthru.tech" target="_blank" rel="noreferrer" className="transition hover:text-gold">Made with Love ❤️ by Drill Thru</a>
      </div>
    </footer>
  );
}
