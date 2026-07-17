import { Response } from '@/shared/types/api';
import { UnsubscribeRequestBody } from '../types/push-subscription';
import { ENDPOINTS } from './../constants/endpoints';
import { HEADERS } from '@/shared/constants/api.constants';

export async function unsubscribeFromPush(body: UnsubscribeRequestBody): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${ENDPOINTS.UNSUBSCRIBE}`, {
    method: 'DELETE',
    headers: {
      ...HEADERS.jsonBody,
    },
    body: JSON.stringify(body),
  });

  const data: Response<string> = await res.json();

  if (!data.status) {
    throw new Error(data.message);
  }

  return data.payload as string;
}
