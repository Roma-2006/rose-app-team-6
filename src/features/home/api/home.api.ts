// src/features/home/api/home.api.ts

import type { Product } from '../types/product.type';
import type { Occasion } from '../types/occasion.type';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const getProducts = async (
  occasionId?: string,
  limit = 20 // أضفنا limit هنا وافتراضياً 20
): Promise<Product[]> => {
  const url = new URL(`${BASE_URL}/products`);

  // نرسل الـ limit للـ API عشان يرجع عدد كبير من المنتجات
  url.searchParams.append('limit', String(limit));

  if (occasionId) {
    url.searchParams.append('occasionId', occasionId);
  }

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Failed to fetch products');

  const result = await response.json();
  return result.payload?.data || [];
};

export const getOccasions = async (
  page = 1,
  limit = 20
): Promise<{ occasions: Occasion[]; total?: number; totalPages?: number }> => {
  const url = new URL(`${BASE_URL}/occasions`);
  url.searchParams.append('page', String(page));
  url.searchParams.append('limit', String(limit));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch occasions');
  }

  const result = await response.json();

  return {
    occasions: result.payload?.data || [],
    total: result.payload?.metadata?.total ?? result.metadata?.total,
    totalPages: result.payload?.metadata?.totalPages ?? result.metadata?.totalPages,
  };
};
