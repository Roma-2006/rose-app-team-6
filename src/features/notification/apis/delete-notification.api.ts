'use server';

import { ENDPOINTS } from './../constants/endpoints';
import type { Response } from '@/shared/types/api';
import { ReadNotificationRequestBody } from '../types/notification';
import { HEADERS } from '@/shared/constants/api.constants';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * DELETE /api/notifications/{id}
 * Delete a single notification
 */
export async function deleteNotification(
  notificationId: string,
  body: ReadNotificationRequestBody = { isRead: true }
): Promise<Response<string>> {
  const url = `${BASE_URL}${ENDPOINTS.DELETE_NOTIFICATION.replace(
    ':notificationId',
    notificationId
  )}`;
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      ...HEADERS.jsonBody,
      Authorization: `Bearer ${session.token}`,
    },
    body: JSON.stringify(body),
  });

  return res.json() as Promise<Response<string>>;
}

/**
 * DELETE /api/notifications/clear-all
 * Delete all notifications
 */
export async function deleteAllNotifications(): Promise<Response<string>> {
  const url = `${BASE_URL}${ENDPOINTS.DELETE_ALL_NOTIFICATIONS}`;
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      ...HEADERS.jsonBody,
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.json() as Promise<Response<string>>;
}
