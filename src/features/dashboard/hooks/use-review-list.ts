'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getProductReviews } from '../api/product-review.api';
import { IPaginatedResponse } from '../types/api';
import { IProductReview } from '../types/product-reviews';

interface UseProductReviewsParams {
  productId: string;
  initialReviews: IProductReview[];
  totalReviews: number;
  limit?: number;
}

export function useProductReviews({
  productId,
  initialReviews,
  totalReviews,
  limit = 5,
}: UseProductReviewsParams) {
  const initialPage: IPaginatedResponse<IProductReview> = {
    data: initialReviews,
    metadata: {
      page: 1,
      limit,
      total: totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
    },
  };

  return useInfiniteQuery({
    queryKey: ['product-reviews', productId, limit],

    queryFn: ({ pageParam }) =>
      getProductReviews({
        productId,
        page: pageParam,
        limit,
      }),

    initialPageParam: 1,

    initialData: {
      pages: [initialPage],
      pageParams: [1],
    },

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.metadata;

      return page < totalPages ? page + 1 : undefined;
    },

    enabled: Boolean(productId),
    staleTime: 60_000,
  });
}
