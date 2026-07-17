import { Response } from '@/shared/types/api';
import { PushSubscriptionRequestBody } from '../types/push-subscription';
import { ENDPOINTS } from './../constants/endpoints';
import { HEADERS } from '@/shared/constants/api.constants';

export async function subscribeToPush(subscription: PushSubscriptionRequestBody): Promise<string> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${ENDPOINTS.PUSH_SUBSCRIPTIONS}`,
    {
      method: 'POST',
      headers: {
        ...HEADERS.jsonBody,
      },
      body: JSON.stringify(subscription),
    }
  );

  const data: Response<string> = await res.json();

  if (!data.status) {
    throw new Error(data.message);
  }

  return data.payload as string;
}
