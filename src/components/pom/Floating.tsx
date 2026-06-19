import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { ui } from "@/lib/ui-store";

export function FloatingBook() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={ui.openBooking}
      className="md:hidden fixed bottom-5 right-5 z-40 btn-primary !py-3 !px-5 text-sm shadow-[var(--shadow-lift)]"
    >
      Book
    </button>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="hidden md:flex fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[var(--charcoal)] text-[var(--sand)] items-center justify-center shadow-[var(--shadow-lift)] hover:scale-105 transition"
    >
      <ArrowUp size={18} />
    </button>
  );
}
