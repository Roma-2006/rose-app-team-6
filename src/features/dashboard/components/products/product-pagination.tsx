'use client';
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
import { useSearchParams } from 'next/navigation';
export default function ProductPagination({ productMetaData }: TProductMetaDataProps) {
  // Navigation
  const searchParams = useSearchParams();
  // Variables
  const { page, totalPages } = productMetaData;
  // Functions
  const createPageUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    return `/products?${params.toString()}`;
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
            className="size-8!"
            href={createPageUrl(1)}
            buttonVariant="icon"
            iconOnly={<ChevronsLeft />}
            disabled={page === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            className="size-8!"
            href={createPageUrl(Math.max(1, page - 1))}
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
                href={createPageUrl(item as number)}
                isActive={page === item}
                number={item as number}
              />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className="size-8!"
            href={createPageUrl(Math.min(totalPages, page + 1))}
            buttonVariant="icon"
            iconOnly={<ChevronRightIcon data-icon="inline-end" />}
            disabled={page === totalPages}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="size-8!"
            href={createPageUrl(totalPages)}
            buttonVariant="icon"
            iconOnly={<ChevronsRight />}
            disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
