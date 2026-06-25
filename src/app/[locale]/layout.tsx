import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { LocaleLayoutProps } from '@/shared/lib/types/locale-layout-props';
import { getTranslations } from 'next-intl/server';
import Providers from '@/shared/providers/index';

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
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
