import { defer, json } from "react-router-dom";
import { API_URL } from "../../util/constant";

async function eventDetail(id) {
  try {
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
  } catch (error) {
    return json({ message: error.message }, { status: 500 });
  }
}

async function loadEvents() {
  try {
    const response = await fetch(`${API_URL}/events`);

    if (!response.ok) {
      return json({ message: "Could not fetch events." }, { status: 500 });
    } else {
      const resData = await response.json();
      return resData.events;
    }
  } catch (error) {
    return json({ message: error.message }, { status: 500 });
  }
}

export default async function loader({ params }) {
  const id = params.eventId;
  return defer({
    event: await eventDetail(id),
    events: loadEvents(),
  });
}
