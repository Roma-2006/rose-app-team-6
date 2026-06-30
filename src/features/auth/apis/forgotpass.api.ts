'use server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; // تأكد من وجوده في .env

export async function forgotPasswordAction(email: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return response.json();
}

export async function resetPasswordAction(data: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}
