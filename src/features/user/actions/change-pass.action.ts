'use server';

import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth/next';
import { ChangePasswordPayload } from '../types/api';

export async function changePasswordAction(formData: ChangePasswordPayload): Promise<string> {
  const session = await getServerSession(authOptions);

  if (!session || !session.token) {
    throw new Error('Unauthorized access. Please log in again.');
  }

  if (formData.newPassword !== formData.confirmNewPassword) {
    throw new Error('New passwords do not match.');
  }

  const response: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Your session has expired. Please log in again.');
    }
    const errorText: string = await response.text();
    throw new Error(errorText || 'Failed to update password');
  }

  return await response.text();
}
