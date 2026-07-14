'use server';

import { cookies } from 'next/headers';
import { advanceRegistrationStep } from '../lib/registeration-progress';

export async function saveRegisterEmail(email: string) {
  const cookieStore = await cookies();

  cookieStore.set('register-email', email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });
}

export async function getRegisterEmail() {
  const cookieStore = await cookies();

  return cookieStore.get('register-email')?.value ?? '';
}

export async function clearRegisterEmail() {
  const cookieStore = await cookies();

  cookieStore.delete('register-email');
}
export async function goToCreatePassword(email: string) {
  await advanceRegistrationStep(email, 'create-password');
}
