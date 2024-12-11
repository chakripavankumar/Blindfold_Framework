import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom"
import AppLayout from "./layouts/app-layout"
import LandingPage from "./pages/landing-page"
import Dashboard from "./pages/Dashboard"
import Auth from "./pages/Auth"
import Link from "./pages/Link"
import RedirectLink from "./pages/RedirectLink"
import UrlProvider from "./context"
import RequireAuth from "./components/require-auth"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
 return (
  <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  )
}

export default App
