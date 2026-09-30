'use server';

import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth/next';
import { ActionResponse, ChangePasswordPayload } from '../types/api';

export async function changePasswordAction(
  formData: ChangePasswordPayload
): Promise<ActionResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.token) {
      return { success: false, message: 'change-password.errors.unauthorized' };
    }

    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }),
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        return { success: false, message: 'session-expired' };
      }

      const contentType = response.headers.get('content-type');
      let errorKey = 'change-password.errors.failed';

      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorKey = errorData.messageKey || errorKey;
      }

      return { success: false, message: errorKey };
    }

    return { success: true, message: 'change password success' };
  } catch (error) {
    console.error('❌ Action Error:', error);
    return { success: false, message: 'change password failed' };
  }
}
