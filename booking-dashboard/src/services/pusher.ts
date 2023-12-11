import Pusher, { type Channel } from "pusher-js";
import { SubscriptionService } from "@/lib/subscription-service";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

class PusherSubscriptionService extends SubscriptionService {
  service: Pusher | null = null;
  channel: Channel | null = null;

  constructor(channelName: string) {
    super(channelName);
  }

  connect() {
    this.service = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });
    this.channel = this.service?.subscribe(this.channelName) || null;
  }
  disconnect() {
    this.channel?.unsubscribe();
    this.service?.disconnect();
  }

  subscribe<T>(event: string, callback: (data: T) => void) {
    this.channel?.bind(event, callback);
  }
  unsubscribe(event: string) {
    this.channel?.unbind(event);
  }
}

export const pusher = new PusherSubscriptionService("booking");
