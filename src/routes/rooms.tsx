import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { Rooms } from "@/components/pom/Rooms";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms — POM'S Penthouse" },
      { name: "description", content: "Browse our rooms in Lakeside, Pokhara. Single, Double, and Twin Bed options." },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <PageLayout transparent={false}>
      <div className="pt-32">
        <Rooms />
      </div>
    </PageLayout>
  );
}
