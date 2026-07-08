'use server';
export interface ConfirmEmailVerificationRequest {
  email: string;
  code: string;
}

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
    throw new Error(result.message || 'OTP verification failed');
  }

  return result;
}
