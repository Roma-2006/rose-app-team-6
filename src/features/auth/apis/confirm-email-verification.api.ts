'use server';

import { advanceRegistrationStep } from '../lib/registeration-progress';
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
    const error = new Error(result.message || 'OTP verification failed') as Error & {
      status?: number;
    };

    error.status = response.status;

    throw error;
  }

  await advanceRegistrationStep(data.email, 'user-info');

  return result;
}
