import { useEffect, useRef } from 'react';
import { useInfiniteQuery, QueryKey } from '@tanstack/react-query';
import { FilterListResponse } from '@/shared/types/products/filter/filter';

interface UseInfiniteFilterListParams<T> {
  queryKey: QueryKey;
  queryFn: (params: { page: number; limit: number }) => Promise<FilterListResponse<T>>;
  limit: number;
}

export function useInfiniteFilterList<T>({
  queryKey,
  queryFn,
  limit,
}: UseInfiniteFilterListParams<T>) {
  // State
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.metadata.page < lastPage.metadata.totalPages
        ? lastPage.metadata.page + 1
        : undefined,
  });

  // Variables
  const items = data?.pages.flatMap((page) => page.data) ?? [];

  // Effects
  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: sentinel.parentElement, threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { items, isLoading, isFetchingNextPage, hasNextPage, loadMoreRef };
}
