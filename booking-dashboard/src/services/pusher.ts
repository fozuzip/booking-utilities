import Pusher from "pusher-js";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

console.log("init pusher");

export const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
});

// export const channel = pusher.subscribe("my-channel");
// channel.bind("my-event", function (data) {
//   alert(JSON.stringify(data));
// });
