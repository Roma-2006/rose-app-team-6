import LanguageSwitcher from '@/shared/components/LanguageSwitcher';
import { ThemeToggle } from '@/shared/components/theme';
import CustomInput from '@/shared/components/ui/custom-input';

interface PageProps {
  params: Promise<{ locale: string }>;
}

//husky test

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="bg-bg-plain min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-bg-plain p-8 shadow-subtle-lg border border-border-primary radius-lg max-w-md w-full flex flex-col items-center">
        {/* Language Switcher */}

        <div className="mb-6 w-full flex justify-end gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <h1 className="text-3xl font-extrabold text-text-primary mb-2 tracking-tight">
          {locale === 'ar' ? 'مرحباً بك في تطبيق روز' : 'Welcome to Rose App'}
        </h1>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-secondary-faint rounded-full shadow-shadow-subtle-lg text-sm font-medium text-foreground">
          <span>Active Locale:</span>
          <span className="uppercase text-text-primary font-bold">{locale}</span>
        </div>
      </div>

      <CustomInput
        variant="default"
        label="input-label"
        placeholder="placeholder"
        disabled={false}
        error={false}
        id="sm"
      />
    </main>
  );
}
