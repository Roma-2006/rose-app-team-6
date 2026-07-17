'use client';
import React, { useState } from 'react';
import { Notification } from './../types/notification';
import NotificationMenu from './notification-menu';
import Link from 'next/link';

const NotificationItemList = ({ notification }: { notification: Notification }) => {
  const [isRead, setIsRead] = useState(notification.isRead);

  return (
    <Link
      href={notification.link || '#'}
      className={`notification-item ${notification.isRead ? 'bg-bg-soft' : 'bg-bg-plain'} p-4 gap-1.5 text-start flex flex-col max-h-25 overflow-hidden border-b-2 border-border-soft`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold size-4 text-text-plain ">{notification.title}</h3>
        <NotificationMenu isRead={isRead} setIsRead={setIsRead} notificationId={notification.id} />
      </div>

      <p className="text-text-soft text-sm truncate">{notification.message}</p>
    </Link>
  );
};

export default NotificationItemList;
