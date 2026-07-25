import {
  Occasion,
  OccasionsRequestBody,
  OccasionsResponse,
} from '@/shared/types/products/filter/occasion';

export const getOccasions = async ({
  page = 1,
  limit = 20,
}: OccasionsRequestBody): Promise<OccasionsResponse> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/occasions`);

  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch Occasions');
  }

  const result = await response.json();

  return {
    data: result.payload?.data ?? [],
    metadata: result.payload?.metadata ?? { page, limit, total: 0, totalPages: 0 },
  };
};
