export const ENDPOINTS = {
  NOTIFICATIONS: '/notifications',
  VAPID_PUBLIC_KEY: '/notifications/vapid-public-key',
  UNREADED_COUNT: '/notifications/unread-count',
  PUSH_STATUS: '/notifications/push-status',
  PUSH_SUBSCRIPTIONS: '/notifications/subscriptions',
  UNSUBSCRIBE: '/notifications/subscriptions',
  READ_NOTIFICATION: '/notifications/:notificationId',
  READ_ALL_NOTIFICATIONS: '/notifications/mark-all-read',
  DELETE_NOTIFICATION: '/notifications/:notificationId',
  DELETE_ALL_NOTIFICATIONS: '/notifications/clear-all',
} as const;
