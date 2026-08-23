'use server';

import { ApiResponse } from '../../types/categories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategoriesAction(page = 1, search = '', limit = 20) {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search.trim()) {
    query.append('search', search.trim().substring(0, 200));
  }

  const response = await fetch(`${API_BASE_URL}/categories?${query.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('Failed to fetch categories from core API');

  const resData: ApiResponse = await response.json();

  if (resData.status && typeof resData.payload === 'string') {
    return JSON.parse(resData.payload);
  }
  return resData.payload || { categories: [], totalPages: 1 };
}
