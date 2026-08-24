'use server';

import { revalidatePath } from 'next/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// استقبل الـ token مباشرة هنا كـ parameter
export async function deleteCategoryAction(id: string, token?: string) {
  try {
    if (!token) {
      throw new Error('No token found in client storage');
    }

    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // حقنه مباشرة في الطلب الخلفي
      },
    });

    const resData = await response.json();

    if (!response.ok || !resData.status) {
      throw new Error(resData.message || 'Failed to delete category');
    }

    revalidatePath('/dashbord/category', 'page');
    revalidatePath('/dashboard/category', 'page');

    return resData;
  } catch (error: unknown) {
    // إصلاح الخطأ عبر فحص نوع الكائن بأمان لمنع الـ any error
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete category';
    console.error('Delete Category Authorization Error:', errorMessage);
    throw new Error(errorMessage);
  }
}
