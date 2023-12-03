import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";

type Booking = {
  id: number;
  from: string;
  to: string;
  persons: number;
};

export type BookingsApiResult = {
  success: boolean;
  bookings: Booking[];
};

export type GetBookingParams = {
  bookableId: number;
  from: string;
  to: string;
};

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

export const useBookings = (params: GetBookingParams) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { data, isLoading, error } = useSWR<BookingsApiResult>(
    ["booking", params],
    ([url, params]) => api.get(url, { params }).then((res) => res.data),
  );

  useEffect(() => {
    if (data?.bookings) {
      setBookings((prev) => [...new Set([...prev, ...data.bookings])]);
    }
  }, [data?.bookings]);

  return {
    bookings,
    isLoading,
    error,
  };
};
