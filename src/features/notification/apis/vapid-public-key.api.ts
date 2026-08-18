import { Response } from '@/shared/types/api';
import { ENDPOINTS } from './../constants/endpoints';

export interface VapidPublicKeyPayload {
  publicKey: string;
}
export async function getVapidPublicKey(): Promise<VapidPublicKeyPayload> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ENDPOINTS.VAPID_PUBLIC_KEY}`);
  const data: Response<VapidPublicKeyPayload> = await res.json();

  if (!data.status) {
    throw new Error(data.message);
  }

  return data.payload as VapidPublicKeyPayload;
}
