'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function deleteOccasionAction(id: string) {
  if (!id || typeof id !== 'string' || !id.trim()) {
    throw new Error('Invalid occasion ID identifier specified.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    if (!API_BASE_URL) {
      throw new Error('API URL configuration is missing in server environment variables.');
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.token) {
      throw new Error('Unauthorized access. Please log in again.');
    }

    const response = await fetch(`${API_BASE_URL}/occasions/${id.trim()}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          'Your session has expired or you do not have Admin clearance. Please log in again.'
        );
      }

      const errorText = await response.text();
      try {
        const errorObj = JSON.parse(errorText);
        throw new Error(errorObj.message || errorObj.error || 'Failed to delete category');
      } catch {
        throw new Error(errorText || 'Failed to delete occasion');
      }
    }

    revalidatePath('/dashboard/occasion', 'page');

    return 'Occasion deleted successfully';
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    let errorMessage = 'Failed to delete occasion';
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'The server core connection request timed out.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
    }

    console.error('Delete Occasion Error:', errorMessage);
    throw new Error(errorMessage);
  }
}
