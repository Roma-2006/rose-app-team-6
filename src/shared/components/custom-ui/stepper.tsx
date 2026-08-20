'use client';

import { useLocale } from 'next-intl';
import React from 'react';

interface StepperProps {
  currentStep: number;
  numberOfSteps?: number;
  type?: 'start' | 'center' | 'full';
}

export default function Stepper({ currentStep, numberOfSteps = 4, type = 'start' }: StepperProps) {
  const steps = Array.from({ length: numberOfSteps }, (_, i) => i + 1);
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const formatStepNumber = (num: number) => (isRtl ? num.toLocaleString('ar-EG') : num.toString());

  const renderDot = (step: number) => {
    const isCompletedOrCurrent = step <= currentStep;

    return (
      <div
        className={`w-7 h-7 rounded-full  shrink-0 transition-all duration-500 flex items-center justify-center ${
          isCompletedOrCurrent ? 'bg-bg-primary ' : 'bg-bg-soft border-bg-primary-fade'
        }`}
      >
        <span
          className={`text-[14px] font-bold scale-80 ${
            isCompletedOrCurrent ? 'text-white' : 'text-text-soft'
          }`}
        >
          {formatStepNumber(step)}
        </span>
      </div>
    );
  };

  if (type === 'full') {
    return (
      <div className="w-full flex items-center" dir={isRtl ? 'rtl' : 'ltr'}>
        {/* leading line before the first step — always completed */}
        <div className="flex-1 border-t-2 border-bg-primary transition-colors duration-500" />

        {steps.map((step, index) => {
          const isLineCompleted = step <= currentStep;

          return (
            <div key={step} className="flex items-center">
              {index !== 0 && (
                <div
                  className={`flex-1 border-t transition-colors duration-500 ${
                    isLineCompleted ? 'border-bg-primary border-t-2' : 'border-bg-primary-faint'
                  }`}
                  style={{ width: '4rem' }}
                />
              )}
              {renderDot(step)}
            </div>
          );
        })}

        {/* trailing line after the last step — always incomplete */}
        <div className="flex-1 border-t border-bg-primary-faint transition-colors duration-500" />
      </div>
    );
  }

  if (type === 'center') {
    return (
      <div className="w-full flex items-center" dir={isRtl ? 'rtl' : 'ltr'}>
        {/* leading line before the first step — always completed */}
        <div className="flex-1 border-t-6 border-bg-primary transition-colors duration-500 rounded-l-full" />

        {steps.map((step, index) => {
          const isLineCompleted = step <= currentStep;

          return (
            <React.Fragment key={step}>
              {index !== 0 && (
                <div
                  className={`flex-1 border-t-6 transition-colors duration-500 ${
                    isLineCompleted ? 'border-bg-primary border-t-6' : 'border-bg-soft'
                  }`}
                />
              )}
              {renderDot(step)}
            </React.Fragment>
          );
        })}

        {/* trailing line after the last step — always incomplete */}
        <div className="flex-1 border-t-6 border-bg-soft transition-colors duration-500 rounded-r-full" />
      </div>
    );
  }

  // type === 'start' (default) — edge-to-edge, dots pinned to container edges
  const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

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
          {steps.map((step) => (
            <div
              key={step}
              className="relative flex items-center justify-center transition-colors duration-300"
            >
              {renderDot(step)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
