'use server';

import { ApiResponse } from '../../types/categories/categories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOccasionsAction(page = 1, search = '', limit = 12) {
  const validatedPage = Math.max(1, Number(page) || 1);
  const validatedLimit = Math.max(1, Number(limit) || 12);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    if (!API_BASE_URL) {
      throw new Error('API_BASE_URL configuration is missing in server environment variables');
    }

    const query = new URLSearchParams({
      page: validatedPage.toString(),
      limit: validatedLimit.toString(),
    });

    if (search.trim()) {
      query.append('search', search.trim().substring(0, 200));
    }

    const response = await fetch(`${API_BASE_URL}/occasions?${query.toString()}`, {
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Core API error: Received HTTP status code ${response.status}`);
    }

    const resData: ApiResponse = await response.json();

    const occasions = resData?.payload?.data || [];

    const rawTotalPages = resData?.payload?.totalPages;
    const totalItems = resData?.payload?.totalItems || 0;

    let calculatedTotalPages = 1;

    if (rawTotalPages && rawTotalPages > 1) {
      calculatedTotalPages = rawTotalPages;
    } else if (totalItems > 0) {
      calculatedTotalPages = Math.ceil(totalItems / validatedLimit);
    } else {
      calculatedTotalPages = occasions.length >= validatedLimit ? validatedPage + 1 : validatedPage;
    }

    console.log(
      `[Pagination Debug] Items: ${totalItems}, Total Pages Sent To Component: ${calculatedTotalPages}`
    );

    return {
      occasions: occasions,
      totalPages: calculatedTotalPages || 1,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Fetch Occasions Action Error: Connection request timed out');
      } else {
        console.error('Fetch Occasions Action Error:', error.message || error);
      }
    }
    return { occasions: [], totalPages: 1, error: true };
  }
}
