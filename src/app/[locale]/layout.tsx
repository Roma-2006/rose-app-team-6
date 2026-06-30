import type { Metadata } from 'next';

import { LocaleLayoutProps } from '@/shared/lib/types/locale-layout-props';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Providers from '@/shared/providers';
import { Sarabun, Tajawal } from 'next/font/google';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

const sarabun = Sarabun({
  subsets: ['latin'],
  variable: '--font-sarabun',
  weight: ['200', '300', '400', '500', '600', '700'],
});
const tajawal = Tajawal({
  subsets: ['latin'],
  variable: '--font-tajawal',
  weight: ['200', '300', '400', '500', '700'],
});

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
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  const session = await getServerSession(authOptions);

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className={`${sarabun.variable} ${tajawal.variable} `}
    >
      <body>
        <Providers locale={locale} messages={messages} session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
