import BaseBadge from '@/shared/components/custom-ui/BaseBadge';
import BaseButton from '@/shared/components/custom-ui/BaseButton';
import { BaseCheckbox } from '@/shared/components/custom-ui/BaseCheckbox';
import LanguageSwitcher from '@/shared/components/LanguageSwitcher';
import { ThemeToggle } from '@/shared/components/theme';

interface PageProps {
  params: Promise<{ locale: string }>;
}

//husky test

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  // const handleLog = () => console.log('Hello Rowidaa');
  const list = [
    { id: '1', label: 'hi' },
    { id: '2', label: 'hello' },
  ];
  return (
    <main className="bg-bg-plain min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-bg-plain p-8 shadow-subtle-lg border border-border-primary radius-lg max-w-md w-full flex flex-col items-center">
        {/* Language Switcher */}
        <BaseButton variant="ghost" />
        <BaseBadge variant="default" />
        <BaseCheckbox list={list} />
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
    </main>
  );
}
