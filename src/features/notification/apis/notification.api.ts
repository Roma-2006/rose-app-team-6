import type { GetNotificationsParams, Notification } from '../types/notification';

export interface NotificationsResponse {
  data: Notification[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getNotifications = async (
  params: GetNotificationsParams,
  token: string
): Promise<NotificationsResponse> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/notifications`);

  url.searchParams.set('page', String(params.page ?? 1));
  url.searchParams.set('limit', String(params.limit ?? 20));

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }

  const result = await response.json();

  return {
    data: result.payload?.data ?? [],
    metadata: result.payload?.metadata ?? { page: 1, limit: 20, total: 0, totalPages: 1 },
  };
};
