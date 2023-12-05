import { defer, json } from "react-router-dom";
import { API_URL } from "../../util/constant";

async function loadEvents() {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) {
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export default async function loader() {
  return defer({
    events: loadEvents(),
  });
}
