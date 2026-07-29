import { FilterListRequestBody, FilterListResponse } from '@/shared/types/products/filter/filter';

export const getFilterList = async <T>(
  endpoint: string,
  { page = 1, limit = 20 }: FilterListRequestBody
): Promise<FilterListResponse<T>> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`);

  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch categories (${response.status})`);
  }

  const result = await response.json();

  return {
    data: result.payload?.data ?? [],
    metadata: result.payload?.metadata ?? { page, limit, total: 0, totalPages: 0 },
  };
};
