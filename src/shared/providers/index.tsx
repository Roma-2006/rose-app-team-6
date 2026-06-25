'use client';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import QueryProvider from '@/shared/providers/providers/react-query.provider';
import ThemeProvider from '@/shared/providers/providers/theme.provider';
interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}

export default function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryProvider>{children}</QueryProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
