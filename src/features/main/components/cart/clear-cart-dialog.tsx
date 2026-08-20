'use client';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { BrushCleaning, X } from 'lucide-react';

interface ClearCartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ClearCartDialog({ isOpen, onClose, onConfirm }: ClearCartDialogProps) {
  const t = useTranslations('cart');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="sm:min-w-120 h-86 mx-auto rounded-2xl  bg-white border-none ring-0 shadow-xl gap-0"
      >
        <DialogClose className="absolute right-6 top-6 cursor-pointer ">
          <X className="h-5 w-5 text-black " />
        </DialogClose>

        <DialogHeader className="flex flex-col items-center justify-center text-center pt-4">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-8">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
              <BrushCleaning className="w-8 h-8 text-black" strokeWidth={1.5} />
            </div>
          </div>

          <DialogDescription className="text-2xl text-black">{t('confirmClear')}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3 mt-10  justify-center mx-auto border-none">
          <Button
            type="button"
            variant="subtle"
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
