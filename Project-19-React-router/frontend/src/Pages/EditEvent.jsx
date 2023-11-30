import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEventPage() {
  const eventDetail = useRouteLoaderData("event-detail");

  return <EventForm event={eventDetail.event} method="PATCH" />;
}

export default EditEventPage;
