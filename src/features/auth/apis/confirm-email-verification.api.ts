'use server';

import { ConfirmEmailVerificationRequest } from '../types/register';

export async function confirmEmailVerification(data: ConfirmEmailVerificationRequest) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.message || 'OTP verification failed') as Error & {
      status?: number;
    };

    error.status = response.status;

    throw error;
  }

  return result;
}
