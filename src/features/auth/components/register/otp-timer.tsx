'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { OTPSectionProps } from '../../types/register';

const COUNTDOWN_SECONDS = 60;
const TIMER_KEY = 'otp-resend-end-time';

export default function OTPSection({ onResend }: OTPSectionProps) {
  const t = useTranslations();

  const [seconds, setSeconds] = useState(0);

  const calculateRemaining = () => {
    const endTime = localStorage.getItem(TIMER_KEY);

    if (!endTime) return 0;

    return Math.max(0, Math.ceil((Number(endTime) - Date.now()) / 1000));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(calculateRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendClick = useCallback(async () => {
    const success = await onResend();

    if (!success) return;

    const endTime = Date.now() + COUNTDOWN_SECONDS * 1000;

    localStorage.setItem(TIMER_KEY, endTime.toString());

    setSeconds(COUNTDOWN_SECONDS);
  }, [onResend]);

  return (
    <div className="flex w-full flex-col items-center">
      <p className="mb-6 text-sm text-text-plain">
        {t('auth.auth-register.otp.resend')}:
        {seconds > 0 ? (
          <span className="font-bold text-black ml-1">{seconds}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResendClick}
            className="cursor-pointer pl-3 font-medium text-text-info hover:underline"
          >
            {t('auth.auth-register.otp.resend')}
          </button>
        )}
      </p>
    </div>
  );
}
