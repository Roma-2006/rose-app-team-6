import { ReactNode } from 'react';

export type TBaseButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  variant:
    | 'primary'
    | 'outline'
    | 'secondary'
    | 'subtle'
    | 'ghost'
    | 'destructive'
    | 'softPink'
    | 'link'
    | 'softPink'
    | 'danger'
    | 'blue'
    | 'ghostBlue'
    | 'ghostDanger'
    | null
    | undefined;
};

export type TTextButton = TBaseButtonProps & {
  buttonVariant: 'text';
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  responsiveIconOnly?: boolean;
};

export type TIconButtonProps = TBaseButtonProps & {
  buttonVariant: 'icon';
  iconOnly: ReactNode;
};

export type TNumberButtonProps = TBaseButtonProps & {
  buttonVariant: 'number';
  number: number;
};
export type TButtonProps = TTextButton | TIconButtonProps | TNumberButtonProps;
