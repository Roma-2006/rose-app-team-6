import { NotificationType } from './../constants/notifications';

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  type?: NotificationType;
  isRead?: boolean;
}

export interface NotificationResponse {
  status: boolean;
  message: string;
  payload: NotificationsPayload;
}

export interface ReadNotificationRequestBody {
  isRead: boolean;
}

interface NotificationsPayload {
  data: Notification[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface NotificationsListProps {
  initialNotifications: Notification[];
}

export interface NotificationItemProps {
  notification: Notification;
  onRead: (notificationId: string) => void;
  onDelete: (notificationId: string) => void;
}

export interface UnreadCountPayload {
  unreadCount: number;
}

export interface PushStatusPayload {
  pushConfigured: boolean;
  subscriptionCount: number;
  unreadCount: number;
}
