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
  payload: Notification[];
}

export interface ReadNotificationRequestBody {
  isRead: boolean;
}
