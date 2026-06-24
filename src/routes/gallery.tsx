import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { Gallery } from "@/components/pom/Gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — POM'S Penthouse" },
      { name: "description", content: "View photos of POM'S Penthouse luxury serviced apartments in Lakeside, Pokhara." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <PageLayout transparent={false}>
      <div className="pt-32">
        <Gallery />
      </div>
    </PageLayout>
  );
}
