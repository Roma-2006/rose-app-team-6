import LanguageSwitcher from '@/shared/components/language-switcher';
import { useTranslations } from 'next-intl';

export default function Home() {
  //Translations
  const t = useTranslations();
  const username = 'Rahma';
  return (
    <main className="bg-maroon-500 min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full flex flex-col items-center">
        {/* Language Switcher */}
        <div className="mb-6 w-full flex justify-end">
          <LanguageSwitcher />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">{t('title')}</h1>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
          {t('welcome', { name: username })}
        </h1>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
          {t('hallo-hallo-hallo')}
        </h1>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
          <span>Active Locale:</span>
          <span className="uppercase text-indigo-600 font-bold"></span>
        </div>
      </div>
    </main>
  );
}
