import { json } from "react-router-dom";

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // Handling Error with Response object

    /* 
        throw new Response(JSON.stringify({ message: "Could not fetch events" }), 
            { status: 500}
        );
    */

    // Handling error with built in component of react-router-dom
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
