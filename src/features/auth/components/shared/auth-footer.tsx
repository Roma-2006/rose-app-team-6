import { Link } from '@/i18n/navigation';
import { AuthFooterProps } from '@/shared/types/auth-footer';
import { useTranslations } from 'next-intl';
export default function AuthFooter({ question, href, link }: AuthFooterProps) {
  const t = useTranslations('auth');
  return (
    <p className=" text-text-plain font-medium text-sm text-center pt-5 border-t border-border-muted ">
      {t(question)}
      <Link className="font-bold text-text-primary" href={href}>
        {t(link)}
      </Link>
    </p>
  );
}
