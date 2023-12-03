import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/auth-context";
import Main from "@/pages/Main";
import Login from "@/pages/Login";
import { ProtectedRoute } from "@/components/protected-route";

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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
