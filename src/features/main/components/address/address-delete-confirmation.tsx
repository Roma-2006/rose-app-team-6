'use client';

import { Trash, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onConfirm: () => void;
  isMutating?: boolean;
}

export function AddressDeleteConfirmation({
  open,
  onOpenChange,
  onClose,
  onConfirm,
  isMutating = false,
}: Props) {
  const t = useTranslations('address');

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="!w-xl !max-w-4xl rounded-4xl border border-border-soft bg-bg-plain p-8 shadow-xl ring-1 ring-border-soft"
        >
          <div className="relative flex flex-col items-center text-center ">
            <Button
              type="button"
              buttonVariant="icon"
              variant="ghost"
              onClick={onClose}
              iconOnly={<X size={24} />}
              className="absolute -right-2 -top-2 h-10 w-10 rounded-full text-text-default hover:bg-bg-soft"
            />

            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-bg-muted">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg-soft">
                <Trash size={32} className="text-text-plain" />
              </div>
            </div>

            <h3 className="mb-10 px-4 text-xl font-semibold leading-tight text-text-plain">
              {t('deleteConfirm')}
            </h3>

            <div className="flex gap-2.5 mt-4 w-full">
              <Button
                type="button"
                buttonVariant="text"
                variant="outline"
                title={t('cancel')}
                onClick={onClose}
                className=" flex-1 rounded-2xl font-bold bg-bg-subtle border border-border-default text-text-plain py-3.5 px-4"
              />

              <Button
                type="button"
                buttonVariant="text"
                variant="destructive"
                title={t('confirmDelete')}
                onClick={onConfirm}
                disabled={isMutating}
                loading={isMutating}
                className="flex-1 rounded-xl bg-bg-danger font-bold text-text-inverse py-3.5 px-4"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
