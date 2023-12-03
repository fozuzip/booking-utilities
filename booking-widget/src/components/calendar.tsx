import * as React from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";

import { cn, hasOverlap } from "../utils";
import { Button } from "./button";
import { isSameMonth } from "date-fns";

type CalendarProps = Omit<
  React.ComponentProps<typeof DayPicker>,
  "selected"
> & {
  onMonthChange: (month: Date) => void;
  onSelect: (range: DateRange) => void;
  selected: DateRange;
  disabled: { from: Date; to: Date }[];
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  month,
  selected,
  onSelect,
  onMonthChange,
  disabled,
  ...props
}: CalendarProps) {
  const today = new Date();

  const onRangeChange = (range: DateRange | undefined) => {
    if (!range) {
      onSelect({ from: undefined, to: undefined });
      return;
    }
    if (
      range?.from &&
      range?.to &&
      hasOverlap({ from: range.from, to: range.to }, disabled)
    )
      return;
    onSelect(range);
  };

  return (
    <DayPicker
      mode="range"
      month={month}
      disabled={disabled}
      selected={selected}
      onSelect={onRangeChange}
      onMonthChange={onMonthChange}
      showOutsideDays={showOutsideDays}
      className={cn("rounded-md border p-3", className)}
      classNames={{
        months: "w-full",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button:
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between w-full",
        head_cell:
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem]",
        row: "flex w-full mt-2 justify-between ",
        cell: "h-9 flex-1 text-center text-sm p-0 relative [&:has([aria-selected].day-outside)]:bg-blue-500/50 [&:has([aria-selected])]:bg-blue-500 [&:has([aria-selected])]:rounded-l-md [&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-full p-0 font-normal aria-selected:opacity-100",

        day_range_start: "day-range-start rounded-l-md ",
        day_range_end: "day-range-end rounded-r-md",
        day_selected:
          "bg-blue-800 text-white hover:bg-blue-800 hover:text-white focus:bg-blue-800 focus:text-white",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside opacity-50",
        day_disabled: "opacity-50",
        day_range_middle:
          "aria-selected:bg-blue-500 aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      footer={
        <div className="px-4 pt-2">
          <Button
            variant="ghost"
            className="p-0"
            disabled={month && isSameMonth(today, month)}
            onClick={() => {
              onMonthChange(today);
            }}
          >
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              <span>JUMP TO TODAY</span>
            </div>
          </Button>
        </div>
      }
      {...props}
    />
  );
}

export { Calendar };
