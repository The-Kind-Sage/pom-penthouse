import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { About } from "@/components/pom/About";
import { Lifestyle } from "@/components/pom/Lifestyle";
import { Location } from "@/components/pom/Location";
import { LongTerm } from "@/components/pom/LongTerm";
import { FAQ } from "@/components/pom/FAQ";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — POM'S Penthouse" },
      { name: "description", content: "Learn about POM'S Penthouse — luxury serviced apartments in Lakeside, Pokhara." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageLayout transparent={false}>
      <div className="pt-32">
        <About />
        <Lifestyle />
        <Location />
        <LongTerm />
        <FAQ />
      </div>
    </PageLayout>
  );
}
