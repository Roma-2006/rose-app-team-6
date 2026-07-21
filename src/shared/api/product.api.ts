import type { Product } from '../types/product.type';
import type { GetProductsParams } from '../types/product-query.type';

export async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
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

  url.searchParams.set('limit', String(limit));

  if (page) {
    url.searchParams.set('page', String(page));
  }

  if (occasionId) {
    url.searchParams.set('occasionId', occasionId);
  }

  if (categoryId) {
    url.searchParams.set('categoryId', categoryId);
  }

  if (subCategoryId) {
    url.searchParams.set('subCategoryId', subCategoryId);
  }

  if (minPrice !== undefined) {
    url.searchParams.set('minPrice', String(minPrice));
  }

  if (maxPrice !== undefined) {
    url.searchParams.set('maxPrice', String(maxPrice));
  }

  if (minRating !== undefined) {
    url.searchParams.set('minRating', String(minRating));
  }

  if (sortBy) {
    url.searchParams.set('sortBy', sortBy);
  }

  if (sortOrder) {
    url.searchParams.set('sortOrder', sortOrder);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const result = await response.json();

  return result.payload.data;
}

// export const getOccasions = async (
//   page = 1,
//   limit = 12
// ): Promise<{ occasions: Occasion[]; total?: number; totalPages?: number }> => {
//   const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/occasions`);
//   url.searchParams.append('page', String(page));
//   url.searchParams.append('limit', String(limit));

//   const response = await fetch(url.toString());

//   if (!response.ok) {
//     throw new Error('Failed to fetch occasions');
//   }

//   const result = await response.json();

//   return {
//     occasions: result.payload?.data || [],
//   };
// };
