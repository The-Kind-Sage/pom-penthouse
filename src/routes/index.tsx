import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/pom/Navbar";
import { Hero } from "@/components/pom/Hero";
import { About } from "@/components/pom/About";
import { Gallery } from "@/components/pom/Gallery";
import { Amenities } from "@/components/pom/Amenities";
import { Residence } from "@/components/pom/Residence";
import { BookingSection } from "@/components/pom/BookingSection";
import { Testimonial } from "@/components/pom/Testimonial";
import { Location } from "@/components/pom/Location";
import { Offer } from "@/components/pom/Offer";
import { FAQ } from "@/components/pom/FAQ";
import { Footer } from "@/components/pom/Footer";
import { BookingModal } from "@/components/pom/BookingModal";
import { Lightbox } from "@/components/pom/Lightbox";
import { FloatingBook, BackToTop } from "@/components/pom/Floating";
import { SmoothScroll } from "@/components/pom/SmoothScroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pom PentHouse — Lakeside Sanctuary, Pokhara, Nepal" },
      {
        name: "description",
        content:
          "A luxury penthouse 180m from Phewa Lake, Pokhara. 3 beds, Annapurna views. Book a stay from $189/night.",
      },
      { property: "og:title", content: "Pom PentHouse — Pokhara" },
      { property: "og:description", content: "A Lakeside Sanctuary — Pokhara, Nepal" },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "preload",
        as: "image",
        href: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80&auto=format&fit=crop",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <SmoothScroll />
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Amenities />
      <Residence />
      <BookingSection />
      <Testimonial />
      <Location />
      <Offer />
      <FAQ />
      <Footer />
      <BookingModal />
      <Lightbox />
      <FloatingBook />
      <BackToTop />
      <Toaster position="top-center" />
    </main>
  );
}
