export interface PushSubscriptionRequestBody {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface UnsubscribeRequestBody {
  endpoint: string;
}
