import 'server-only';
import { HEADERS } from '@/shared/constants/api.constants';
import { Response } from '@/shared/types/api';
import { LoginResponse, TLoginData } from '../types/auth';
import { API_ENDPOINTS } from '../constants/endpoints';

export const login = async (loginFields: TLoginData): Promise<Response<LoginResponse>> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://elevate-bootcamp.cloud';
  const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const endpoint = API_ENDPOINTS.login.startsWith('/')
    ? API_ENDPOINTS.login
    : `/${API_ENDPOINTS.login}`;
  const finalUrl = `${cleanUrl}${endpoint}`;

  const response = await fetch(`${finalUrl}`, {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.login}`, {
    method: 'POST',
    body: JSON.stringify(loginFields),
    headers: {
      ...HEADERS.jsonBody,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const payload: Response<LoginResponse> = await response.json();
  return payload;
};
