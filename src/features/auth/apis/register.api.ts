import { cookies } from 'next/headers';
import { TRegisterFields, TRegisterResponse } from '../types/register';
import { Response } from '@/shared/types/api';
import { advanceRegistrationStep } from '@/features/auth/lib/registeration-progress';

export const register = async (fields: TRegisterFields) => {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const payload: Response<TRegisterResponse> = await response.json();
  console.log(payload);
  if (payload.status && payload.payload?.token) {
    const cookiesStore = await cookies();
    cookiesStore.set('token', payload.payload.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    await advanceRegistrationStep(fields.email, 'otp');

    return { status: payload.status, user: payload.payload.user };
  }
  if (!payload.status) {
    return { status: payload.status, message: payload.message, errors: payload.errors };
  }
};
