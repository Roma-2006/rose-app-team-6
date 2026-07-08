'use server';

export async function sendEmailVerification(data: EmailProps) {
  const res = await fetch(`${process.env.API_BASE_URL}/auth/send-email-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log(result);
  if (!res.ok) {
    throw new Error(result.message || 'Email verification failed');
  }

  return result;
}
