import LanguageSwitcher from '@/shared/components/language-switcher';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <main className="bg-maroon-500 min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full flex flex-col items-center">
        <div className="mb-6 w-full flex justify-end">
          <LanguageSwitcher />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">{t('title')}</h1>
      </div>
    </main>
  );
}
