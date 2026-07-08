'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

const COUNTDOWN_SECONDS = 60;

export default function OTPSection({ onResend, onDisableVerify }: OTPSectionProps) {
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);
  const t = useTranslations();

  const handleResendClick = useCallback(async () => {
    const success = await onResend();

    if (success) {
      setSeconds(COUNTDOWN_SECONDS);
    }
  }, [onResend]);

  useEffect(() => {
    if (seconds === 0) {
      onDisableVerify();
    }
  }, [seconds, onDisableVerify]);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-text-plain text-sm mb-6">
        {t('auth.auth-register.otp.resend')}:
        {seconds > 0 ? (
          <span className="ml-1 font-bold text-text-plain">{seconds}s</span>
        ) : (
          <button
            onClick={handleResendClick}
            className="cursor-pointer pl-3 font-medium text-blue-600"
          >
            {t('auth.auth-register.otp.resend-2')}
          </button>
        )}
      </p>
    </div>
  );
}
