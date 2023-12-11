import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: AxiosError): string {
  if (error.response) {
    return error.response.data;
  } else {
    return error.message;
  }
}

export function formatDateRange(from: string, to: string): string {
  return `${format(parseISO(from), "dd/MM/yyyy")} - ${format(
    parseISO(to),
    "dd/MM/yyyy",
  )}`;
}
