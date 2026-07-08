'use server';

const API_BASE_URL = 'https://rose-app.elevate-bootcamp.cloud/api';
export interface sendEmailVerificationRequest {
  email: string;
}

export async function sendEmailVerification(data: sendEmailVerificationRequest) {
  const res = await fetch(`${API_BASE_URL}/auth/send-email-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Email verification failed');
  }

  return result;
}
