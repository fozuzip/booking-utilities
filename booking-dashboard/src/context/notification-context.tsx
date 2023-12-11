import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { pusher } from "@/services/pusher";
import { Booking } from "@/services/api";
import { useAuth } from "./auth-context";
import { useToast } from "@/components/ui/use-toast";
import { format, parseISO } from "date-fns";
import { ToastAction } from "@/components/ui/toast";

export enum NotificationType {
  BookingCreated = "booking_created",
  BookingUpdated = "booking_updated",
  BookingDeleted = "booking_deleted",
}

export type Notification = {
  id: string;
  type: NotificationType;
  seen: boolean;
  booking: Booking;
};

interface NotificationsContext {
  notifications: Notification[];
  clear: (id: string) => void;
  hasNewNotifications: boolean;
}

const NotificationsContext = createContext<NotificationsContext>({
  notifications: [],
  clear: () => {},
  hasNewNotifications: false,
});
const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotification] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      pusher.connect();
      pusher.subscribe("created", ({ booking }: { booking: Booking }) => {
        const id = uuid();
        setNotification((notifications) => [
          {
            id,
            seen: false,
            type: NotificationType.BookingCreated,
            booking,
          },
          ...notifications,
        ]);

        toast({
          title: "New booking!",
          description: `${format(
            parseISO(booking.from),
            "dd/MM/yyyy",
          )} - ${format(parseISO(booking.to), "dd/MM/yyyy")}`,
          action: (
            <ToastAction altText="ok" onClick={() => clear(id)}>
              Got it
            </ToastAction>
          ),
        });
      });
    }
    return () => {
      pusher.unsubscribe("created");
      pusher.disconnect();
    };
  }, [user]);

  const clear = (id: string) => {
    setNotification((notifications) =>
      notifications.map((notification) =>
        notification.id === id ? { ...notification, seen: true } : notification,
      ),
    );
  };

  const newNotifications = notifications.filter(
    (notification) => !notification.seen,
  ).length;

  // Update the document title with the number of new notifications
  useEffect(() => {
    document.title = `Booking Dashboard ${
      newNotifications > 0 ? `(${newNotifications})` : ""
    }`;
  }, [newNotifications]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        clear,
        hasNewNotifications: newNotifications > 0,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used within an NotificationsProvider",
    );
  }

  return context;
};

export { NotificationsProvider, useNotifications };
