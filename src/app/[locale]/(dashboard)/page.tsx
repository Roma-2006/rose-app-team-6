// import LanguageSwitcher from '@/shared/components/language-switcher';
// import { ThemeToggle } from '@/shared/components/theme';
// import { getTranslations } from 'next-intl/server';
// interface PageProps {
//   params: Promise<{ locale: string }>;
// }

import HomeContent from '@/features/dashboard/components/home/home-content';

export default async function HomePage() {
  // const { locale } = await params;
  // const t = await getTranslations({ locale });
  return (
    // <main className="bg-plain  min-h-screen flex flex-col items-center justify-center p-6 text-center">
    //   {/* Language Switcher */}
    //   <div className="mb-6 w-full flex justify-end">
    //     <LanguageSwitcher />
    //     <ThemeToggle />
    //   </div>
    // </main>
    <>
      <HomeContent />
    </>
  );
}
