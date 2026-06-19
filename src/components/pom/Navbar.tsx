import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { ui } from "@/lib/ui-store";

const links = [
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#residence", label: "Residence" },
  { href: "#location", label: "Location" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("pom-theme") as "light" | "dark" | null;
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const next = stored ?? prefers;
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("pom-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 border-b" : "py-5 border-b border-transparent"
      }`}
      style={{
        background: scrolled ? "color-mix(in srgb, var(--paper) 78%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 flex items-center justify-between">
        <a
          href="#top"
          className="glitch-hover font-display text-2xl tracking-tight"
          aria-label="Pom PentHouse home"
        >
          Pom
        </a>

        <nav className="hidden md:flex items-center gap-9 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-underline opacity-80 hover:opacity-100">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={ui.openBooking}
            className="hidden md:inline-flex btn-ghost !py-2.5 !px-5 text-sm"
          >
            Book a Stay
          </button>
          <button className="md:hidden p-2" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-[var(--paper)] flex flex-col">
          <div className="flex justify-between items-center px-6 py-5 border-b">
            <span className="font-display text-2xl">Pom</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl animate-[fade-in_0.5s_ease-out_both]"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                ui.openBooking();
              }}
              className="btn-primary mt-6"
            >
              Book a Stay
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
