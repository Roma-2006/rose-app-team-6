// features/notification/apis/subscription.api.ts
'use client';

// import { ENDPOINTS } from '../constants/endpoints';
import urlBase64ToUint8Array from '../lib/url-base64-to-unit8array';
import { saveSubscription } from './../actions/subscription.actions';
import { PushSubscriptionRequestBody } from '../types/push-subscription';
// import { HEADERS } from '@/shared/constants/api.constants';

export async function subscribeToPush() {
  const reg = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;

  // const { vapidKey } = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}${ENDPOINTS.VAPID_PUBLIC_KEY}`, {
  //     method: 'GET',
  //     headers:{
  //       ...HEADERS.jsonBody,
  //     }
  //   }
  // ).then((r) => r.json());

  // console.log('vapid-key : ' , process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY )

  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''),
  });

  const subscriptionJson = subscription.toJSON();

  if (
    !subscriptionJson.endpoint ||
    !subscriptionJson.keys?.p256dh ||
    !subscriptionJson.keys?.auth
  ) {
    throw new Error('Push subscription is missing required fields');
  }

  const body: PushSubscriptionRequestBody = {
    endpoint: subscriptionJson.endpoint,
    keys: {
      p256dh: subscriptionJson.keys.p256dh,
      auth: subscriptionJson.keys.auth,
    },
    // expirationTime: subscriptionJson.expirationTime ?? null,
  };

  await saveSubscription(body);
}
