'use client';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

import { useRouter } from 'next/navigation';

interface PasswordResetSentProps {
  email: string;
  onBack: () => void;
}

export const PasswordResetSent = ({ email, onBack }: PasswordResetSentProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="p-2 bg-bg-primary text-text-inverse rounded-md hover:bg-opacity-90"
          aria-label="back"
        >
          {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        <h1 className="text-2xl font-bold text-text-plain">
          {t('auth.auth-forgotPw.step2.title')}
        </h1>
      </div>

      <p className="text-text-default">
        <span>{t('auth.auth-forgotPw.step2.descriptionPrefix')}</span>{' '}
        {email ? <span className="font-bold text-text-info">{email}</span> : null}
      </p>
      <hr className="my-6 border-0 border-t border-border-muted dark:border-border-soft" />

      <div className="space-y-4 text-sm text-text-default">
        <p className="flex gap-2">
          <span className="shrink-0">•</span>
          {t('auth.auth-forgotPw.step2.instruction1')}
        </p>
        <p className="flex gap-2">
          <span className="shrink-0">•</span>
          {t('auth.auth-forgotPw.step2.instruction2')}
        </p>
      </div>

      <hr className="my-8 border-0 border-t border-border-muted dark:border-border-soft" />

      <div className="text-center">
        <span className="text-text-plain">{t('auth.auth-forgotPw.step2.needHelp')} </span>
        <Link
          href="/contact"
          className="text-text-primary font-bold hover:underline transition-colors"
        >
          {t('auth.auth-forgotPw.step2.contactUs')}
        </Link>
      </div>
    </div>
  );
};
