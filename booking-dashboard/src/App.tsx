import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from "./context/auth-context";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { ProtectedRoute } from "@/components/protected-route";
import { ThemeProvider } from "./context/theme-provider";
import { Layout } from "./components/layout";
import Bookings from "./pages/Bookings";
import { Calendar } from "lucide-react";

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
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
