import { useState, useEffect } from "react";
import { ChevronRight, Minus, Plus } from "lucide-react";

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
import { sub } from "date-fns";

interface BookingProps {
  title: string;
  bookingId: number;
}
export const BookingWidget = ({ title, bookingId }: BookingProps) => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedPersons, setSelectedPersons] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams({
      bookingId: bookingId.toString(),
      from: "2023-12-03",
      to: "2023-12-31",
    });
    fetch(`/api/bookable?${params}`)
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[200px]">BOOK NOW</Button>
      </DialogTrigger>
      <DialogContent className="text-base sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-4">
          <p className=" text-black/40">Choose from the available dates</p>
          <Calendar
            mode="range"
            fromDate={sub(new Date(), { days: 1 })}
            selected={range}
            onSelect={setRange}
            className="rounded-md border"
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
            >
              <Plus
                className="h-5 w-5"
                onClick={() => setSelectedPersons((prev) => prev + 1)}
              />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="rounded-full py-2.5"
            type="submit"
            disabled={!range.from || !range.to}
          >
            <div className="flex items-center gap-2 text-sm">
              <span>Continue</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
