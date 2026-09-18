import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import { ClearConfirmationModalProps } from '@/shared/types/modal';
import { X } from 'lucide-react';
export default function ClearConfirmation({
  icon,
  title,
  cancelButtonTitle,
  confirmButtonTitle,
  onClick,
  loading,
}: ClearConfirmationModalProps) {
  return (
    <>
      <AlertDialogHeader>
        <div className=" flex justify-end w-full pb-6">
          <AlertDialogCancel buttonVariant="icon" iconOnly={<X size={25} />} variant="ghost" />
        </div>
        <AlertDialogTitle className="flex flex-col gap-6 items-center m-auto text-xl text-text-plain font-semibold ">
          <div
            className="
                            relative flex items-center justify-center
                            w-28 h-28
                            rounded-full
                            bg-bg-soft
                            isolate
                            before:absolute
                            before:w-17.5
                            before:h-17.5
                            before:rounded-full
                            before:bg-bg-muted
                            before:-z-1
                        "
          >
            {icon}
          </div>
          {title}
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          className="w-full lg:flex-1"
          buttonVariant="text"
          title={cancelButtonTitle}
          variant="subtle"
        />
        <AlertDialogAction
          className="w-full lg:flex-1"
          buttonVariant="text"
          title={confirmButtonTitle}
          variant="destructive"
          onClick={onClick}
          loading={loading}
        />
      </AlertDialogFooter>
    </>
  );
}
