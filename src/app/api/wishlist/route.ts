import { getWishlist } from '@/features/main/api/get-wishlist.api';
import { NextResponse } from 'next/server';

export async function GET() {
  const payload = await getWishlist();
  return NextResponse.json(payload);
}
