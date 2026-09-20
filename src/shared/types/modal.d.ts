export type ModalProps = {
  children: React.ReactNode;
  className?: string;
};

//clearConfirmationModal
export type ClearConfirmationModalProps = {
  icon: React.ReactNode;
  title: string;
  cancelButtonTitle: string;
  confirmButtonTitle: string;
  onClick?: () => void;
  loading?: boolean;
};
