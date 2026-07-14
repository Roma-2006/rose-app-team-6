'use server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function resetPassword(data: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Reset password request failed: ${response.status}`);
  }

  return response.json();
}
