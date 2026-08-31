'use server';

import { ChangePasswordRequest } from '@/features/main/types/auth';
import { cookies } from 'next/headers';

export async function changePassword(data: ChangePasswordRequest) {
  const token = (await cookies()).get('accessToken')?.value;

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.message || 'Change password failed') as Error & {
      status?: number;
    };
    error.status = response.status;
    throw error;
  }

  return result;
}
