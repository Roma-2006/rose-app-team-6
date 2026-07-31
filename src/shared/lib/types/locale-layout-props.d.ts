import { Locale } from 'next-intl';
import React from 'react';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}
