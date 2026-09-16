import { TProductsResponse } from '@/features/main/types/products';
import { Response } from '@/shared/types/api';
import { GetProductsParams } from '@/features/main/types/product-query';

export async function getProducts(params: GetProductsParams = {}) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  const {
    page,
    limit = 12,
    occasionId,
    categoryId,
    subCategoryId,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    sortOrder,
  } = params;

  const queryParams = {
    page,
    limit,
    occasionId,
    categoryId,
    subCategoryId,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    sortOrder,
  };

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url.toString());
  const result: Response<TProductsResponse> = await response.json();
  if (!result.status) {
    throw new Error('Failed to fetch products');
  }
  return result.payload;
}
