'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
export const PasswordResetSent = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const isRtl = locale === 'ar';
  void isRtl;

  const email = searchParams.get('email') || '';

  const [isResending, setIsResending] = useState(false);

  const onResend = async () => {
    setIsResending(true);
    try {
      toast.success(t('auth-forgotPw.step2.resendToast'));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => router.back()}
          className="p-2 bg-bg-primary text-text-inverse rounded-md"
          aria-label={t('auth-forgotPw.step2.back')}
        >
          {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        <h1 className="text-2xl font-bold">{t('auth-forgotPw.step2.title')}</h1>
      </div>

      <p className="text-text-default ">
        <span>{t('auth-forgotPw.step2.descriptionPrefix')}</span>{' '}
        {email ? <span className="font-bold text-text-info">{email}</span> : null}
      </p>

      <div className="space-y-4 text-sm text-text-default mt-12 ">
        <p>{t('auth-forgotPw.step2.instruction1')}</p>
        <p>{t('auth-forgotPw.step2.instruction2')}</p>
      </div>

      <hr className="my-8 border-border-muted dark:border-border-soft" />

      <div className="text-center">
        {t('auth-forgotPw.step2.needHelp')}{' '}
        <Button
          variant="ghost"
          buttonVariant="text"
          title="auth-forgotPw.step2.contactUs"
          className="!w-auto !h-auto !p-0 text-text-primary"
          type="button"
        />
      </div>
    </div>
  );
};
