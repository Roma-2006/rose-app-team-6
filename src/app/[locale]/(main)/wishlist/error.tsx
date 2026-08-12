'use client';

import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  //State
  const [isRetrying, setIsRetrying] = useState(false);
  //Variables
  const handleRetry = () => {
    setIsRetrying(true);
    reset();
  };
  return (
    <div className="text-center text-2xl font-bold min-h-80 mt-6">
      <p className="mb-3">{error.message}</p>
      <Button
        buttonVariant="text"
        variant="primary"
        title="button.retry"
        onClick={handleRetry}
        loading={isRetrying}
      />
    </div>
  );
}
