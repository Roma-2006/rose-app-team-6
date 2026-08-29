'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // 🛠️ جلب إعدادات الأوث المعتمدة بمشروعك لحل مشكلة التوكن
import { CreateCategoryType } from '../../types/categories/categories';

// تأمين الاتصال البيئي عبر حجب الكود المباشر في الفرونت هند
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createCategoryAction(data: CreateCategoryType): Promise<unknown> {
  // حماية احتياطية: التأكد من وجود بيانات صالحة قبل بدء الاتصال
  if (!data || Object.keys(data).length === 0) {
    throw new Error('Invalid or empty category data provided.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    if (!API_BASE_URL) {
      throw new Error('API URL configuration is missing in server environment variables.');
    }

    // 1. 🛠️ الحل الجذري: جلب الجلسة والتحقق من التوكن لحماية طلب الإضافة على السيرفر
    const session = await getServerSession(authOptions);

    if (!session || !session.token) {
      throw new Error('Unauthorized access. Please log in again to receive a session token.');
    }

    // 2. إرسال طلب الـ POST مع تضمين الـ Authorization Bearer Token المطلوبة من الباكيند
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`, // 🛠️ تمرير التوكن الموثوق لحل خطأ "No token provided"
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let resData;
    try {
      resData = await response.json();
    } catch {
      throw new Error(`Failed to parse server response. Status code: ${response.status}`);
    }

    // التحقق من نجاح العملية بناءً على استجابة الـ API (HTTP Status & status code)
    if (!response.ok || !resData?.status) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          'Your session has expired or you do not have Admin clearance. Please log in again.'
        );
      }
      throw new Error(resData?.message || `Failed to create category (HTTP ${response.status})`);
    }

    // تنظيف كاش الجدول لتظهر الفئة الجديدة فوراً للمستخدم عند العودة
    revalidatePath('/dashboard/category', 'page');

    return resData;
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    let errorMessage = 'Failed to create category';
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'The core API network request timed out.';
      } else {
        errorMessage = error.message;
      }
    }

    console.error('Create Category Action Error:', errorMessage);
    throw new Error(errorMessage);
  }
}
