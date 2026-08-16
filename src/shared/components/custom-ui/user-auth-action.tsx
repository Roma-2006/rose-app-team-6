import { Link } from '@/i18n/navigation';
import { TUserAuthActionProps } from '@/shared/types/user-auth-action';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import UserDropdown from '../header/user-dropdown';

export default function UserAuthAction({ isAuthenticated }: TUserAuthActionProps) {
  // Translations
  const t = useTranslations();

  // Session
  const { data: session } = useSession();
  if (!session) return null;
  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="flex items-center   gap-1.5 ltr:pr-4 rtl:pl-4  text-foreground hover:text-primary transition-colors"
      >
        <User size={20} />
        <span>{t('header.login')}</span>
      </Link>
    );
  }

  return <UserDropdown user={session?.user} />;
}
