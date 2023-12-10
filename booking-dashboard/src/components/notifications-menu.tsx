import { Bell } from "lucide-react";
import { Button } from "./ui/button";

export const NotificationsMenu = () => {
  return (
    <Button variant="ghost" size="icon">
      <Bell size={20} />
    </Button>
  );
};
