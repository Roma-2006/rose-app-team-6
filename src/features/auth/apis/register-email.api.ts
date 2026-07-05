'use server';

const API_BASE_URL = 'https://rose-app.elevate-bootcamp.cloud/api';

export async function registerEmail(email: string) {
  const response = await fetch(`${API_BASE_URL}/auth/send-email-verification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  console.log(response);
  if (!response.ok) {
    throw new Error(`Forgot password request failed: ${response.status}`);
  }

  return response.json();
}
