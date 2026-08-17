'use client';

// React
import { useEffect, useRef, useState } from 'react';

// lib
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils/tailwind-cn';

// relatives
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import NotificationItemList from './notification-item-list';
import { Button } from '@/shared/components/ui/button';
import { Bell, CheckCheck, BellOff, BrushCleaning, BellRing } from 'lucide-react';
import { useNotifications } from '../hooks/use-notification';
import NotificationListSkeleton from '../../../shared/components/skeleton/notification-skeleton';

const MAX_DISPLAYED_COUNT = 99;
const NEXT_PAGE_SKELETON_COUNT = 1;

const NotificationsList = () => {
  // Translations
  const t = useTranslations('header.notifications');

  // hooks
  const {
    markAllAsRead,
    isMarkingAllAsRead,
    subscribe,
    unsubscribe,
    isSubscribed,
    notifications = [],
    isLoading,
    unreadCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    deleteAllNotifications,
    deleteNotification,
  } = useNotifications();

  // state
  const [isSubscription, setIsSubscription] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const unReadedCount = unreadCount > MAX_DISPLAYED_COUNT ? MAX_DISPLAYED_COUNT : unreadCount;

  // functions

  useEffect(() => {
    const checkSubscription = async () => {
      const subscribed = await isSubscribed();
      setIsSubscription(subscribed);
    };

    checkSubscription();
  }, [isSubscribed]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: sentinel.parentElement, threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleEnableNotifications = async () => {
    try {
      await subscribe();
      setIsSubscription(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisableNotifications = async () => {
    try {
      await unsubscribe();
      setIsSubscription(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllAsRead = () => {
    if (!isMarkingAllAsRead) {
      markAllAsRead();
    }
  };

  const handleMarkNotificationAsRead = (notificationId: string) => {
    if (notificationId) {
      deleteNotification({ notificationId });
    }
  };

  const handleClearAllNotifications = () => {
    if (notifications.length > 0) {
      deleteAllNotifications();
    }
  };

  const handleDeleteNotification = (notificationId: string) => {
    if (notificationId) {
      deleteNotification({ notificationId });
    }
  };

  return (
    <DropdownMenu>
      <div className="relative inline-flex">
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              buttonVariant="icon"
              iconOnly={<Bell className="size-6 text-text-plain" />}
              size="icon-lg"
            />
          }
        />
        {unreadCount > 0 && (
          <span
            className={cn(
              'absolute -top-1 -inset-e-1 flex items-center justify-center',
              'min-w-5 h-5 px-1 rounded-full',
              'bg-bg-primary text-text-inverse text-[10px] font-medium leading-none',
              'pointer-events-none'
            )}
          >
            {unreadCount > MAX_DISPLAYED_COUNT ? `${unReadedCount}+` : unReadedCount}
          </span>
        )}
      </div>
      <DropdownMenuContent
        className="w-84 h-78 text-start p-0 bg-bg-plain flex flex-col"
        align="start"
      >
        <DropdownMenuGroup className="border border-none flex flex-col h-full min-h-0">
          <DropdownMenuLabel className="w-full h-13 shrink-0 bg-bg-primary-saturated text-text-inverse text-xl font-bold px-4 flex justify-between">
            {t('title', { count: notifications.length })}
            {isSubscription ? (
              <BellOff onClick={handleDisableNotifications} />
            ) : (
              <BellRing onClick={handleEnableNotifications} />
            )}
          </DropdownMenuLabel>
          <div className="flex gap-2.5 p-2.5 w-full h-9.5 shrink-0 justify-between">
            <Button
              variant="ghost"
              buttonVariant="text"
              leftIcon={<CheckCheck className="size-3.5" />}
              title="header.notifications.mark-all-as-read"
              className={cn(
                'w-fit justify-start gap-1.5 text-xs font-semibold bg-none h-3.5',
                notifications.length > 0 ? 'text-text-plain' : 'text-text-muted'
              )}
              onClick={handleMarkAllAsRead}
            />
            <Button
              variant="ghost"
              buttonVariant="text"
              leftIcon={<BrushCleaning className="size-3.5" />}
              title="header.notifications.clear-all"
              className={cn(
                'w-fit justify-start gap-1.5 text-xs font-semibold bg-none h-3.5',
                notifications.length > 0 ? 'text-text-plain' : 'text-text-muted'
              )}
              onClick={handleClearAllNotifications}
            />
          </div>
          <DropdownMenuSeparator className="bg-bg-soft shrink-0 p-0 m-0" />

          <div className="flex-1 min-h-0 overflow-y-auto">
            {isLoading ? (
              <NotificationListSkeleton />
            ) : notifications.length === 0 ? (
              <DropdownMenuItem className="flex flex-col items-center justify-center p-4">
                <BellOff className="mx-auto mt-4 size-13 text-text-muted" />
                <p className="text-center text-sm text-text-muted mt-2 font-medium">
                  {t('no-notifications')}
                </p>
              </DropdownMenuItem>
            ) : (
              <>
                {notifications.map((notification) => (
                  <div key={notification.id} className="text-text-muted">
                    <NotificationItemList
                      notification={notification}
                      onRead={handleMarkNotificationAsRead}
                      onDelete={handleDeleteNotification}
                    />
                  </div>
                ))}
                {hasNextPage && <div ref={loadMoreRef} className="h-1" />}
                {isFetchingNextPage && (
                  <NotificationListSkeleton count={NEXT_PAGE_SKELETON_COUNT} />
                )}
              </>
            )}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsList;
