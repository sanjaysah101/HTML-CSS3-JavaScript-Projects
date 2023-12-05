import { redirect } from "react-router-dom";

import { getAuthToken } from "../../util/auth";

export default function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
