import { Response } from '@/shared/types/api';
import { ENDPOINTS } from './../constants/endpoints';

export async function getVapidPublicKey(): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${ENDPOINTS.VAPID_PUBLIC_KEY}`);
  const data: Response<string> = await res.json();

  if (!data.status) {
    throw new Error(data.message);
  }

  return data.payload as string;
}
