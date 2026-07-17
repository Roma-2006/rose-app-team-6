'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginHref: string;
}

export const LoginPromptModal = ({ isOpen, onClose, loginHref }: LoginPromptModalProps) => {
  const t = useTranslations('product');
  const router = useRouter();
  const [mounted] = useState(true);

  if (!isOpen || !mounted) return null;

  return (
    <div
      className="fixed absolute inset-0 z-30 bg-black/40 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl bg-bg-plain border border-border-muted p-6 shadow-lg">
        <div className="text-text-primary text-lg font-semibold mb-3">{t('authRequired')}</div>
        <div className="text-text-soft text-sm mb-5">{t('loginToContinue')}</div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-transparent text-text-primary border border-border-muted"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              router.push(loginHref);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-secondary text-text-inverse"
          >
            {t('login')}
          </button>
        </div>
      </div>
    </div>
  );
};
