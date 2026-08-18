import { Response } from '@/shared/types/api';
import { PushStatusPayload } from '../types/notification';
import { ENDPOINTS } from '../constants/endpoints';
import { HEADERS } from '@/shared/constants/api.constants';

export const getPushStatus = async (token: string): Promise<Response<PushStatusPayload>> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${ENDPOINTS.PUSH_STATUS}`;

  const response = await fetch(url, {
    headers: {
      ...HEADERS.jsonBody,
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error('Push status fetch faild');
  }

  return result as Promise<Response<PushStatusPayload>>;
};
