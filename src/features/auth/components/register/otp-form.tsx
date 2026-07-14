'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import OTPVariant from '@/shared/components/ui/otp-variant';

import { confirmEmailVerification } from '../../apis/confirm-email-verification.api';
import { sendEmailVerification } from '../../apis/send-email-verification.api';
import { maskEmail } from '../../utils/mask-email';
import OTPSection from './otp-timer';
import Stepper from './stepper';
import { useForm } from 'react-hook-form';
import { otpSchema, OtpSchema } from '../../schemas/otp.schema';
import { TOtpFormProps } from '../../types/register';

export function OtpForm({ email, setStep }: TOtpFormProps) {
  const t = useTranslations();
  const maskedEmail = maskEmail(email);

  const [loading, setLoading] = useState(false);
  const {
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const otp = watch('otp');
  // Verify OTP
  const onSubmit = async () => {
    setLoading(true);

    try {
      await confirmEmailVerification({
        email,
        code: otp,
      });

      // router.push(`/register/user-info?email=${encodeURIComponent(email)}`);
      setStep('user-info');
    } catch (err) {
      setError('otp', {
        type: 'server',
        message: err instanceof Error ? err.message : t('auth-register.otp.invalid'),
      });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendEmail = async (): Promise<boolean> => {
    try {
      await sendEmailVerification({
        email,
      });
      return true;
    } catch (err) {
      if (err instanceof Error) {
        // setError(err.message);
        setError('otp', {
          type: 'server',
          message: err.message,
        });
      } else {
        setError('otp', {
          type: 'server',
          message: t('auth.auth-register.otp.invalid'),
        });
      }

      return false;
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Stepper */}
      <Stepper currentStep={2} />

      {/* Title */}
      <div className="mb-3">
        <h1 className="text-[30px] font-bold text-zinc-800">{t('auth.auth-register.title')}</h1>

        <h2 className="text-[20px] font-bold text-text-plain">
          {t('auth.auth-register.otp.subtitle-1')}
        </h2>

        <p className="mt-2 text-sm text-text-plain">
          {t('auth.auth-register.otp.subtitle-2', { email: maskedEmail })}{' '}
          <Link
            href="/register"
            className="font-medium text-blue-400 hover:underline dark:text-blue-700"
          >
            {t('auth.auth-register.otp.Edit')}
          </Link>
        </p>
      </div>

      <hr className="border-border-muted" />

      {/* OTP */}
      <div className="my-10 flex flex-col items-center">
        <OTPVariant
          value={otp}
          onChange={(value) =>
            setValue('otp', value, {
              shouldValidate: true,
            })
          }
        />

        {errors.otp && (
          <p className="mt-2 text-center text-sm text-red-500">{errors.otp.message}</p>
        )}
      </div>

      {/* Resend */}
      <div className="mb-10 flex justify-end">
        <OTPSection onResend={handleResendEmail} />
      </div>

      {/* Verify */}
      <Button
        type="button"
        buttonVariant="text"
        variant="primary"
        title="auth.auth-register.otp.verify"
        className="h-12 w-full"
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
      />

      <hr className="my-8 border-border-muted" />

      {/* Footer */}
      <div className="text-center text-sm">
        <span className="text-text-plain">{t('auth.auth-register.need-help')} </span>

        <Link href="/contact" className="font-semibold text-text-primary hover:underline">
          {t('auth.auth-register.contact-us')}
        </Link>
      </div>
    </div>
  );
}
