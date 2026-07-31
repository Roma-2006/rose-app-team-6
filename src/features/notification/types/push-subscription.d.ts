export interface PushSubscriptionRequestBody {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  // expirationTime : number | null;
}

export interface UnsubscribeRequestBody {
  endpoint: string;
}
