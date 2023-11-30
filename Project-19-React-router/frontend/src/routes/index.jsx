import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "../Layouts/RootLayout";
import EventLayout from "../Layouts/EventLayout";

import Home from "../pages/Home";
import {
  EventDetail,
  deleteAction as deleteEventAction,
  eventLoader as eventDetailLoader,
} from "../Pages/EventDetail";
import { NewEvent, newEventAction } from "../Pages/NewEvent";
import EditEvent from "../pages/EditEvent";
import Events from "../Pages/Events";
import Error from "../Pages/Error";

import { loader as eventsLoader } from "../Pages/Events/loader";

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
                },
              ],
            },
            {
              path: "new",
              element: <NewEvent />,
              action: newEventAction,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
