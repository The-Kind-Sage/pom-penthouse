import type { ReactNode } from "react";
import { Navbar } from "@/components/pom/Navbar";
import { Footer } from "@/components/pom/Footer";
import { FloatingBook, BackToTop } from "@/components/pom/Floating";
import { BookingModal } from "@/components/pom/BookingModal";
import { Lightbox } from "@/components/pom/Lightbox";
import { SmoothScroll } from "@/components/pom/SmoothScroll";

export function PageLayout({ children, transparent }: { children: ReactNode; transparent?: boolean }) {
  return (
    <div className="bg-background text-foreground">
      <SmoothScroll />
      <Navbar transparent={transparent} />
      <main>{children}</main>
      <Footer />
      <FloatingBook />
      <BackToTop />
      <BookingModal />
      <Lightbox />
    </div>
  );
}
