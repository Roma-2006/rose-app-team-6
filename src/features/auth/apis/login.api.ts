import 'server-only';
import { HEADERS } from '@/shared/constants/api.constants';
import { Response } from '@/shared/types/api';
import { getApiBaseUrl } from '@/shared/lib/api-url';
import { LoginResponse, TLoginData } from '../types/auth';
import { API_ENDPOINTS } from '../constants/endpoints';
import { BackendErrorResponse } from '../types/login';

export const login = async (loginFields: TLoginData): Promise<Response<LoginResponse>> => {
  const baseUrl = getApiBaseUrl();
  const identifier = loginFields.username.trim();
  const password = loginFields.password;
  const rememberMe = loginFields.rememberMe;

  const candidatePayloads = [
    { username: identifier, password, rememberMe },
    ...(identifier.includes('@') ? [] : [{ email: identifier, password, rememberMe }]),
  ];

  let lastPayload: BackendErrorResponse | null = null;

  for (const body of candidatePayloads) {
    const response = await fetch(`${baseUrl}${API_ENDPOINTS.login}`, {
      method: 'POST',
      headers: {
        ...HEADERS.jsonBody,
      },
      body: JSON.stringify(body),
    });

    const payload = await response.json().catch(() => null);
    lastPayload = payload;

    if (response.ok) {
      return payload;
    }

    if (response.status !== 401 && response.status !== 400) {
      throw new Error(payload?.message || 'Login failed');
    }
  }

  throw new Error(lastPayload?.message || 'Login failed');
};
