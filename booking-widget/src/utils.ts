import { ClassValue, clsx } from "clsx";
import { areIntervalsOverlapping } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasOverlap(
  newRange: { from: Date; to: Date },
  ranges: { from: Date; to: Date }[],
) {
  for (const range of ranges) {
    if (
      areIntervalsOverlapping(
        { start: newRange.from, end: newRange.to },
        { start: range.from, end: range.to },
      )
    ) {
      return true; // Overlap found
    }
  }

  return false; // No overlap found
}
