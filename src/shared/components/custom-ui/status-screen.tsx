import { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

type StatusScreenProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
};

export function StatusScreen({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: StatusScreenProps) {
  return (
    <div className="flex h-full min-h-[70vh] w-full flex-col items-center justify-center gap-6 px-6 text-center self-center">
      <div className="text-text-plain/80 ">{icon}</div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-text-plain sm:text-3xl">{title}</h1>
        {description && <p className="max-w-sm text-sm text-text-plain/60">{description}</p>}
      </div>

      {actionLabel &&
        (actionHref ? (
          <Button buttonVariant="text" variant="outline">
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : (
          <Button buttonVariant="text" variant="outline" onClick={onAction}>
            {actionLabel}
          </Button>
        ))}
    </div>
  );
}
