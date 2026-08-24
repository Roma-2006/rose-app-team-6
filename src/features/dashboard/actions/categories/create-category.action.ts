'use server';

import { revalidatePath } from 'next/cache';
import { CreateCategoryType } from '../../types/categories/categories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createCategoryAction(data: CreateCategoryType) {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const resData = await response.json();
  if (!response.ok || !resData.status) {
    throw new Error(resData.message || 'Failed to create category');
  }

  revalidatePath('/dashbord/category', 'page');
  return resData;
}
