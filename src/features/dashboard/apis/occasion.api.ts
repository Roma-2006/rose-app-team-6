import type { Occasion } from '../types/occasion';

export const getOccasions = async (page = 1, limit = 20): Promise<Occasion[]> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/occasions`);

  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch occasions');
  }

  const result = await response.json();

  return result.payload?.data ?? [];
};
