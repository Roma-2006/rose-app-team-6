'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { Category, CreateCategoryType } from '../../types/categories/categories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ActionResponse {
  success: boolean;
  message: string;
  data?: Category;
}

interface UpdateCategoryArgs {
  id: string; // string($uuid)
  data: Partial<CreateCategoryType>; // { title, description }
}

export async function updateCategoryAction({
  id,
  data,
}: UpdateCategoryArgs): Promise<ActionResponse> {
  if (!id || typeof id !== 'string' || !id.trim()) {
    return { success: false, message: 'Invalid or missing category identifier.' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    if (!API_BASE_URL) {
      throw new Error('API URL configuration is missing in server environment variables.');
    }
    const session = await getServerSession(authOptions);

    if (!session || !session.token) {
      clearTimeout(timeoutId);
      return { success: false, message: 'Unauthorized access. Please log in again.' };
    }

    const response = await fetch(`${API_BASE_URL}/categories/${id.trim()}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const resData = await response.json();

    // 2. التحقق من نجاح العملية بناءً على هيكلة الـ API الخاصة بكِ (status: true)
    if (!response.ok || resData.status !== true) {
      if (response.status === 401) {
        return { success: false, message: 'Your session has expired. Please log in again.' };
      }
      // جلب رسالة الخطأ القادمة مباشرة من الـ API
      return { success: false, message: resData.message || 'Failed to update category' };
    }

    // 3. تحديث الكاش وإرجاع الاستجابة بنجاح
    revalidatePath('/dashboard/category', 'page');
    return {
      success: true,
      message: resData.message || 'Category updated successfully',
      data: resData.payload, // الـ payload يحتوي على البيانات المحدثة حسب الـ Schema
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update category';
    console.error('Update Category Error:', errorMessage);
    return { success: false, message: errorMessage };
  }
}
