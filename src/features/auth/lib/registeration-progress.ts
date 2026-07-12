'use server';

import { cookies } from 'next/headers';
import { signRegistrationToken, RegistrationStep } from './registeration-token';

const COOKIE_NAME = 'reg_progress';
const MAX_AGE = 60 * 15;

export async function advanceRegistrationStep(email: string, nextStep: RegistrationStep) {
  const cookieStore = await cookies();

  if (nextStep === 'done') {
    cookieStore.delete(COOKIE_NAME);
    return;
  }

  const token = await signRegistrationToken({ email, step: nextStep });

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}
