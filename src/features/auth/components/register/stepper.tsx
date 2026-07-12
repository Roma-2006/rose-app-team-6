'use client';

import { useLocale } from 'next-intl';

interface StepperProps {
  currentStep: number;
}

export default function Stepper({ currentStep }: StepperProps) {
  const steps = [1, 2, 3, 4];
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

  const formatStepNumber = (num: number) => {
    if (isRtl) {
      return num.toLocaleString('ar-EG');
    }
    return num.toString();
  };

  return (
    <div className="w-full flex items-center justify-center" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex items-center w-full relative">
        <div className="absolute top-1/2 left-3.5 right-3.5 border-t border-bg-primary-faint -translate-y-1/2" />
        <div
          className="absolute top-1/2 border-t-2 border-bg-primary -translate-y-1/2 transition-all duration-500"
          style={{
            width: `calc(${progressWidth}% - 20px)`,

            ...(isRtl ? { right: '20px', left: 'auto' } : { left: '20px', right: 'auto' }),
          }}
        />
        <div className="flex justify-between w-full relative z-10">
          {steps.map((step) => {
            const isCompletedOrCurrent = step <= currentStep;

            return (
              <div
                key={step}
                className="relative flex items-center justify-center  transition-colors duration-300"
              >
                <div
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-500 relative flex items-center justify-center ${
                    isCompletedOrCurrent
                      ? 'bg-bg-primary border-bg-primary-faint'
                      : 'bg-bg-primary-fade border-bg-primary-fade'
                  }`}
                >
                  <span
                    className={`text-[14px] font-bold scale-80 ${
                      isCompletedOrCurrent ? 'text-text-secondary-fade' : 'text-text-primary'
                    }`}
                  >
                    {formatStepNumber(step)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
