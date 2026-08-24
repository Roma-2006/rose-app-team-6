'use client';

import { Fragment } from 'react';

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
} from '@/shared/components/custom-ui/breadcrumb';
import { useBreadcrumbContext } from '@/features/dashboard/context/breadcrumbs-context';
import { BreadcrumbOverrideItem } from '@/features/dashboard/types/layout/breadcrumb';

export function DashboardBreadcrumbs() {
  // Variables
  const pathname = usePathname();
  const { override } = useBreadcrumbContext();

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

  return (
    <Breadcrumb className="w-full h-17.5 p-4 border-b border-border-muted self-center bg-amber-400">
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <Fragment key={crumb.href ?? crumb.label}>
              <BreadcrumbItem className="p-1">
                {isLast || !crumb.href ? (
                  <BreadcrumbPage className="text-text-primary text-sm font-normal">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={<Link href={crumb.href} />}
                    className="text-text-muted text-sm font-normal"
                  >
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="rtl:rotate-180" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
