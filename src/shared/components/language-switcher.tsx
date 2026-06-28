'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 bg-bg-primary hover:bg-bg-primary-fade text-text-inverse font-medium radius-xl shadow-shadow-subtle-lg transition-all text-sm active:scale-95"
    >
      {locale === 'ar' ? 'Switch to English 🇬🇧' : 'التغيير إلى العربية 🇪🇬'}
    </button>
  );
}
