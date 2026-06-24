import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { Amenities } from "@/components/pom/Amenities";

export const Route = createFileRoute("/amenities")({
  head: () => ({
    meta: [
      { title: "Amenities — POM'S Penthouse" },
      { name: "description", content: "Explore the premium amenities at POM'S Penthouse in Lakeside, Pokhara." },
    ],
  }),
  component: AmenitiesPage,
});

function AmenitiesPage() {
  return (
    <PageLayout transparent={false}>
      <div className="pt-32">
        <Amenities />
      </div>
    </PageLayout>
  );
}
