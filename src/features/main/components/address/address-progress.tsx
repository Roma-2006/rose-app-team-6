'use client';

interface AddressProgressProps {
  step: 1 | 2;
}

export function AddressProgress({ step }: AddressProgressProps) {
  return (
    <div className="relative mb-6 flex w-full items-center justify-center px-8">
      {/* Base Line */}
      <div className="absolute h-1.5 w-full bg-bg-muted rounded-full" />

      {/*Progress Line */}
      <div
        className="absolute h-1.5 bg-bg-primary-saturated transition-all duration-500 left-0"
        style={{ width: step === 1 ? '72%' : '100%' }}
      />

      <div className="relative flex w-full justify-around items-center">
        {/* step 1 */}
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-full font-bold z-10 transition-colors ${
            step >= 1 ? 'bg-bg-primary-saturated text-text-inverse' : 'bg-bg-muted text-text-soft'
          }`}
        >
          1
        </div>

        {/* step 2 */}
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-full font-bold z-10 transition-colors ${
            step >= 2 ? 'bg-bg-primary-saturated text-text-inverse' : 'bg-bg-muted text-text-soft'
          }`}
        >
          2
        </div>
      </div>
    </div>
  );
}
