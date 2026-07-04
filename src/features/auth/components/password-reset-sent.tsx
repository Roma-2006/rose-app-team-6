'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'sonner';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export const PasswordResetSent = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const router = useRouter();
  const isRtl = locale === 'ar';

  const emailFromUrl = searchParams.get('email');

  // FIX: Use a "Lazy Initializer" function inside useState.
  // This runs once on mount and avoids the need for setEmail in useEffect.
  const [storedEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('last_reset_email') || '';
    }
    return '';
  });

  const [isResending, setIsResending] = useState(false);
  const hasShownToast = useRef(false);

  // Derive the email: URL param takes priority, then the lazy-loaded localStorage
  const email = emailFromUrl || storedEmail;

  useEffect(() => {
    // 1. Sync URL email to LocalStorage (Side effect only, no setState)
    if (emailFromUrl) {
      localStorage.setItem('last_reset_email', emailFromUrl);
    }

    // 2. Show toast (Side effect only, no setState)
    if (!hasShownToast.current) {
      toast.success(t('auth-forgotPw.step2.resendToast'));
      hasShownToast.current = true;
    }
  }, [emailFromUrl, t]);

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
      <Toaster />
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => router.back()}
          className="p-2 bg-bg-primary text-text-inverse rounded-md hover:bg-opacity-90"
          aria-label={t('auth-forgotPw.step2.back')}
        >
          {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        <h1 className="text-2xl font-bold">{t('auth-forgotPw.step2.title')}</h1>
      </div>

      <p className="text-text-default">
        <span>{t('auth-forgotPw.step2.descriptionPrefix')}</span>{' '}
        {email ? <span className="font-bold text-text-info">{email}</span> : null}
      </p>

      <div className="space-y-4 text-sm text-text-default mt-12">
        <p>{t('auth-forgotPw.step2.instruction1')}</p>
        <p>{t('auth-forgotPw.step2.instruction2')}</p>
      </div>

      <hr className="my-8 border-border-muted dark:border-border-soft" />

      <div className="text-center">
        <span className="text-text-muted">{t('auth-forgotPw.step2.needHelp')} </span>
        <Button
          variant="ghost"
          buttonVariant="text"
          title={isResending ? 'auth-forgotPw.step2.resending' : 'auth-forgotPw.step2.contactUs'}
          onClick={onResend}
          disabled={isResending}
          className="!w-auto !h-auto !p-0 text-text-primary font-bold hover:underline"
          type="button"
        />
      </div>
    </div>
  );
};
