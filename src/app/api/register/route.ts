import { register } from '@/features/auth/apis/register.api';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  console.log('API ROUTE HIT');
  const fields = await req.json();
  const payload = await register(fields);
  return NextResponse.json(payload);
}
