import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.REGISTRATION_SECRET);

export type RegistrationStep = 'otp' | 'user-info' | 'create-password' | 'done';

export interface RegistrationPayload {
  email: string;
  step: RegistrationStep;
}

export async function signRegistrationToken(payload: RegistrationPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(secret);
}

export async function verifyRegistrationToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as RegistrationPayload;
  } catch {
    return null;
  }
}
