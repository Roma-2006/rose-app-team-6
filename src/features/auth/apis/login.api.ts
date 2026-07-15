import 'server-only';
import { HEADERS } from '@/shared/constants/api.constants';
import { Response } from '@/shared/types/api';
import { LoginResponse, TLoginData } from '../types/auth';
import { API_ENDPOINTS } from '../constants/endpoints';

export const login = async (loginFields: TLoginData): Promise<Response<LoginResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.login}`, {
    method: 'POST',
    body: JSON.stringify(loginFields),
    headers: {
      ...HEADERS.jsonBody,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(error.message || 'An unexpected error occurred during login');
  }

  const payload: Response<LoginResponse> = await response.json();
  return payload;
};
