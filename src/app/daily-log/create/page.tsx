import React from "react";
import EventForm from "@/components/shared/EventForm";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Container_with_nav from "@/components/ui/Container_with_nav";

export default function CreateEventPage() {
  return (
    <Container_with_nav page_title="Events">
      <div className="flex flex-col w-full">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Event", href: "/daily-log" },
            {
              label: "Create new Event",
              href: "/daily-log/create",
              active: true,
            },
          ]}
        />

        <EventForm />
      </div>
    </Container_with_nav>
  );
}
