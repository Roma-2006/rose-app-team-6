'use server';

import { ApiResponse } from '../../types/categories/categories';

// تأمين الاتصال البيئي عبر حجب الكود المباشر في الفرونت هند
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategoriesAction(page = 1, search = '', limit = 12) {
  const validatedPage = Math.max(1, Number(page) || 1);
  const validatedLimit = Math.max(1, Number(limit) || 12);

  // ميكانيكية الـ Timeout لحماية السيرفر من التعليق اللانهائي في حال بطء قواعد البيانات
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

    const response = await fetch(`${API_BASE_URL}/categories?${query.toString()}`, {
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Core API error: Received HTTP status code ${response.status}`);
    }

    const resData: ApiResponse = await response.json();

    // 1. استخراج الفئات بأمان من داخل الـ payload
    const categories = resData?.payload?.data || [];

    // 2. قفل حلقة اختفاء الـ Pagination بعمل حسبة احتياطية ذكية (Fallback Calculation)
    const rawTotalPages = resData?.payload?.totalPages;
    const totalItems = resData?.payload?.totalItems || 0;

    let calculatedTotalPages = 1;

    if (rawTotalPages && rawTotalPages > 1) {
      calculatedTotalPages = rawTotalPages;
    } else if (totalItems > 0) {
      calculatedTotalPages = Math.ceil(totalItems / validatedLimit);
    } else {
      calculatedTotalPages =
        categories.length >= validatedLimit ? validatedPage + 1 : validatedPage;
    }

    console.log(
      `[Pagination Debug] Items: ${totalItems}, Total Pages Sent To Component: ${calculatedTotalPages}`
    );

    return {
      categories: categories,
      totalPages: calculatedTotalPages || 1,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Fetch Categories Action Error: Connection request timed out');
      } else {
        console.error('Fetch Categories Action Error:', error.message || error);
      }
    }
    return { categories: [], totalPages: 1, error: true };
  }
}
