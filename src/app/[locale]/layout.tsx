import type { Metadata } from 'next';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import QueryProvider from '@/components/providers/QueryProvider';

import { Sarabun, Tajawal } from 'next/font/google';
import { ThemeProvider } from '@/shared/providers/theme.provider';
// import Script from 'next/script';

export const sarabun = Sarabun({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sarabun',
});

export const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  title: 'Rose App',
  description: 'Rose application built with Next.js',
};

// const themeScript = `(function(){
//   try {
//     var stored = localStorage.getItem('rose-theme');
//     var prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
//     var isDark = stored === 'dark' || (!stored && prefersDark);
//     document.documentElement.classList.toggle('dark', isDark);
//   } catch(e){}
// })()`;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
