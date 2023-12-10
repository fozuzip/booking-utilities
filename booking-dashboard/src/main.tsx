import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

import { pusher } from "@/services/pusher";

const channel = pusher.subscribe("booking");
channel.bind("created", function (data) {
  alert(JSON.stringify(data));
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
