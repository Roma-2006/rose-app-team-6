'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('orders');

  //State
  const [isRetrying, setIsRetrying] = useState(false);

  //Variables
  const handleRetry = () => {
    setIsRetrying(true);
    reset();
  };

  return (
    <div className="text-center text-2xl font-bold min-h-80 mt-6">
      <p className="mb-3">{t('error')}</p>

      <Button
        buttonVariant="text"
        variant="primary"
        title="orders.retry"
        onClick={handleRetry}
        loading={isRetrying}
      />
    </div>
  );
}
