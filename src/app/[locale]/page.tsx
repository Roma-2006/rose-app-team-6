import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme';
import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import SignOutButton from '@/features/auth/components/login/signout-btn';
import NotificationsList from '@/features/notification/components/notifications-list';
import { getNotifications } from '@/features/notification/apis/notification.api';
import type { Notification } from '@/features/notification/types/notification';
import { useNotifications } from '@/features/notification/hooks/use-notification';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const session = await getServerSession(authOptions);

  let notifications: Notification[] = [];
  try {
    notifications = await getNotifications({ page: 1, limit: 10 }, session?.token);
  } catch (error) {
    console.error('Failed to fetch notifications', error);
  }

  return (
    <main className="bg-plain min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 w-full flex justify-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
        <NotificationsList initialNotifications={notifications} />
      </div>
      <SignOutButton locale={locale} />
    </main>
  );
}
