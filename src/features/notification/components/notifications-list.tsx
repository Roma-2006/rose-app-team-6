'use client';

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
import { Bell, CheckCheck, BellOff, BrushCleaning } from 'lucide-react';
import { useNotifications } from '../hooks/use-notification';
import type { NotificationsListProps } from '../types/notification';
import { useTranslations } from 'next-intl';

const NotificationsList = ({ initialNotifications = [] }: NotificationsListProps) => {
  const { markAsRead, markAllAsRead, isMarkingAllAsRead } = useNotifications();

  const notifications = initialNotifications;
  const t = useTranslations('header.notifications');

  return (
    <DropdownMenu>
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
      <DropdownMenuContent className="w-84 h-78 text-start p-0" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="w-full h-13 bg-bg-primary-saturated text-text-inverse text-xl font-bold p-4">
            {t('title', { count: notifications.length })}
          </DropdownMenuLabel>
          <div className="flex gap-2.5 p-2.5 w-full h-9.5">
            <Button
              variant="ghost"
              buttonVariant="text"
              leftIcon={<CheckCheck className="size-3.5" />}
              title="header.notifications.markAllAsRead"
              className={`w-fit justify-start gap-1.5 text-xs font-semibold  bg-none h-3.5 ${
                notifications.length > 0 ? 'text-text-plain' : 'text-text-muted'
              } `}
              onClick={() => {
                if (!isMarkingAllAsRead) markAllAsRead();
              }}
              // disabled={isMarkingAllAsRead || notifications.length === 0}
            />

            <Button
              variant="ghost"
              buttonVariant="text"
              leftIcon={<BrushCleaning className="size-3.5" />}
              title="header.notifications.clearAll"
              className={`w-fit justify-start gap-1.5  text-xs font-semibold  bg-none h-3.5 ${
                notifications.length > 0 ? 'text-text-plain' : 'text-text-muted'
              } `}
              onClick={() => {
                if (!isMarkingAllAsRead) markAllAsRead();
              }}
              // disabled={isMarkingAllAsRead || notifications.length === 0}
            />
          </div>
          <DropdownMenuSeparator className="bg-bg-soft" />
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-4">
              <BellOff className="mx-auto mt-4 h-12.5 w-12.5 text-text-muted" />
              <p className="text-center text-sm text-text-muted mt-2 font-medium">
                No notifications to display.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="text-text-muted cursor-pointer">
                <NotificationItemList
                  notification={notification}
                  onRead={(id) => markAsRead({ notificationId: id })}
                />
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsList;
