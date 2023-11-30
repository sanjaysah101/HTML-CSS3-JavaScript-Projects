import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "../Layouts/RootLayout";
import EventLayout from "../Layouts/EventLayout";

import Home from "../pages/Home";
import {
  EventDetail,
  deleteAction as deleteEventAction,
  eventLoader as eventDetailLoader,
} from "../Pages/EventDetail";
import NewEvent from "../Pages/NewEvent";
import EditEvent from "../pages/EditEvent";
import {
  Events,
  loader as eventsLoader,
  action as manipulateEventAction,
} from "../Pages/Events";
import Error from "../Pages/Error";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "events",
          element: <EventLayout />,
          children: [
            {
              index: true,
              element: <Events />,
              loader: eventsLoader,
            },
            {
              path: ":eventId",
              loader: eventDetailLoader,
              id: "event-detail",
              children: [
                {
                  index: true,
                  element: <EventDetail />,
                  action: deleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEvent />,
                  action: manipulateEventAction,
                },
              ],
            },
            {
              path: "new",
              element: <NewEvent />,
              action: manipulateEventAction,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
