'use server';

import { ENDPOINTS } from './../constants/endpoints';
import type { Response } from '@/shared/types/api';
import { ReadNotificationRequestBody } from '../types/notification';
import { HEADERS } from '@/shared/constants/api.constants';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

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
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      ...HEADERS.jsonBody,
      Authorization: `Bearer ${session.token}`,
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
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      ...HEADERS.jsonBody,
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.json() as Promise<Response<string>>;
}
