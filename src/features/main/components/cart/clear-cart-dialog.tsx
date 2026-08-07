'use client';

import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';

interface ClearCartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ClearCartDialog({ isOpen, onClose, onConfirm }: ClearCartDialogProps) {
  const t = useTranslations('cart');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-120 h-50 mx-auto rounded-2xl p-6 bg-background border border-border-plain shadow-2xl">
        <DialogHeader className="flex flex-col items-center gap-3 text-center sm:text-center">
          <DialogTitle className="text-xl font-bold text-text-primary">
            {t('clearCart') || 'Clear Shopping Cart'}
          </DialogTitle>

          <DialogDescription className="text-sm text-text-muted">
            {t('clearCartConfirmation') ||
              'Are you sure you want to remove all items from your cart? This action cannot be undone.'}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3 mx-auto">
          <Button
            type="button"
            variant="outline"
            buttonVariant="text"
            title="button.cancel"
            onClick={onClose}
          />
          <Button
            type="button"
            variant="destructive"
            buttonVariant="text"
            title="cart.clearCart"
            onClick={onConfirm}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
