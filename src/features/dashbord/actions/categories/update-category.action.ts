'use server';

import { revalidatePath } from 'next/cache';
import { CreateCategoryType } from '../../types/categories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateCategoryAction({
  id,
  data,
}: {
  id: string;
  data: Partial<CreateCategoryType>;
}) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const resData = await response.json();
  if (!response.ok || !resData.status) {
    throw new Error(resData.message || 'Failed to update category');
  }

  revalidatePath('/admin/categories');
  return resData;
}
