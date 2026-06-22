//font in light &dark
'use client';
import { LoaderCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { TBaseButtonProps } from '@/shared/types/base-button';

export default function Basebutton({
  loading,
  title = 'check',
  disabled,
  // onClick,
  leftIcon,
  rightIcon,
  variant,
  iconOnly,
}: TBaseButtonProps) {
  return (
    <Button
      aria-busy={loading}
      aria-label={iconOnly ? title : undefined}
      disabled={disabled || loading}
      // onClick={() => onClick?.()}
      size={iconOnly ? 'icon' : 'custom'}
      variant={variant}
    >
      {!loading && leftIcon}
      {loading ? 'Loading' : title}
      {loading && <LoaderCircle className="animate-spin" size={18} />}
      {!loading && rightIcon}
    </Button>
  );
}
