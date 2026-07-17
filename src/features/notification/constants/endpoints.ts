export const ENDPOINTS = {
  NOTIFICATIONS: '/notifications',
  VAPID_PUBLIC_KEY: '/notifications/vapid-public-key',
  PUSH_SUBSCRIPTIONS: '/notifications/subscriptions',
  UNSUBSCRIBE: '/notifications/subscriptions',
  READ_NOTIFICATION: '/notifications/:notificationId',
  READ_ALL_NOTIFICATIONS: '/notifications/read-all',
} as const;
