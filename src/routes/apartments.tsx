import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { Residence } from "@/components/pom/Residence";
import { WhyChoose } from "@/components/pom/WhyChoose";

export const Route = createFileRoute("/apartments")({
  head: () => ({
    meta: [
      { title: "Apartments — POM'S Penthouse" },
      { name: "description", content: "Browse our luxury serviced apartments in Lakeside, Pokhara. 3 BHK, 2 BHK, 1 BHK, and Studio options available." },
    ],
  }),
  component: ApartmentsPage,
});

function ApartmentsPage() {
  return (
    <PageLayout transparent={false}>
      <div className="pt-24">
        <Residence />
        <WhyChoose />
      </div>
    </PageLayout>
  );
}
