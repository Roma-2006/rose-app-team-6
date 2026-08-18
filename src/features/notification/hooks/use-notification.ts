'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { subscribeToPush } from '../apis/subscription.api';
import { unsubscribeFromPush } from '../apis/unsubscription.api';
import { getVapidPublicKey } from '../apis/vapid-public-key.api';
import { getNotifications } from '../apis/notification.api';
import { getUnReadCount } from '../apis/unreaded-count.api';
import { markNotificationAsRead, markAllNotificationsAsRead } from '../apis/read-notification.api';
import { deleteAllNotifications, deleteNotification } from '../apis/delete-notification.api';
import { getPushStatus } from '../apis/push-status.api';
import type { ReadNotificationRequestBody } from '../types/notification';
import type { GetNotificationsParams } from '../types/notification';
import { useSession } from 'next-auth/react';

// Central query key
export const notificationsKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationsKeys.all, 'list'] as const,
  list: (params: GetNotificationsParams) => [...notificationsKeys.lists(), params] as const,
  unreadCount: () => [...notificationsKeys.all, 'unread-count'] as const,
  vapidKey: ['vapid-public-key'] as const,
  pushStatus: () => [...notificationsKeys.all, 'push-status'] as const,
};

// ---------- Notifications list ----------
export function useNotificationsList(
  params: Omit<GetNotificationsParams, 'page'> = {},
  token: string
) {
  return useInfiniteQuery({
    queryKey: notificationsKeys.list(params),
    queryFn: ({ pageParam }) => getNotifications({ ...params, page: pageParam }, token),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.metadata.page < lastPage.metadata.totalPages
        ? lastPage.metadata.page + 1
        : undefined,
    enabled: !!token,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  });
}

// ---------- Unread count ----------
export function useUnreadCount(token: string) {
  return useQuery({
    queryKey: notificationsKeys.unreadCount(),
    queryFn: () => getUnReadCount(token),
    enabled: !!token,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  });
}

// ---------- VAPID key ----------
// Fetched from the server (step 3) — never read from a client env var.
export function useVapidPublicKey() {
  return useQuery({
    queryKey: notificationsKeys.vapidKey,
    queryFn: getVapidPublicKey,
    staleTime: Infinity, // doesn't change during the session
    gcTime: Infinity,
    retry: false,
  });
}

// ---------- Push status (gates the opt-in UI, step 2) ----------
export function usePushStatus(token: string) {
  return useQuery({
    queryKey: notificationsKeys.pushStatus(),
    queryFn: () => getPushStatus(token),
    enabled: !!token,
    staleTime: 5 * 60_000,
  });
}

// ---------- Push subscription ----------
export function usePushSubscription() {
  const queryClient = useQueryClient();

  async function subscribe() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      throw new Error('Push not supported in this browser');
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') throw new Error('Permission denied');

    const vapidKeyResponse = await queryClient.fetchQuery({
      queryKey: notificationsKeys.vapidKey,
      queryFn: getVapidPublicKey,
      staleTime: Infinity,
    });
    const vapidKey = vapidKeyResponse.publicKey;

    if (!vapidKey) throw new Error('VAPID public key unavailable — push is not configured');

    // subscribeToPush handles serviceWorker registration + pushManager.subscribe
    const subscription = await subscribeToPush(vapidKey);
    return subscription;
  }

  async function unsubscribe() {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();

    if (!subscription) return;

    await unsubscribeFromPush({ endpoint: subscription.endpoint });
    await subscription.unsubscribe();
  }

  const isSubscribed = async () => {
    if (!('serviceWorker' in navigator)) return false;

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    return subscription !== null;
  };

  return { subscribe, unsubscribe, isSubscribed };
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
      queryClient.invalidateQueries({ queryKey: notificationsKeys.unreadCount() });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: notificationsKeys.unreadCount() });
    },
  });
}

// ---------- Delete / Delete all ----------
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      notificationId,
      body,
    }: {
      notificationId: string;
      body?: ReadNotificationRequestBody;
    }) => deleteNotification(notificationId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: notificationsKeys.unreadCount() });
    },
  });
}

export function useDeleteAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: notificationsKeys.unreadCount() });
    },
  });
}

/**
 * Single entry point for all notification operations.
 * Add future mutations/queries as their own `use...` hooks above, then expose them here.
 */
export function useNotifications() {
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const { subscribe, unsubscribe, isSubscribed } = usePushSubscription();
  const deleteNotification = useDeleteNotification();
  const deleteAllNotifications = useDeleteAllNotifications();

  const { data: session } = useSession();
  const {
    data,
    isLoading: isNotificationsLoading,
    isFetching: isNotificationsFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError: isNotificationsError,
    error: notificationsError,
  } = useNotificationsList({ limit: 10 }, session?.token || '');

  const {
    data: unreadCountData,
    isLoading: isUnreadCountLoading,
    isError: isUnreadCountError,
  } = useUnreadCount(session?.token || '');

  const { data: pushStatusData, isLoading: isPushStatusLoading } = usePushStatus(
    session?.token || ''
  );

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];
  const unreadCount = unreadCountData?.status ? (unreadCountData.payload?.unreadCount ?? 0) : 0;

  const isPushConfigured = pushStatusData?.status
    ? (pushStatusData.payload?.pushConfigured ?? false)
    : false;
  const pushSubscriptionCount = pushStatusData?.status
    ? (pushStatusData.payload?.subscriptionCount ?? 0)
    : 0;

  return {
    markAsRead: markAsRead.mutate,
    markAsReadAsync: markAsRead.mutateAsync,
    isMarkingAsRead: markAsRead.isPending,

    markAllAsRead: markAllAsRead.mutate,
    markAllAsReadAsync: markAllAsRead.mutateAsync,
    isMarkingAllAsRead: markAllAsRead.isPending,

    deleteNotification: deleteNotification.mutate,
    deleteNotificationsAsync: deleteNotification.mutateAsync,
    isDeleting: deleteNotification.isPending,

    deleteAllNotifications: deleteAllNotifications.mutate,
    deleteAllNotificationsAsync: deleteAllNotifications.mutateAsync,
    isDeletingAll: deleteAllNotifications.isPending,

    subscribe,
    unsubscribe,
    isSubscribed,
    isPushConfigured,
    pushSubscriptionCount,
    isPushStatusLoading,

    unreadCount,
    isUnreadCountLoading,
    isUnreadCountError,
    notifications,

    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,

    isLoading: isNotificationsLoading,
    isFetching: isNotificationsFetching,
    isError: isNotificationsError,
    error: notificationsError,
  };
}
