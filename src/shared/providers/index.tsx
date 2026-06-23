'use client';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import QueryProvider from '@/shared/providers/providers/react-query.provider';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
}

export default function Providers({ children, locale }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale}>
      <QueryProvider>{children}</QueryProvider>
    </NextIntlClientProvider>
  );
}
