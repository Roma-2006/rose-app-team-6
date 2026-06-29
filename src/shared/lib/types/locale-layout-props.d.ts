import { Locale } from 'next-intl';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}
