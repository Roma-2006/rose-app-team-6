'use server';

import { ApiResponse } from '../../types/categories/categories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategoriesAction(page = 1, search = '', limit = 12) {
  try {
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

    // 1. استخراج الفئات بأمان من داخل الـ payload
    const categories = resData.payload?.data || [];

    // 2. قفل حلقة اختفاء الـ Pagination بعمل حسبة احتياطية ذكية (Fallback Calculation)
    const rawTotalPages = resData.payload?.totalPages;
    const totalItems = resData.payload?.totalItems || 0;

    let calculatedTotalPages = 1;

    if (rawTotalPages && rawTotalPages > 1) {
      // إذا كان الـ API يرسل عدد الصفحات بشكل صحيح وصريح
      calculatedTotalPages = rawTotalPages;
    } else if (totalItems > 0) {
      // حساب الصفحات ديناميكياً: إجمالي العناصر تقسيم 12 (الـ limit) لضمان دقة ظهور الأزرار
      calculatedTotalPages = Math.ceil(totalItems / limit);
    } else {
      // حل أخير في حال غياب كل المؤشرات من الباكيند (إظهار صفحات افتراضية كافية لتنقل المستخدم)
      calculatedTotalPages = categories.length >= limit ? page + 1 : page;
    }

    // تأكيد طباعة الحسبة في الـ Terminal لتتبع القيمة
    console.log(
      `[Pagination Debug] Items: ${totalItems}, Total Pages Sent To Component: ${calculatedTotalPages}`
    );

    return {
      categories: categories,
      totalPages: calculatedTotalPages || 1, // إرسال القيمة الحقيقية للجدول لمنع اختفائه بصرياً
    };
  } catch (error) {
    console.error('Fetch Categories Action Error:', error);
    return { categories: [], totalPages: 1, error: true };
  }
}
