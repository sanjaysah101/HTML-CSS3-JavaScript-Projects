import { json, redirect } from "react-router-dom";

export default async function action({ request }) {
  const data = await request.formData();

  const eventData = Object.fromEntries(data.entries());

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/events");
}
