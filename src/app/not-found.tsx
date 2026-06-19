import { routing } from '@/i18n/routing';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body>
        <h1>Not Found</h1>
        <Link href="/">Navigate to Home</Link>
      </body>
    </html>
  );
}
