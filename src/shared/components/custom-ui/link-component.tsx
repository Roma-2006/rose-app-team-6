'use client';
import { Link, usePathname } from '@/i18n/navigation';
import { TLinkComponentProps } from '@/shared/types/link-component';
import { useTranslations } from 'next-intl';
export default function LinkComponent({ href, icon, title }: TLinkComponentProps) {
  const t = useTranslations();
  const pathName = usePathname();
  return (
    <Link
      className={`transition-all duration-300 border-b-2 flex  items-center  p-3 gap-2 text-sm sm:text-base font-medium text-text-inverse ${pathName === href ? 'text-text-secondary  border-border-secondary' : 'border-transparent '} `}
      href={href}
    >
      {icon}
      {t(title)}
    </Link>
  );
}
