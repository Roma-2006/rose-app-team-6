import 'server-only';
import { HEADERS } from '@/shared/constants/api.constants';
import { Response } from '@/shared/types/api';
import { LoginResponse, TLoginData } from '../types/auth';
import { API_ENDPOINTS } from '../constants/endpoints';

// الفحص في جذر الملف يضمن إيقاف النظام فوراً عند التشغيل أو البناء بدلاً من الفشل الصامت
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
if (!baseUrl) {
  throw new Error(
    '❌ CRITICAL CONFIGURATION ERROR: "NEXT_PUBLIC_API_URL" environment variable is missing. Next.js build or runtime has been explicitly halted.'
  );
}

export const login = async (loginFields: TLoginData): Promise<Response<LoginResponse>> => {
  // 1. تنظيف نهاية الـ baseUrl من أي سلاش زائدة (ينتج عنها: https://elevate-bootcamp.cloud)
  const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  // 2. التأكد من وجود سلاش في بداية الـ endpoint (ينتج عنها: /auth/login)
  const endpoint = API_ENDPOINTS.login.startsWith('/')
    ? API_ENDPOINTS.login
    : `/${API_ENDPOINTS.login}`;

  // 3. دمج الرابط النهائي بشكل سليم تماماً ليصبح:
  // https://elevate-bootcamp.cloud/auth/login
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
