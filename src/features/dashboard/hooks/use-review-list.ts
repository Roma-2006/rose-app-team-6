'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getProductReviews } from '../api/product-review.api';

export function useProductReviews(productId: string, limit = 5) {
  return useInfiniteQuery({
    queryKey: ['product-reviews', productId, limit],

    queryFn: ({ pageParam }) =>
      getProductReviews({
        productId,
        page: pageParam,
        limit,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.metadata;

      return page < totalPages ? page + 1 : undefined;
    },

    enabled: Boolean(productId),
  });
}
