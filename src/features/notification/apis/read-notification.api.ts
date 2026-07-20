'use server';

import { ENDPOINTS } from './../constants/endpoints';
import type { Response } from '@/shared/types/api';
import { ReadNotificationRequestBody } from '../types/notification';
import { HEADERS } from '@/shared/constants/api.constants';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * PATCH /api/notifications/{id}
 * Update a single notification (e.g. mark as read)
 */
export async function markNotificationAsRead(
  notificationId: string,
  body: ReadNotificationRequestBody = { isRead: true }
): Promise<Response<string>> {
  const url = `${BASE_URL}${ENDPOINTS.READ_NOTIFICATION.replace(
    ':notificationId',
    notificationId
  )}`;

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      ...HEADERS.jsonBody,
    },
    body: JSON.stringify(body),
  });

  return res.json() as Promise<Response<string>>;
}

/**
 * PATCH /api/notifications/mark-all-read
 * Mark all of the current user's notifications as read
 */
export async function markAllNotificationsAsRead(): Promise<Response<string>> {
  const url = `${BASE_URL}${ENDPOINTS.READ_ALL_NOTIFICATIONS}`;

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      ...HEADERS.jsonBody,
    },
  });

  return res.json() as Promise<Response<string>>;
}
