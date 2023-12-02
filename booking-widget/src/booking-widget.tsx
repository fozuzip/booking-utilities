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

export const BookingWidget = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[200px]">BOOK NOW</Button>
      </DialogTrigger>
      <DialogContent className="text-base sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Make a booking</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-4">
          <p className=" text-black/40">Choose from the available dates</p>
          <div className="flex h-[350px] w-full items-center justify-center rounded-lg border">
            Calendar
          </div>
          <p className="text-black/40">Select the number of persons</p>
          <div className="flex justify-between px-4 pb-4">
            <Button
              variant="secondary"
              className="flex h-10 w-10 items-center justify-center rounded-full p-0"
              disabled
            >
              <Minus className="h-5 w-5 " />
            </Button>
            <p className="text-xl font-bold text-black/60">1 person</p>
            <Button
              variant="secondary"
              className="flex h-10 w-10 items-center justify-center rounded-full p-0"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button className="rounded-full py-2.5" type="submit">
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
