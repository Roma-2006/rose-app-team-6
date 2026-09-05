'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { Category, CreateCategoryType } from '../../types/categories/categories';
import { CreateOccasionType, Occasion } from '../../types/occasions/occasions';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ActionResponse {
  success: boolean;
  message: string;
  data?: Occasion;
}

interface UpdateOccasionArgs {
  id: string;
  data: Partial<CreateOccasionType>;
}

export async function updateOccasionAction({
  id,
  data,
}: UpdateOccasionArgs): Promise<ActionResponse> {
  if (!id || typeof id !== 'string' || !id.trim()) {
    return { success: false, message: 'Invalid or missing occasion identifier.' };
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

    const response = await fetch(`${API_BASE_URL}/occasions/${id.trim()}`, {
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

    if (!response.ok || resData.status !== true) {
      if (response.status === 401) {
        return { success: false, message: 'Your session has expired. Please log in again.' };
      }
      return { success: false, message: resData.message || 'Failed to update occasion' };
    }

    revalidatePath('/dashboard/occasion', 'page');
    return {
      success: true,
      message: resData.message || 'Occasion updated successfully',
      data: resData.payload,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update occasion';
    console.error('Update Occasion Error:', errorMessage);
    return { success: false, message: errorMessage };
  }
}
