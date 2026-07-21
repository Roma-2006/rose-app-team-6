'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginHref: string;
}

export const LoginPromptModal = ({ isOpen, onClose, loginHref }: LoginPromptModalProps) => {
  const t = useTranslations('home.model-prompt');
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 bg-black/40 flex items-center justify-center p-4 "
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Content Box */}
      <div className="w-full max-w-md rounded-2xl bg-bg-plain border border-border-muted p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        {/* Title and Description */}
        <div className="text-text-primary text-lg font-semibold mb-3">{t('authRequired')}</div>
        <div className="text-text-soft text-sm mb-5">{t('loginToContinue')}</div>

        {/* Action Buttons Container */}
        <div className="flex justify-end gap-3 rtl:flex-row-reverse mt-8">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-transparent text-text-primary border border-border-muted hover:bg-gray-50 transition-colors"
          >
            {t('cancel')}
          </button>

          {/* Login/Action Button */}
          <button
            onClick={() => {
              router.push(loginHref);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-secondary text-text-inverse hover:opacity-90 transition-opacity"
          >
            {t('login')}
          </button>
        </div>
      </div>
    </div>
  );
};
