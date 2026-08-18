import { Response } from '@/shared/types/api';
import { UnreadCountPayload } from '../types/notification';
import { ENDPOINTS } from '../constants/endpoints';
import { HEADERS } from '@/shared/constants/api.constants';

export const getUnReadCount = async (token: string): Promise<Response<UnreadCountPayload>> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${ENDPOINTS.UNREADED_COUNT}`;

  const response = await fetch(url, {
    headers: {
      ...HEADERS.jsonBody,
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error('unRead Notification count faild');
  }

  return result as Promise<Response<UnreadCountPayload>>;
};
