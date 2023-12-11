import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { ThemeProvider } from "./context/theme-provider";
import { AuthProvider } from "./context/auth-context";
import { NotificationsProvider } from "./context/notification-context";

import { ProtectedRoute } from "@/components/protected-route";
import { Layout } from "./components/layout";

import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Bookings from "./pages/Bookings";
import Calendar from "./pages/Calendar";
import { Toaster } from "./components/ui/toaster";

const routesWithLayout = (routes: RouteObject[]) =>
  routes.map((route) => ({
    ...route,
    element: <Layout>{route.element}</Layout>,
  }));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  ...routesWithLayout([
    {
      path: "/",

      element: (
        <ProtectedRoute>
          <Navigate to="/home" />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home",

      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/bookings",

      element: (
        <ProtectedRoute>
          <Bookings />
        </ProtectedRoute>
      ),
    },
    {
      path: "/calendar",

      element: (
        <ProtectedRoute>
          <Calendar />
        </ProtectedRoute>
      ),
    },
  ]),
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <NotificationsProvider>
          <RouterProvider router={router} />
          <Toaster />
        </NotificationsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
