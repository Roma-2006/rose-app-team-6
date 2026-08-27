'use server';
//UpdateProfile
import { getAuthToken } from '@/features/main/lib/get-auth-token';
import { ProfileFields } from '../types/profile';
export async function updateProfileAction({ fields }: { fields: ProfileFields }) {
  const token = await getAuthToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
    method: 'PATCH',
    body: JSON.stringify(fields),
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const payload = await response.json();
  if (!payload.status) {
    return { status: payload.status, message: payload.message, errors: payload.errors };
  }
  return payload;
}
//Delete
export async function deleteProfileAction() {
  const token = await getAuthToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/account`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const payload = await response.json();
  console.log(payload, 'delete');
  if (!payload.status) {
    return { status: payload.status, message: payload.message, errors: payload.errors };
  }
  return payload;
}
