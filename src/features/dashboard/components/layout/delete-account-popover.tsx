'use client';

import * as React from 'react';
import { Trash, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils/tailwind-cn';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { DeleteAccountPopoverProps } from '@/features/main/types/layout/account';

export function DeleteAccountPopover({
  trigger,
  onConfirm,
  loading = false,
  open,
  onOpenChange,
}: DeleteAccountPopoverProps) {
  const t = useTranslations('dashboard.account.delete-popover');

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger render={trigger as React.ReactElement} nativeButton={false} className="" />
      <PopoverContent className="w-118.5 h-93.25 rounded-2xl p-6 shadow-lg bg-bg-plain border-0">
        {/* Close button */}
        <PopoverClose className="absolute right-4 top-4 text-text-muted " aria-label="close">
          <X size={25} />
        </PopoverClose>

        {/* Icon */}
        <div className="mx-auto flex h-27.5 w-27.5 items-center justify-center rounded-full bg-bg-soft mt-6 mb-6">
          <div className="mx-auto flex h-17.5 w-17.5 items-center justify-center rounded-full bg-bg-elevated">
            <Trash size={29} className="text-text-plain" />
          </div>
        </div>

        {/* Copy */}
        <div className="mt-5 flex flex-col items-center gap-1.5 text-center">
          <p className="text-base font-semibold text-[20px] text-text-plain">{t('title')}</p>
          <p className="text-[16px] text-text-danger">{t('description')}</p>
        </div>

        {/* Actions */}
        <div className="mt-13.5 flex items-center gap-2.5 mb-0">
          <PopoverClose
            className={cn(
              'h-10 flex-1 rounded-lg border border-border-soft bg-bg-plain text-sm font-medium text-text-plain transition-colors hover:bg-bg-soft'
            )}
          >
            {t('cancel-button')}
          </PopoverClose>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="h-10 flex-1 rounded-lg bg-bg-danger text-sm font-medium text-text-inverse transition-colors hover:bg-bg-danger-saturated disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? t('loading-button') : t('confirm-button')}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
