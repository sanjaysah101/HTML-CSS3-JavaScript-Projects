import { defer, json } from "react-router-dom";
import { API_URL } from "../../util/constant";

async function eventDetail(id) {
  const response = await fetch(`${API_URL}/events/${id}`);

  if (!response.ok) {
    return json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

async function loadEvents() {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) {
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export default async function loader({ params }) {
  const id = params.eventId;
  return defer({
    event: await eventDetail(id),
    events: loadEvents(),
  });
}
