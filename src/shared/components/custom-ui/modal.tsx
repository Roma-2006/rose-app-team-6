import { ModalProps } from '@/shared/types/modal';
import { AlertDialogContent } from '../ui/alert-dialog';
export default function Modal({ children }: ModalProps) {
  return (
    <>
      <AlertDialogContent>{children}</AlertDialogContent>
    </>
  );
}
