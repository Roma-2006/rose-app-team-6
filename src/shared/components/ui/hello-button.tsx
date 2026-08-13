// hello-button.tsx
import { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { Button } from './button';

type HelloButtonProps = Omit<
  ComponentProps<typeof Button>,
  'children' | 'buttonVariant' | 'iconOnly' | 'leftIcon' | 'rightIcon'
> & {
  /** Displayed as the bold line under the greeting */
  name: string;
};

function HelloButton({ name, className, variant, ...props }: HelloButtonProps) {
  // Translations
  const t = useTranslations();

  return (
    <Button
      buttonVariant="text"
      {...props}
      variant={variant ?? 'ghost'}
      className={cn('h-auto w-fit items-center gap-1.5 rounded-lg px-2 py-1 ', className)}
    >
      <span className="flex flex-col items-start leading-tight rtl:items-end">
        <span className="text-xs font-normal text-text-muted">{t('header.user-menu.title')}</span>
        <span className="text-sm font-semibold text-text-primary">{name}</span>
      </span>
      <ChevronDown className="size-4 text-text-muted transition-transform group-data-popup-open/button:rotate-180" />
    </Button>
  );
}

export { HelloButton };
