import { Bell } from "lucide-react";

import {
  NotificationType,
  Notification,
  useNotifications,
} from "@/context/notification-context";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn, formatDateRange } from "@/lib/utils";

export const NotificationsMenu = () => {
  const { notifications, markAsSeen } = useNotifications();
  const newNotifications =
    notifications.filter((notification) => !notification.seen).length > 0;

  const renderNotification = (notification: Notification) => {
    const { id, type, booking, seen } = notification;
    const dateStr = formatDateRange(booking.from, booking.to);
    const message =
      type === NotificationType.BookingCreated
        ? `New booking ${dateStr}`
        : type === NotificationType.BookingUpdated
          ? `Changes on booking ${dateStr}`
          : `Canceled booking ${dateStr}`;

    return (
      <DropdownMenuItem key={id} onMouseEnter={() => markAsSeen(id)}>
        <span
          className={cn(
            "mr-2 h-2 w-2 rounded-full bg-green-300 transition-opacity",
            seen && "opacity-0",
          )}
        />
        {message}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <div className="relative">
            <Bell size={20} />
            {newNotifications && (
              <div className="absolute right-0 top-0 -mr-1 -mt-1 h-3 w-3 rounded-full bg-red-500" />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            return renderNotification(notification);
          })
        ) : (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
