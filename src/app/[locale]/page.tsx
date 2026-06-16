import LanguageSwitcher from '@/shared/components/LanguageSwitcher';
import { ThemeToggle } from '@/shared/components/theme';

interface PageProps {
  params: Promise<{ locale: string }>;
}

//husky test

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="bg-background min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-card-bg p-8 rounded-2xl shadow-sm border border-card-bg max-w-md w-full flex flex-col items-center">
        {/* Language Switcher */}
        <div className="mb-6 w-full flex justify-end gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <h1 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">
          {locale === 'ar' ? 'مرحباً بك في تطبيق روز' : 'Welcome to Rose App'}
        </h1>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-card-bg rounded-full text-sm font-medium text-foreground">
          <span>Active Locale:</span>
          <span className="uppercase text-primary font-bold">{locale}</span>
        </div>
      </div>
    </main>
  );
}
