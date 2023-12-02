import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Events from "../components/Events/Events";
import EventDetails from "../components/Events/EventDetails";
import NewEvent from "../components/Events/NewEvent";
import EditEvent, {
  loader as editEventLoader,
  action as editEventAction,
} from "../components/Events/EditEvent";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/events" />,
    },
    {
      path: "/events",
      element: <Events />,

      children: [
        {
          path: "/events/new",
          element: <NewEvent />,
        },
      ],
    },
    {
      path: "/events/:id",
      element: <EventDetails />,
      children: [
        {
          path: "/events/:id/edit",
          element: <EditEvent />,
          loader: editEventLoader,
          action: editEventAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
