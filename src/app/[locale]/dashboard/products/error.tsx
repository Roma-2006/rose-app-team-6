'use client';

import { Button } from '@/shared/components/ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold text-text-plain">{error.message}</h2>

      <Button buttonVariant="text" variant="primary" title="button.retry" onClick={reset} />
    </div>
  );
}
