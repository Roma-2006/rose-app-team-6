'use client';

import { useEffect } from 'react';

// Lib
import { useTranslations } from 'next-intl';

// Relatives
import { StatusScreen } from '@/shared/components/custom-ui/status-screen';
import Image from 'next/image';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  // Translations
  const t = useTranslations('dashboard.error');

  // Functions
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusScreen
      icon={
        <Image src="/assets/images/404.png" alt="Not_found" width={710} height={710} priority />
      }
      title={t('title')}
      description={t('description')}
    />
  );
}
