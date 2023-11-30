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
import { Authentication, action as AuthAction } from "../Pages/Authentication";
import { action as logoutAction } from "../Pages/Logout";
import { checkAuthLoader, tokenLoader } from "../util/auth";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      id: "root",
      loader: tokenLoader,
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
                  loader: checkAuthLoader,
                },
              ],
            },
            {
              path: "new",
              element: <NewEvent />,
              action: manipulateEventAction,
              loader: checkAuthLoader,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsLetterAction,
        },
        {
          path: "auth",
          element: <Authentication />,
          action: AuthAction,
        },
        {
          path: "logout",
          action: logoutAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
