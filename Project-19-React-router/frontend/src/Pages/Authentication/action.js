import { json, redirect } from "react-router-dom";

import { API_URL } from "../../util/constant";

export default async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = Object.fromEntries(data.entries());

  try {
    const response = await fetch(`${API_URL}/${mode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }

    // manage JWT token
    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());
    return redirect("/");
  } catch (error) {
    throw json({ message: error.message }, { status: 500 });
  }
}
