'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // 🛠️ استخدام مسار استيراد إعدادات الأوث المعتمد لديكِ
import { Category } from '../types/categories/categories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ActionResponse {
  success: boolean;
  message: string;
  data?: Category;
}

export async function getCategoryByIdAction(id: string): Promise<ActionResponse> {
  if (!id || typeof id !== 'string' || !id.trim()) {
    return { success: false, message: 'Invalid or missing category identifier.' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    if (!API_BASE_URL) {
      throw new Error('API URL configuration is missing in server environment variables.');
    }

    // 1. جلب الجلسة والتحقق من التوكن لحماية الطلب على السيرفر
    const session = await getServerSession(authOptions);

    if (!session || !session.token) {
      clearTimeout(timeoutId);
      return { success: false, message: 'Unauthorized access. Please log in again.' };
    }

    const response = await fetch(`${API_BASE_URL}/categories/${id.trim()}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const resData = await response.json();

    // 3. التحقق من نجاح الاستجابة من الـ API
    if (!response.ok || resData.status !== true) {
      if (response.status === 401) {
        return { success: false, message: 'Your session has expired. Please log in again.' };
      }
      return { success: false, message: resData.message || 'Failed to fetch category data' };
    }

    // 4. إرجاع البيانات بنجاح (تأكدي إذا كانت البيانات تعود في حقل payload أو data حسب الـ API)
    return {
      success: true,
      message: 'Category data fetched successfully',
      data: resData.payload || resData.data,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch category data';
    console.error('Get Category By ID Error:', errorMessage);
    return { success: false, message: errorMessage };
  }
}
