'use server';

export async function forgotPassword(email: string) {
  const response = await fetch(`${process.env.API_BASE_URLL}/auth/forgot-password`, {
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
