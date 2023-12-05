import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import { API_URL } from "../../util/constant";

export default async function action({ request, params }) {
  try {
    const method = request.method;
    const data = await request.formData();
    const token = getAuthToken();

    const eventData = Object.fromEntries(data.entries());

    const url = `${API_URL}/events/${
      method === "PATCH" ? `${params.eventId}` : ""
    }`;

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not save event." }, { status: 500 });
    }
    return redirect("/events");
  } catch (error) {
    console.log(error);
    throw json({ message: error?.message }, { status: 500 });
  }
}
