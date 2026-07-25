'use client';

import { usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { TProductMetaDataProps } from '../../types/products';

export default function ProductPagination({ productMetaData }: TProductMetaDataProps) {
  const pathname = usePathname(); // hook called at top level of the component
  const searchParams = useSearchParams(); // hook called at top level of the component
  const { page, totalPages } = productMetaData;

  const buildHref = (targetPage: number | string) => {
    // plain function — just uses the values already pulled from the hooks above
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(targetPage));
    return `${pathname}?${params.toString()}`;
  };

  const getPages = () => {
    const pages: (string | number)[] = [];
    const start = Math.max(2, page - 2);
    const end = Math.min(totalPages - 1, page + 2);
    pages.push(1);
    if (start > 2) {
      pages.push('...');
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages - 1) {
      pages.push('...');
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };
  const pages = getPages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(1)}
            buttonVariant="icon"
            iconOnly={<ChevronsLeft />}
            disabled={page === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(Math.max(1, page - 1))}
            buttonVariant="icon"
            iconOnly={<ChevronLeftIcon data-icon="inline-start" />}
            disabled={page === 1}
          />
        </PaginationItem>
        {pages.map((item, index) => (
          <PaginationItem key={index + 1}>
            {item === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                buttonVariant="number"
                href={buildHref(item)}
                isActive={page === item}
                number={item as number}
              />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={buildHref(Math.min(totalPages, page + 1))}
            buttonVariant="icon"
            iconOnly={<ChevronRightIcon data-icon="inline-end" />}
            disabled={page === totalPages}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={buildHref(totalPages)}
            buttonVariant="icon"
            iconOnly={<ChevronsRight />}
            disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
