import { useAuth } from "@/context/auth-context";
import { Button } from "./ui/button";

export const LogoutButton = () => {
  const { logout } = useAuth();

  return <Button onClick={logout}>Logout</Button>;
};
