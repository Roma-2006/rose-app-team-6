import 'server-only';
import { HEADERS } from '@/shared/constants/api.constants';
import { Response } from '@/shared/types/api';
import { LoginResponse, TLoginData } from '../types/auth';
import { API_ENDPOINTS } from '../constants/endpoints';

export const login = async (loginFields: TLoginData): Promise<Response<LoginResponse>> => {
  // Object Destructuring
  const { rememberMe, ...body } = loginFields;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ENDPOINTS.login}`, {
    method: 'POST',
    headers: {
      ...HEADERS.jsonBody,
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json();

  console.log('Response:', payload);

  if (!response.ok) {
    throw new Error(payload.message || 'Login failed');
  }

  return payload;
};
