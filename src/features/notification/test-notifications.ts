import type { Notification } from '@/features/notification/types/notification';

export const testNotifications: Notification[] = [
  {
    id: '1',
    userId: 'user-1',
    type: 'SYSTEM',
    title: 'Welcome to Rose App',
    message: 'Your account has been created successfully.',
    isRead: false,
    link: null,
    createdAt: '2026-07-18T08:00:00.000Z',
    updatedAt: '2026-07-18T08:00:00.000Z',
  },
  {
    id: '2',
    userId: 'user-1',
    type: 'SYSTEM',
    title: 'New comment on your post',
    message: 'Sara replied to your comment.',
    isRead: false,
    link: '/posts/42',
    createdAt: '2026-07-17T14:30:00.000Z',
    updatedAt: '2026-07-17T14:30:00.000Z',
  },
  {
    id: '3',
    userId: 'user-1',
    type: 'SYSTEM',
    title: 'Password changed',
    message: 'Your password was updated successfully.',
    isRead: true,
    link: null,
    createdAt: '2026-07-15T09:12:00.000Z',
    updatedAt: '2026-07-15T09:12:00.000Z',
  },
];
