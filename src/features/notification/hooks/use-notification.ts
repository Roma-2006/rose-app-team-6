'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { subscribeToPush } from '../apis/subscription.api';
import { unsubscribeFromPush } from '../apis/unsubscription.api';
// import { getVapidPublicKey } from '../apis/vapid-public-key.api';
import { getNotifications } from '../apis/notification.api';
import { markNotificationAsRead, markAllNotificationsAsRead } from '../apis/read-notification.api';
// import urlBase64ToUint8Array from './../lib/url-base64-to-unit8array';
// import type { PushSubscriptionRequestBody } from '../types/push-subscription';
import type { ReadNotificationRequestBody } from '../types/notification';
import type { GetNotificationsParams } from '../types/notification';

// Central query key
export const notificationsKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationsKeys.all, 'list'] as const,
  list: (params: GetNotificationsParams) => [...notificationsKeys.lists(), params] as const,
  vapidKey: ['vapid-public-key'] as const,
};

// ---------- Notifications list ----------

export function useNotificationsList(params: GetNotificationsParams = {}) {
  return useQuery({
    queryKey: notificationsKeys.list(params),
    queryFn: () => getNotifications(params),
  });
}

// ---------- VAPID key ----------

// export function useVapidPublicKey() {
//   return useQuery({
//     queryKey: notificationsKeys.vapidKey,
//     // queryFn: getVapidPublicKey,
//     staleTime: Infinity, // The VAPID key doesn't change during the session
//     gcTime: Infinity,
//     retry: false, // no retry on failure
//   });
// }

// ---------- Push subscription ----------

export function usePushSubscription() {
  // const { data: vapidKey } = useVapidPublicKey();

  async function subscribe() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      throw new Error('Push not supported in this browser');
    }
    // if (!vapidKey) throw new Error('VAPID key not loaded yet');

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') throw new Error('Permission denied');

    // const registration = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;

    // const subscription = await registration.pushManager.subscribe({
    //   userVisibleOnly: true,
    //   applicationServerKey: urlBase64ToUint8Array(vapidKey || ""),
    // });

    // const subscriptionJson = subscription.toJSON() as PushSubscriptionRequestBody;
    const subscription = await subscribeToPush();

    return subscription;
  }

  async function unsubscribe() {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();

    if (!subscription) return;

    await unsubscribeFromPush({ endpoint: subscription.endpoint });
    await subscription.unsubscribe();
  }

  return { subscribe, unsubscribe };
}

// ---------- Mark as read / read all ----------

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      notificationId,
      body,
    }: {
      notificationId: string;
      body?: ReadNotificationRequestBody;
    }) => markNotificationAsRead(notificationId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
    },
  });
}

/**
 * Single entry point for all notification operations.
 * Add future mutations/queries (e.g. useNotificationsList, useDeleteNotification)
 * as their own `use...` hooks above, then expose them here.
 */
export function useNotifications() {
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const { subscribe, unsubscribe } = usePushSubscription();
  // const { data: vapidKey, isLoading: isLoadingVapidKey } = useVapidPublicKey();

  return {
    markAsRead: markAsRead.mutate,
    markAsReadAsync: markAsRead.mutateAsync,
    isMarkingAsRead: markAsRead.isPending,

    markAllAsRead: markAllAsRead.mutate,
    markAllAsReadAsync: markAllAsRead.mutateAsync,
    isMarkingAllAsRead: markAllAsRead.isPending,

    subscribe,
    unsubscribe,
    // vapidKey,
    // isLoadingVapidKey,
  };
}
