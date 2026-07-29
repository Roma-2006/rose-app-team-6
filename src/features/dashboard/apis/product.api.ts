import type { GetProductsParams } from '../../../shared/types/product-query';
import { TProductsResponse } from '@/features/dashboard/types/products';
import { Response } from '../../../shared/types/api';

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
    search,
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

  if (search) {
    url.searchParams.set('search', search);
  }
  console.log(url.toString());
  const response = await fetch(url.toString());
  const result: Response<TProductsResponse> = await response.json();
  if (!result.status) {
    throw new Error('Failed to fetch products');
  }
  return result.payload;
}
