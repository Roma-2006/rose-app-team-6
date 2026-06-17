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
      className="px-4 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-xl shadow-sm transition-all text-sm active:scale-95"
    >
      {locale === 'ar' ? 'Switch to English 🇬🇧' : 'التغيير إلى العربية 🇪🇬'}
    </button>
  );
}
