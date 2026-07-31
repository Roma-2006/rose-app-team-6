import { IApiResponse, IPaginatedResponse } from '../types/api';
import { GetProductReviewsParams, IProductReview } from '../types/product-reviews';

export async function getProductReviews({
  productId,
  page = 1,
  limit = 5,
}: GetProductReviewsParams): Promise<IPaginatedResponse<IProductReview>> {
  const params = new URLSearchParams({
    productId,
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?${params.toString()}`, {
    cache: 'no-store',
  });

  const result: IApiResponse<IPaginatedResponse<IProductReview>> = await response.json();

  if (!response.ok || !result.status || !result.payload) {
    throw new Error(result.message || 'Failed to fetch reviews');
  }

  return result.payload;
}
