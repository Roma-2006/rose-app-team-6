import { Link } from '@/i18n/navigation';
import { TUserAuthActionProps } from '@/shared/types/user-auth-action';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function UserAuthAction({ isAuthenticated }: TUserAuthActionProps) {
  const t = useTranslations();

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="flex items-center   gap-1.5  text-foreground hover:text-primary transition-colors"
      >
        <User size={20} />
        <span>{t('header.login')}</span>
      </Link>
    );
  }

  return null;
}
