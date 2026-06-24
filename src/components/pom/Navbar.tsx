import { useEffect, useState } from "react";
import { Phone, ArrowRight, Moon, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSettings } from "@/lib/hooks";
import logoUrl from "../../favicon/logo.png?url";

function openBooking() {
  window.dispatchEvent(new CustomEvent("poms:open-booking"));
}

function MobileMenu({ scrolled, links }: { scrolled: boolean; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const { data: settings } = useSettings();
  const navbar = settings?.navbar_settings || {};
  const phone = navbar.phone || "+977 984-081-4142";

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex flex-col items-center justify-center gap-1 rounded-md p-2 transition ${
          scrolled ? "text-luxury-black" : "text-white"
        }`}
        aria-label="Toggle menu"
      >
        <span className={`block h-px w-5 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
        <span className={`block h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
        <span className={`block h-px w-5 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-4 top-full mt-2 w-52 overflow-hidden rounded-xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur-xl">
          <nav className="flex flex-col">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="rounded-lg px-3 py-2.5 text-sm text-luxury-black/80 transition hover:bg-muted hover:text-gold"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 border-t border-border pt-2">
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-luxury-black/80 transition hover:bg-muted hover:text-gold">
              <Phone className="size-4" /> {phone}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar({ transparent = true }: { transparent?: boolean }) {
  const { data: settings } = useSettings();
  const navbar = settings?.navbar_settings || {};
  const links = navbar.links || [
    { label: "Home", href: "/" },
    { label: "Apartments", href: "/apartments" },
    { label: "Amenities", href: "/amenities" },
    { label: "Rooms", href: "/rooms" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  const phone = navbar.phone || "+977 984-081-4142";
  const navLogo = navbar.logo || logoUrl;

  const [scrolled, setScrolled] = useState(false);
  const solid = scrolled || !transparent;
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("pom-theme") as "light" | "dark" | null;
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const next = stored ?? prefers;
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("pom-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_-15px_rgba(0,0,0,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex flex-1 items-center">
          <img src={navLogo} alt="POM'S Penthouse" className="h-16 w-auto" />
        </Link>

        <nav className={`hidden xl:flex flex-1 items-center justify-center gap-5 text-[13px] ${solid ? "text-luxury-black/80" : "text-white/85"}`}>
          {links.map(({ label, href }: { label: string; href: string }) => (
            <Link key={href} to={href} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="relative whitespace-nowrap transition hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <a
            href={`tel:${phone.replace(/[^+\d]/g, "")}`}
            className={`hidden items-center gap-1.5 whitespace-nowrap text-xs font-medium transition lg:inline-flex ${
              solid ? "text-luxury-black hover:text-gold" : "text-white hover:text-gold"
            }`}
          >
            <Phone className="size-3.5 shrink-0" />
            <span className="hidden xl:inline">{phone}</span>
            <span className="xl:hidden">Call</span>
          </a>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition ${
              solid
                ? "text-luxury-black hover:bg-luxury-black/5"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            type="button"
            onClick={openBooking}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black transition hover:brightness-110"
          >
            Book Now <ArrowRight className="size-3.5 shrink-0" />
          </button>

          <MobileMenu scrolled={solid} links={links} />
        </div>
      </div>
    </header>
  );
}
