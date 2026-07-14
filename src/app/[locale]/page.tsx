import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme';
import { getTranslations } from 'next-intl/server';
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return (
    <main className="bg-plain  min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-plain p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full flex flex-col items-center">
        {/* Language Switcher */}
        <div className="mb-6 w-full flex justify-end">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
          {t('HomePage.title')}
        </h1>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
          <span>Active Locale:</span>
          <span className="uppercase text-indigo-600 font-bold">{locale}</span>
        </div>
      </div>
    </main>
  );
}
