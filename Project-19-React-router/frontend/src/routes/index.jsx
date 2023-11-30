import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "../Layouts/RootLayout";
import EventLayout from "../Layouts/EventLayout";

import Home from "../pages/Home";
import {
  EventDetailPage,
  deleteAction as deleteEventAction,
  eventLoader as eventDetailLoader,
} from "../Pages/EventDetail";
import NewEvent from "../Pages/NewEvent";
import EditEvent from "../pages/EditEvent";
import {
  EventsPage,
  loader as eventsLoader,
  action as manipulateEventAction,
} from "../Pages/Events";
import Error from "../Pages/Error";
import {
  NewsletterPage,
  action as newsLetterAction,
} from "../Pages/Newsletter";

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
              element: <EventsPage />,
              loader: eventsLoader,
            },
            {
              path: ":eventId",
              loader: eventDetailLoader,
              id: "event-detail",
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
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
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsLetterAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
