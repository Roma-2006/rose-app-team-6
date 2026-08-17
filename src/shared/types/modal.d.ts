export type ModalProps = {
  children: React.ReactNode;
};

//clearConfirmationModal
export type ClearConfirmationModalProps = {
  icon: React.ReactNode;
  title: string;
  cancelButtonTitle: string;
  confirmButtonTitle: string;
  onClick?: () => void;
  loading?: boolean;
  subTitle?: string;
};
