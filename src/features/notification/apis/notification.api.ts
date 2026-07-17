import { ENDPOINTS } from './../constants/endpoints';
import { HEADERS } from '@/shared/constants/api.constants';
import type {
  NotificationResponse,
  Notification,
  GetNotificationsParams,
} from '../types/notification';

export async function getNotifications(
  params: GetNotificationsParams = {}
): Promise<Notification[]> {
  const { page = 1, limit = 20, type, isRead } = params;

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (type) query.set('type', type);
  if (isRead !== undefined) query.set('isRead', String(isRead));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${ENDPOINTS.NOTIFICATIONS}?${query.toString()}`,
    {
      method: 'GET',
      headers: {
        ...HEADERS.jsonBody,
      },
    }
  );

  const data: NotificationResponse = await res.json();

  if (!data.status) {
    throw new Error(data.message);
  }

  return data.payload;
}
