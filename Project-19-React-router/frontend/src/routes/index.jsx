import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "../Layouts/RootLayout";
import EventLayout from "../Layouts/EventLayout";

import { action as logoutAction } from "../Pages/Logout";
import {
  Authentication,
  action as AuthAction,
  loader as checkAuthLoader,
} from "../Pages/Authentication";
import EditEvent from "../Pages/EditEvent";
import Error from "../Pages/Error";
import Home from "../pages/Home";
import NewEvent from "../Pages/NewEvent";
import {
  EventDetailPage,
  deleteAction as deleteEventAction,
  eventLoader as eventDetailLoader,
} from "../Pages/EventDetail";
import {
  EventsPage,
  loader as eventsLoader,
  action as manipulateEventAction,
} from "../Pages/Events";
import {
  NewsletterPage,
  action as newsLetterAction,
} from "../Pages/Newsletter";

import { getAuthToken } from "../util/auth";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      id: "root",
      loader: getAuthToken,
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
