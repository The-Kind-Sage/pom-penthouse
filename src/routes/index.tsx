import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageLayout } from "@/components/pom/PageLayout";
import { Hero } from "@/components/pom/Hero";
// Above-the-fold sections are imported eagerly so they ship in the initial
// bundle and render without any dynamic-import waterfall.
import { Residence } from "@/components/pom/Residence";
import { FAQJsonLd } from "@/components/pom/JsonLd";

// Below-the-fold sections are code-split with React.lazy.
// The browser downloads these chunks only after the initial paint is done,
// which shrinks the main-thread parse/execute cost at startup and directly
// improves TTI and INP scores.
const Rooms = lazy(() => import("@/components/pom/Rooms").then((m) => ({ default: m.Rooms })));
const WhyChoose = lazy(() => import("@/components/pom/WhyChoose").then((m) => ({ default: m.WhyChoose })));
const Amenities = lazy(() => import("@/components/pom/Amenities").then((m) => ({ default: m.Amenities })));
const Statistics = lazy(() => import("@/components/pom/Statistics").then((m) => ({ default: m.Statistics })));
const Lifestyle = lazy(() => import("@/components/pom/Lifestyle").then((m) => ({ default: m.Lifestyle })));
const Gallery = lazy(() => import("@/components/pom/Gallery").then((m) => ({ default: m.Gallery })));
const Location = lazy(() => import("@/components/pom/Location").then((m) => ({ default: m.Location })));
const Testimonial = lazy(() => import("@/components/pom/Testimonial").then((m) => ({ default: m.Testimonial })));
const LongTerm = lazy(() => import("@/components/pom/LongTerm").then((m) => ({ default: m.LongTerm })));
const About = lazy(() => import("@/components/pom/About").then((m) => ({ default: m.About })));
const FAQ = lazy(() => import("@/components/pom/FAQ").then((m) => ({ default: m.FAQ })));
const Offer = lazy(() => import("@/components/pom/Offer").then((m) => ({ default: m.Offer })));

const FAQ_DATA = [
  { q: "What types of apartments are available at POM'S Penthouse?", a: "We offer 1 BHK, 2 BHK, 3 BHK, and Studio apartments, as well as Single, Double, and Twin bed rooms — all fully furnished in Lakeside, Pokhara." },
  { q: "Is POM'S Penthouse good for long-term stays?", a: "Absolutely. We specialize in weekly and monthly stays with discounted rates, fully furnished apartments, utilities included, and flexible contracts — perfect for digital nomads, remote workers, and relocating families." },
  { q: "Where is POM'S Penthouse located?", a: "We are located in Lakeside, Pokhara, Nepal — overlooking Phewa Lake with stunning views of the Annapurna mountain range." },
  { q: "What amenities are included?", a: "All apartments include free WiFi, fully equipped kitchen, parking, laundry facilities, 24/7 security, and housekeeping." },
  { q: "How do I book a stay at POM'S Penthouse?", a: "You can book directly through our website, call us at +977 984-081-4142, or message us on WhatsApp. Our team responds within the hour." },
  { q: "Is parking available?", a: "Yes, free parking is available for all guests at POM'S Penthouse in Lakeside, Pokhara." },
  { q: "Can I see Phewa Lake from the apartments?", a: "Yes, many of our apartments offer stunning views of Phewa Lake and the Annapurna mountain range." },
];

export const Route = createFileRoute("/")({
  // ssr: false keeps client-side rendering — same as the original.
  // Removing it broke components that use browser APIs (window, document)
  // during the server render pass. SSR can be re-enabled later once each
  // section component is audited for SSR safety.
  ssr: false,
  head: () => ({
    meta: [
      { title: "POM'S Penthouse — Luxury Serviced Apartments in Lakeside, Pokhara" },
      {
        name: "description",
        content:
          "Premium serviced apartments in Lakeside, Pokhara. Daily, weekly and monthly stays with hotel comfort and home privacy — overlooking Phewa Lake and the Annapurnas.",
      },
      { name: "keywords", content: "Pokhara serviced apartments, Lakeside Pokhara accommodation, luxury apartments Nepal, Phewa Lake stay, long-term rental Pokhara, digital nomad Pokhara, penthouse Pokhara, hotel Pokhara, best apartments Pokhara, cheap luxury apartments Pokhara" },
      { property: "og:title", content: "POM'S Penthouse — Luxury Serviced Apartments in Lakeside, Pokhara" },
      { property: "og:description", content: "Hotel comfort. Home privacy. Designed for modern travelers, families and digital nomads." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pom-penthouse.vercel.app" },
      { property: "og:image", content: "https://pom-penthouse.vercel.app/favicon/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "POM'S Penthouse — Luxury Serviced Apartments in Lakeside, Pokhara" },
      { name: "twitter:description", content: "Premium serviced apartments in Lakeside, Pokhara with Phewa Lake views." },
      { name: "twitter:image", content: "https://pom-penthouse.vercel.app/favicon/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://pom-penthouse.vercel.app" },
    ],
  }),
  component: Index,
});

// Minimal skeleton shown while a below-fold chunk is loading.
// height matches the approximate section height so there is no CLS when
// the real content swaps in. bg-background keeps it invisible against the page.
function SectionSkeleton() {
  return <div className="w-full py-24 bg-background" aria-hidden="true" />;
}

function Index() {
  return (
    <PageLayout>
      <FAQJsonLd items={FAQ_DATA} />

      {/* ── Above fold — eagerly loaded ── */}
      <Hero />
      <Residence />

      {/* ── Below fold — code-split + content-visibility: auto ── */}
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><Rooms /></div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><WhyChoose /></div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><Amenities /></div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><Statistics /></div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><Lifestyle /></div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><Gallery preview /></div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><Location /></div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><Testimonial /></div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><LongTerm /></div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><About /></div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><FAQ /></div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <div className="section-offscreen"><Offer /></div>
      </Suspense>
    </PageLayout>
  );
}
