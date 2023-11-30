import { defer, json } from "react-router-dom";

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

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
