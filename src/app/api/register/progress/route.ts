import { register } from '@/features/auth/apis/register.api';
import { signRegistrationToken, RegistrationStep } from '@/features/auth/lib/registeration-token';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_STEP: Record<string, RegistrationStep> = {
  email: 'otp',
  otp: 'user-info',
  'user-info': 'create-password',
  'create-password': 'done',
};

export async function POST(req: NextRequest) {
  try {
    const fields = await req.json();

    // existing logic — unchanged
    const payload = await register(fields);

    // new: figure out which step just completed and advance the cookie
    const completedStep = fields.completedStep ?? 'email';
    const nextStep = NEXT_STEP[completedStep];

    if (!nextStep) {
      return NextResponse.json({ error: `Invalid step: ${completedStep}` }, { status: 400 });
    }

    const res = NextResponse.json(payload);

    if (nextStep === 'done') {
      res.cookies.delete('reg_progress');
    } else {
      const token = await signRegistrationToken({
        email: fields.email,
        step: nextStep,
      });

      res.cookies.set('reg_progress', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
      });
    }

    return res;
  } catch (error) {
    console.error('[register/progress] failed:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Registration step failed' }, { status: 500 });
  }
}
