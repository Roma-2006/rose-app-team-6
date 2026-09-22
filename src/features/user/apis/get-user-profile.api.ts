import { getAuthToken } from '@/features/main/lib/get-auth-token';

export default async function getUserProfile() {
  const token = await getAuthToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.message);
  }
  return payload.payload.user;
}
