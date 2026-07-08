'use server';

import { ConfirmEmailVerificationRequest } from '../types/confirm-email-verification';

export async function confirmEmailVerification(data: ConfirmEmailVerificationRequest) {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/confirm-email-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'OTP verification failed');
  }

  return result;
}
