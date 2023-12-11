export abstract class SubscriptionService {
  channelName: string;

  constructor(channelName: string) {
    this.channelName = channelName;
  }

  abstract connect(): void;
  abstract disconnect(): void;

  abstract subscribe(event: string, callback: (data: object) => void): void;
  abstract unsubscribe(event: string): void;
}
