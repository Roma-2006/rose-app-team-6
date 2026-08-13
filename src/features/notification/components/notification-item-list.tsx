'use client';
import { useState } from 'react';
import NotificationMenu from './notification-menu';
import Link from 'next/link';
import type { NotificationItemProps } from '../types/notification';
import { cn } from '@/shared/lib/utils/tailwind-cn';

const NotificationItemList = ({ notification, onRead, onDelete }: NotificationItemProps) => {
  const [isRead, setIsRead] = useState(notification.isRead);

  return (
    <Link
      href={notification.link || '#'}
      className={cn(
        'w-full h-25 top-px p-4 gap-1.5 text-start font-semibold text-[16px] flex flex-col max-h-25 overflow-hidden border-b-2 border-border-soft',
        notification.isRead ? 'bg-bg-soft' : 'bg-bg-plain'
      )}
    >
      <div className="flex justify-between">
        <h3 className="font-semibold size-4 text-text-plain w-fit">{notification.title}</h3>
        <NotificationMenu isRead={isRead} setIsRead={setIsRead} notificationId={notification.id} />
      </div>

      <p className="text-text-soft text-sm truncate">{notification.message}</p>
    </Link>
  );
};

export default NotificationItemList;
