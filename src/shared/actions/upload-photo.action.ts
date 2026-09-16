'use server';
import { getAuthToken } from '@/features/main/lib/get-auth-token';
import axios from 'axios';
import { Response } from '@/shared/types/api';
import { UploadPhotoResponse } from '../types/product-price';
export default async function uploadPhotoAction(formData: FormData) {
  const token = await getAuthToken();
  try {
    const response = await axios.post<Response<UploadPhotoResponse>>(
      `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }

    throw error;
  }
}
