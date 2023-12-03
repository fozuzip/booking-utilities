import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  console.log({ user });
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
