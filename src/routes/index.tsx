import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { Hero } from "@/components/pom/Hero";
import { VideoScroll } from "@/components/pom/VideoScroll";
import { Residence } from "@/components/pom/Residence";
import { Rooms } from "@/components/pom/Rooms";
import { WhyChoose } from "@/components/pom/WhyChoose";
import { Amenities } from "@/components/pom/Amenities";
import { Lifestyle } from "@/components/pom/Lifestyle";
import { Gallery } from "@/components/pom/Gallery";
import { Location } from "@/components/pom/Location";
import { Testimonial } from "@/components/pom/Testimonial";
import { LongTerm } from "@/components/pom/LongTerm";
import { About } from "@/components/pom/About";
import { Offer } from "@/components/pom/Offer";
import { FAQ } from "@/components/pom/FAQ";
import { Statistics } from "@/components/pom/Statistics";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/pom/JsonLd";

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

function Index() {
  return (
    <PageLayout>
      <Hero />
      <VideoScroll />
      <Residence />
      <Rooms />
      <WhyChoose />
      <Amenities />
      <Statistics />
      <Lifestyle />
      <Gallery preview />
      <Location />
      <Testimonial />
      <LongTerm />
      <About />
      <FAQ />
      <Offer />
    </PageLayout>
  );
}
