import { useState, useMemo } from "react";
import { ChevronRight, Loader2, Minus, Plus } from "lucide-react";

import { Button } from "./components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog";

import "./index.css";
import { Calendar } from "./components/calendar";
import { DateRange } from "react-day-picker";
import { startOfMonth, sub, format, endOfMonth } from "date-fns";

import { Booking, createBooking, useGetBookings } from "./apiService";
import { hasOverlap } from "./utils";

interface BookingProps {
  title: string;
  bookableId: number;
  onBooking: (booking: Booking) => void;
}
export const BookingWidget = ({
  title,
  bookableId,
  onBooking,
}: BookingProps) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(new Date());

  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [selectedPersons, setSelectedPersons] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { bookings, isLoading, mutate } = useGetBookings({
    bookableId,
    from: format(startOfMonth(month), "yyyy-MM-dd"),
    to: format(endOfMonth(month), "yyyy-MM-dd"),
  });

  const disabledDays = useMemo(
    () =>
      bookings.map((booking) => ({
        from: new Date(booking.from),
        to: new Date(booking.to),
      })),
    [bookings],
  );

  const onContinue = async () => {
    setIsSubmitting(true);
    const { success, booking } = await createBooking({
      from: format(range.from!, "yyyy-MM-dd"),
      to: format(range.to!, "yyyy-MM-dd"),
      persons: selectedPersons,
    });
    setIsSubmitting(false);

    if (!success) return;

    setRange({ from: undefined, to: undefined });
    setOpen(false);
    mutate();

    onBooking(booking);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[200px]" disabled={isLoading}>
          {isLoading ? "LOADING..." : "BOOK NOW"}
        </Button>
      </DialogTrigger>
      <DialogContent className="text-base sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-4">
          <p className=" text-black/40">Choose from the available dates</p>
          <Calendar
            month={month}
            onMonthChange={setMonth}
            fromDate={sub(new Date(), { days: 1 })}
            disabled={disabledDays}
            selected={range}
            onSelect={setRange}
          />
          <p className="text-black/40">Select the number of persons</p>
          <div className="flex justify-between px-4 pb-4">
            <Button
              variant="secondary"
              className="flex h-10 w-10 items-center justify-center rounded-full p-0"
              disabled={selectedPersons === 1}
              onClick={() => setSelectedPersons((prev) => prev - 1)}
            >
              <Minus className="h-5 w-5 " />
            </Button>
            <p className="text-xl font-bold text-black/60">{`${selectedPersons} ${
              selectedPersons > 1 ? "persons" : "person"
            }`}</p>
            <Button
              variant="secondary"
              className="flex h-10 w-10 items-center justify-center rounded-full p-0"
              onClick={() => setSelectedPersons((prev) => prev + 1)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="rounded-full py-2.5"
            type="submit"
            disabled={!range?.from || !range?.to}
            onClick={onContinue}
          >
            <div className="flex items-center gap-2 text-sm">
              <span>Continue</span>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
