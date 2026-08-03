'use client';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import QueryProvider from '@/shared/providers/providers/react-query.provider';
import ThemeProvider from '@/shared/providers/providers/theme.provider';
import NextAuthProvider from './providers/next-auth.provider';
import { Session } from 'next-auth';
interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
  session: Session | null;
}

export default function Providers({ children, locale, messages, session }: ProvidersProps) {
  return (
    <NextAuthProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Africa/Cairo">
          <QueryProvider>{children}</QueryProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </NextAuthProvider>
  );
}
