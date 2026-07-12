export async function resetPassword(data: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const finalUrl = `${API_BASE_URL}/auth/reset-password`;

  const response = await fetch(finalUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
