'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    // إذا كانت اللغة الحالية عربي يحول لإنجليزي والعكس
    const nextLocale = locale === 'ar' ? 'en' : 'ar';

    // يغير اللغة مع الحفاظ على نفس الصفحة التي يقف عليها المستخدم
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-all text-sm active:scale-95"
    >
      {locale === 'ar' ? 'Switch to English 🇬🇧' : 'التغيير إلى العربية 🇪🇬'}
    </button>
  );
}
