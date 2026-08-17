// hello-button.tsx
import { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { Button } from './button';
import Avatar from '../custom-ui/avatar';
type HelloButtonProps = Omit<
  ComponentProps<typeof Button>,
  'children' | 'buttonVariant' | 'iconOnly' | 'leftIcon' | 'rightIcon'
> & {
  /** Displayed as the bold line under the greeting */
  name: string;
  photo?: string | null;
};

function HelloButton({ name, className, variant, photo, ...props }: HelloButtonProps) {
  // Translations
  const t = useTranslations();

  return (
    <Button
      buttonVariant="text"
      {...props}
      variant={variant ?? 'ghost'}
      className={cn('h-auto w-fit items-center gap-1.5 rounded-lg px-2 py-1 ', className)}
    >
      <span className="flex gap-2">
        <span className="relative h-10 w-10 rounded-full bg-bg-primary ">
          <Avatar src={photo} alt="Profile photo" fallback={name} size={40} />
        </span>
        <div className="flex flex-col items-start leading-tight rtl:items-end">
          <span className="text-xs font-normal text-text-muted">{t('header.user-menu.title')}</span>
          <span className="text-sm font-semibold text-text-primary">{name}</span>
        </div>
      </span>
      <ChevronDown className="size-4 text-text-muted transition-transform group-data-popup-open/button:rotate-180" />
    </Button>
  );
}

export { HelloButton };
