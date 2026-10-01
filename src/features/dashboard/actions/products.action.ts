'use server';

import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
//delete
export async function deleteProduct({ productId }: { productId: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.token) {
    throw new Error('Authentication required');
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const payload = await response.json();
  console.log(payload, 'delete');
  if (!response.ok) {
    throw new Error(payload?.message || 'Failed to delete product');
  }
  revalidatePath('/dashboard/product');
  return payload;
}
