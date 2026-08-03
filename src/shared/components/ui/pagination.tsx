import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { MoreHorizontalIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex items-center gap-0.5', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}
type TPaginationButtonBaseProps = {
  disabled?: boolean;
};
type TPaginationButtonProps = TPaginationButtonBaseProps &
  (
    | {
        buttonVariant: 'number';
        number: number;
      }
    | {
        buttonVariant: 'icon';
        iconOnly: React.ReactNode;
      }
  );
type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof Link> &
  TPaginationButtonProps;

function PaginationLink(props: PaginationLinkProps) {
  const { className, isActive, href, buttonVariant, ...rest } = props;
  const buttonProps =
    buttonVariant === 'number'
      ? {
          buttonVariant,
          number: props.number,
        }
      : {
          buttonVariant,
          iconOnly: props.iconOnly,
        };
  return (
    <Button
      variant={isActive ? 'primary' : 'link'}
      className={className}
      {...buttonProps}
      nativeButton={false}
      render={
        <Link
          href={href}
          aria-current={isActive ? 'page' : undefined}
          data-slot="pagination-link"
          data-active={isActive}
        />
      }
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      {...props}
      aria-label="Go to previous page"
      className={cn('pl-1.5! ', className)}
    />
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink {...props} aria-label="Go to next page" className={cn('pr-1.5!', className)} />
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
