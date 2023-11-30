import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEvent() {
  const eventDetail = useRouteLoaderData("event-detail");

  return <EventForm event={eventDetail.event} />;
}

export default EditEvent;
