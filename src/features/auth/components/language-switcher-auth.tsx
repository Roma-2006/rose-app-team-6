'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageSwitcherAuth() {
  const locale = useLocale();
  const t = useTranslations();

  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === 'en' ? 'ar' : 'en';

  const handleSwitchLanguage = () => {
    router.replace(pathname, {
      locale: nextLocale,
    });
  };

  return (
    <button
      type="button"
      onClick={handleSwitchLanguage}
      aria-label={t('auth.langLabel')}
      className=" cursor-pointer"
    >
      {t('auth.switchLang')}
    </button>
  );
}
