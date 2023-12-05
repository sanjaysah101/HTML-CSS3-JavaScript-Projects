import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import { API_URL } from "../../util/constant";

export default async function deleteAction({ params, request }) {
  const eventId = params.eventId;
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      method: request.method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return json({ message: "Could not delete event." }, { status: 500 });
    } else {
      return redirect("/events");
    }
  } catch (error) {
    return json({ message: error.message }, { status: 500 });
  }
}
