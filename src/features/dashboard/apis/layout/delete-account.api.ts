import { HEADERS } from '@/shared/constants/api.constants';

export async function deleteAccount(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/account`, {
    method: 'DELETE',
    headers: {
      ...HEADERS.jsonBody,
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await response.json();

  console.log('response : ', res);

  if (!response.ok) {
    throw new Error('Failed to remove account');
  }

  return res;
}
