export interface UserDropdownProps {
  trigger: React.ReactNode;
  onDelete?: () => void;
  deleteLoading?: boolean;
}

export interface UserProfileSectionProps {
  className?: string;
}

export interface DeleteAccountPopoverProps {
  trigger: React.ReactNode;
  onConfirm?: () => void;
  loading?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
