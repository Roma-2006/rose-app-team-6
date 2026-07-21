import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme';

import UserDropdownServer from '@/shared/components/header/user-dropdown-server';
import { Suspense } from 'react';
import NotificationListSkeleton from '@/features/notification/components/notification-skeleton';
import UserDropdownSkeleton from '@/shared/components/header/user-dropdown-skeleton';
import NotificationsList from '@/features/notification/components/notifications-list';

export default async function HomePage() {
  return (
    <main className="bg-plain min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 w-full flex justify-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle />

        <NotificationsList />

        <Suspense fallback={<UserDropdownSkeleton />}>
          <UserDropdownServer />
        </Suspense>
      </div>
    </main>
  );
}
