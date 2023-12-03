import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";

export type Booking = {
  id: number;
  from: string;
  to: string;
  persons: number;
};

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const useGetBookings = (params: {
  bookableId: number;
  from: string;
  to: string;
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { data, ...rest } = useSWR<{
    success: boolean;
    bookings: Booking[];
  }>(["/booking", params], ([url, params]) =>
    api.get(url, { params }).then((res) => res.data),
  );

  useEffect(() => {
    if (data?.bookings) {
      setBookings((prev) => [...new Set([...prev, ...data.bookings])]);
    }
  }, [data?.bookings]);

  return {
    bookings,
    ...rest,
  };
};

export const createBooking = ({
  from,
  to,
  persons,
}: {
  from: string;
  to: string;
  persons: number;
}) => {
  return api.post("/booking", { from, to, persons }).then((res) => res.data);
};
