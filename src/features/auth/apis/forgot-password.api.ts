'use server';

const API_BASE_URL = 'https://rose-app.elevate-bootcamp.cloud/api';

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error(`Forgot password request failed: ${response.status}`);
  }

  return response.json();
}
