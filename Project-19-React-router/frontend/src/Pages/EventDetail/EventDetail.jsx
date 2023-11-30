import { Await, useRouteLoaderData } from "react-router-dom";
import EventItem from "../../components/EventItem";
import { Suspense } from "react";
import EventsList from "../../components/EventsList";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense>
        <Await resolve={event}>
          {(eventDetail) => <EventItem event={eventDetail.event} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;
