import {
  Category,
  CategoriesRequestBody,
  CategoriesResponse,
} from '@/shared/types/products/filter/category';

export const getCategories = async ({
  page = 1,
  limit = 20,
}: CategoriesRequestBody): Promise<CategoriesResponse> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch Categories');
  }

  const result = await response.json();

  return {
    data: result.payload?.data ?? [],
    metadata: result.payload?.metadata ?? { page, limit, total: 0, totalPages: 0 },
  };
};
