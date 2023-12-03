import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/auth-context";
import Main from "@/pages/Main";
import Login from "@/pages/Login";
import { ProtectedRoute } from "@/components/protected-route";
import { ThemeProvider } from "./context/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
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
