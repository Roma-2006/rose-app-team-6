import 'server-only';
import { HEADERS } from '@/shared/constants/api.constants';
import { Response } from '@/shared/types/api';
import { LoginResponse, TLoginData } from '../types/auth';
import { API_ENDPOINTS } from '../constants/endpoints';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
if (!baseUrl) {
  throw new Error(
    '❌ CRITICAL CONFIGURATION ERROR: "NEXT_PUBLIC_API_URL" environment variable is missing. Next.js build or runtime has been explicitly halted.'
  );
}

type TLoginPayload = Omit<TLoginData, 'rememberMe'>;

export const login = async (loginFields: TLoginPayload): Promise<Response<LoginResponse>> => {
  const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  const endpoint = API_ENDPOINTS.login.startsWith('/')
    ? API_ENDPOINTS.login
    : `/${API_ENDPOINTS.login}`;

  const finalUrl = `${cleanUrl}${endpoint}`;

  const response = await fetch(finalUrl, {
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
