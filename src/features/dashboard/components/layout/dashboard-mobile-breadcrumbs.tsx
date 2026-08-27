'use client';

import { Fragment } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { CircleUserRound, Menu } from 'lucide-react';

// Lib
import { Link, usePathname } from '@/i18n/navigation';

// Relatives
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/shared/components/custom-ui/breadcrumb';
import { UserDropdown } from '@/features/dashboard/components/layout/user-dropdown';
import { useBreadcrumbContext } from '@/features/dashboard/context/breadcrumbs-context';
import { BreadcrumbOverrideItem } from '@/features/dashboard/types/layout/breadcrumb';
import { useDeleteAccount } from '@/features/dashboard/hooks/use-delete-account';

export function DashboardHeaderMobile() {
  // State
  const { data: session } = useSession();
  const pathname = usePathname();
  const { override } = useBreadcrumbContext();
  const { handleDelete } = useDeleteAccount?.() ?? {};

  // Variables
  const image = session?.user?.photo;
  const firstname = session?.user?.firstName ?? 'Firstname';

  const crumbs: BreadcrumbOverrideItem[] =
    override ??
    pathname
      .split('/')
      .filter(Boolean)
      .map((segment, index, segmentsArr) => {
        const href = '/' + segmentsArr.slice(0, index + 1).join('/');
        const label = decodeURIComponent(segment).replace(/-/g, ' ');
        return { label: label.charAt(0).toUpperCase() + label.slice(1), href };
      });

  // Functions

  if (crumbs.length === 0) return null;

  // Collapse deep paths: keep first + last, hide the middle behind an ellipsis
  const visibleCrumbs =
    crumbs.length > 2
      ? [
          crumbs[0],
          { label: '…', href: undefined, isEllipsis: true } as BreadcrumbOverrideItem & {
            isEllipsis?: boolean;
          },
          crumbs[crumbs.length - 1],
        ]
      : crumbs;

  return (
    <div className="sticky top-0 z-30 w-full h-14 px-3 flex items-center justify-between gap-2 border-b border-border-muted bg-bg-plain shadow-shadow-subtle-sm">
      {/* Logo */}
      <Link href="/" className="shrink-0">
        <Image
          src="/assets/icons/logo.png"
          alt="rosse"
          width={60}
          height={60}
          className="h-8 w-auto"
          priority
        />
      </Link>

      {/* Breadcrumb */}
      <Breadcrumb className="flex-1 min-w-0 overflow-hidden">
        <BreadcrumbList className="flex-nowrap">
          {visibleCrumbs.map((crumb, index) => {
            const isLast = index === visibleCrumbs.length - 1;
            const isEllipsis = 'isEllipsis' in crumb && crumb.isEllipsis;

            return (
              <Fragment key={crumb.href ?? crumb.label}>
                <BreadcrumbItem className="p-0.5 min-w-0">
                  {isEllipsis ? (
                    <BreadcrumbEllipsis className="text-text-muted" />
                  ) : isLast || !crumb.href ? (
                    <BreadcrumbPage className="text-text-primary text-xs font-medium truncate max-w-36">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      render={<Link href={crumb.href} />}
                      className="text-text-muted text-xs font-normal truncate max-w-24"
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="rtl:rotate-180 shrink-0" />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Avatar (visual) + Hamburger (opens account menu) */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-bg-primary-fade">
          {image ? (
            <Image src={image} alt={firstname} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-text-primary">
              <CircleUserRound size={20} />
            </div>
          )}
        </div>

        <UserDropdown
          trigger={
            <button
              type="button"
              aria-label="account-menu"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-soft"
            >
              <Menu size={20} />
            </button>
          }
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
