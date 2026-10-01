'use client';

import { useEffect } from 'react';

export default function AccountError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Account Page Error:', error);
  }, [error]);

  return (
    <div className="w-full mt-15.5 flex flex-col items-center justify-center p-6 border border-border-muted rounded-xl bg-bg-plain">
      <h2 className="text-xl font-bold text-text-danger mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-bg-inverse text-text-inverse rounded-lg text-sm font-medium transition-all"
      >
        Try again
      </button>
    </div>
  );
}
