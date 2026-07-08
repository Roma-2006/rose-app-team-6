'use server';
export async function registerEmail(email: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email-verification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const payload = await response.json();
  console.log(payload);
  if (!response.ok) {
    throw new Error(`Forgot password request failed: ${response.status}`);
  }

  return payload;
}
