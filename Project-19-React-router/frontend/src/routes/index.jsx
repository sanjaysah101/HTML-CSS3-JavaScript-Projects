import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import EventLayout from "../Layouts/EventLayout";
import Home from "../pages/Home";
import EventDetail from "../pages/EventDetail";
import NewEvent from "../pages/NewEvent";
import EditEvent from "../pages/EditEvent";
import Events from "../Pages/Events";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
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
            },
            {
              path: ":eventId",
              element: <EventDetail />,
            },
            {
              path: "new",
              element: <NewEvent />,
            },
            {
              path: ":eventId/edit",
              element: <EditEvent />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
