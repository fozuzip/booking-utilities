import { Calendar } from "@/components/ui/calendar";
import { useNotifications } from "@/context/notification-context";
import { Booking, fetcher } from "@/services/api";
import { useEffect, useMemo } from "react";
import useSWR from "swr";

const dates = [
  new Date(2023, 12, 13),
  new Date(2023, 12, 14),
  new Date(2023, 12, 15),
  new Date(2023, 12, 24),
];

function CalendarPage() {
  const { data, mutate } = useSWR<{
    success: boolean;
    bookings: Booking[];
  }>("/booking", fetcher);

  // Revalidate the data when a new notification is received
  const { hasNewNotifications } = useNotifications();
  useEffect(() => {
    if (hasNewNotifications) {
      mutate();
    }
  }, [hasNewNotifications]);

  const dates = useMemo(() => {
    const allDates: Date[] = [];

    (data?.bookings || []).forEach((range) => {
      const fromDate = new Date(range.from);
      const toDate = new Date(range.to);

      for (
        let date = fromDate;
        date <= toDate;
        date.setDate(date.getDate() + 1)
      ) {
        allDates.push(new Date(date));
      }
    });

    return allDates;
  }, [data]);

  return (
    <div className="flex h-full items-center justify-center">
      <Calendar
        mode="multiple"
        selected={dates}
        className="rounded-md border"
      />
    </div>
  );
}

export default CalendarPage;
