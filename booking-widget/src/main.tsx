import r2wc from "@r2wc/react-to-web-component";

import { BookingWidget } from "./booking-widget.tsx";

import { makeServer } from "./server";

makeServer();

customElements.define(
  "web-greeting",
  r2wc(BookingWidget, { props: { title: "string", bookingId: "number" } }),
);
