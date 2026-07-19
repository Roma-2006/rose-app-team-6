import type { Product } from '../types/product.type';
import type { Occasion } from '../types/occasion.type';

export const getProducts = async (
  occasionId?: string,
  limit = 12,
  sortBy?: 'bestSelling' | 'mostPopular'
): Promise<Product[]> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  url.searchParams.append('limit', String(limit));

  if (occasionId) {
    url.searchParams.append('occasionId', occasionId);
  }

  if (sortBy) {
    url.searchParams.append('sortBy', sortBy);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const result = await response.json();

  return result.payload?.data || [];
};

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
