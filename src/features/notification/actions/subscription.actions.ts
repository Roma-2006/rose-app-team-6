// features/notification/apis/subscription.actions.ts
'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { PushSubscriptionRequestBody } from '../types/push-subscription';

export async function saveSubscription(sub: PushSubscriptionRequestBody) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/subscriptions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sub),
  });

  const subscription = await res.json();

  if (!res.status) {
    throw new Error('Failed to save push subscription');
  }
  return subscription;
}
