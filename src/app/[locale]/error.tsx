'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { StatusScreen } from '@/shared/components/custom-ui/status-screen';
import Image from 'next/image';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const t = useTranslations('dashboard.error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusScreen
      icon={<Image src="/assets/images/error.png" alt="faild" width={710} height={710} priority />}
      title={t('title')}
      description={t('description')}
    />
  );
}
