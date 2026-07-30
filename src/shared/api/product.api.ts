import type { Product } from '../types/product-type';
import type { GetProductsParams } from '../types/product-query-type';

const DEFAULT_LIMIT = 12;

export async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);

  const {
    page,
    limit = DEFAULT_LIMIT,
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

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.payload.data;
}
