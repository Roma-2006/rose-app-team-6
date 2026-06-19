import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import QueryProvider from '@/shared/providers/react-query.provider';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { LocaleLayoutProps } from '@/shared/lib/types/locale-layout-props';
import { getTranslations } from 'next-intl/server';

// export const metadata: Metadata = {
//   title: 'Rose App',
//   description: 'Rose application built with Next.js',
// };

export async function generateMetadata({
  params,
}: {
  params: LocaleLayoutProps['params'];
}): Promise<Metadata> {
  const paramsResult = await params;
  const locale = paramsResult.locale;
  const t = await getTranslations({ locale });
  const title = t('app-title');
  return {
    title,
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const paramsResult = await params;
  const locale = paramsResult.locale;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <QueryProvider>{children}</QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
