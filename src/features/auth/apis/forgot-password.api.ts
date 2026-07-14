'use server';

export async function forgotPassword(email: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error(`Forgot password request failed: ${response.status}`);
  }

  return response.json();
}
