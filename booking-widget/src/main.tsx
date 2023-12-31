import r2wc from "@r2wc/react-to-web-component";

import { BookingWidget } from "./booking-widget.tsx";

customElements.define(
  "booking-widget",
  r2wc(BookingWidget, {
    props: { title: "string", bookableId: "number", onBooking: "function" },
  }),
);
