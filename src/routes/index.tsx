import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { Hero } from "@/components/pom/Hero";
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
      { name: "keywords", content: "Pokhara serviced apartments, Lakeside Pokhara accommodation, luxury apartments Nepal, Phewa Lake stay, long-term rental Pokhara, digital nomad Pokhara, penthouse Pokhara" },
      { property: "og:title", content: "POM'S Penthouse — Luxury Serviced Apartments in Lakeside, Pokhara" },
      { property: "og:description", content: "Hotel comfort. Home privacy. Designed for modern travelers, families and digital nomads." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageLayout>
      <Hero />
      <Residence />
      <Rooms />
      <WhyChoose />
      <Amenities />
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
