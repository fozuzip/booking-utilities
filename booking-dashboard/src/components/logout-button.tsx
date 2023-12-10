import { useAuth } from "@/context/auth-context";
import { Button } from "./ui/button";
import { UserX } from "lucide-react";

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button onClick={logout} variant="ghost" size="icon">
      <UserX size={20} />
    </Button>
  );
};
