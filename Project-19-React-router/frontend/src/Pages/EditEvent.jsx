import { Await, useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEventPage() {
  const { event } = useRouteLoaderData("event-detail");

  return (
    <Await resolve={event}>
      {(eventDetail) => <EventForm event={eventDetail.event} method="PATCH" />}
    </Await>
  );
}

export default EditEventPage;
