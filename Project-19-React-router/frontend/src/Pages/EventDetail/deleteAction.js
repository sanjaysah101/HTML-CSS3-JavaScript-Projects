import { json, redirect } from "react-router-dom";

export default async function deleteAction({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });

  if (!response.ok) {
    return json({ message: "Could not delete event." }, { status: 500 });
  } else {
    return redirect("/events");
  }
}
