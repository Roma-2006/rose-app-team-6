import { ReactNode } from 'react';

export type TButtonProps = {
  loading?: boolean;
  title: string;
  disabled: boolean;
  onClick: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant:
    | 'primary'
    | 'outline'
    | 'secondary'
    | 'subtle'
    | 'ghost'
    | 'destructive'
    | 'link'
    | null
    | undefined;
  iconOnly?: ReactNode;
};
