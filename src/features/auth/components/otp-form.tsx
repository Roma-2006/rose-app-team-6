'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { maskEmail } from '../utils/mask-email';

import { Button } from '@/shared/components/ui/button';
import OTPVariant from '@/shared/components/ui/otp-variant';
import Stepper from './stepper';

export function OtpForm() {
  const t = useTranslations();
  const searchParams = useSearchParams();

  const email = searchParams.get('email') ?? '';
  const maskedEmail = maskEmail(email);

  const [otp, setOtp] = useState('');

  return (
    <div className="mx-auto w-full max-w-md ">
      {/* Title */}
      <Stepper currentStep={3} />
      <div className="mb-3">
        <h1 className="text-[32px] font-bold text-text-plain">{t('otp.title')}</h1>

        <p className="mt-2 text-sm  text-text-plain">
          {t('otp.subtitle', { email: maskedEmail })}{' '}
          <Link
            href="/forgot-password"
            className="font-medium text-blue-400 dark:text-blue-700 hover:underline"
          >
            {t('otp.Edit')}
          </Link>
        </p>
      </div>

      {/* Divider */}
      <hr className="border-border-muted" />

      {/* OTP */}
      <div className="my-10 flex justify-center">
        <OTPVariant value={otp} onChange={setOtp} className="gap-3" />
      </div>

      {/* Resend */}
      <div className="mb-10 flex justify-end">
        <button type="button" className="text-sm font-medium text-text-plain ">
          {t('otp.resend')}
        </button>
      </div>

      {/* Verify */}
      <Button
        type="submit"
        buttonVariant="text"
        variant="primary"
        title="otp.verify"
        className="h-12 w-full"
      />

      {/* Divider */}
      <hr className="my-8 border-border-muted" />

      {/* Footer */}
      <div className="text-center text-sm">
        <span className="text-text-plain">{t('otp.Need-help')} </span>

        <Link href="/contact" className="font-semibold text-text-primary hover:underline">
          {t('otp.Contact-us')}
        </Link>
      </div>
    </div>
  );
}
