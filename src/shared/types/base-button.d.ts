import { ReactNode } from 'react';

export type TBaseButtonProps = {
  loading: boolean;
  title: string;
  disabled: boolean;
  handleClick: () => void;
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
  iconOnly: booolean;
};
