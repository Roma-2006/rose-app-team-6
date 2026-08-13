'use server';

import { CouponBackendResponse } from '../types/order-summary';

interface RawCouponItem {
  id: string;
  code: string;
  type: 'PERCENT' | 'FIXED';
  value: string | number;
  minPurchase: string | number | null;
  maxDiscount: string | number | null;
  usageLimit: string | number | null;
  usedCount: string | number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function findValidCouponAction(code: string): Promise<CouponBackendResponse | null> {
  const MAX_COUPON_CODE_LENGTH = 200;
  if (!code || code.trim().length > MAX_COUPON_CODE_LENGTH) return null;

  try {
    const cleanCode = code.trim().toUpperCase();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/coupons?isActive=true&search=${encodeURIComponent(cleanCode)}`;

    const response = await fetch(apiUrl, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) return null;

    const rawData: unknown = await response.json();

    if (!rawData || typeof rawData !== 'object' || !('payload' in rawData)) return null;
    const payload = (rawData as { payload: { data?: unknown[] } }).payload;
    const coupons = payload?.data || [];

    // تم استبدال any بنوع صريح وآمن تماماً لتخطي خطأ الـ Lint
    const matchedCoupon = coupons.find(
      (item: unknown): item is RawCouponItem =>
        typeof item === 'object' && item !== null && 'code' in item && item.code === cleanCode
    );

    if (!matchedCoupon) return null;

    return {
      id: matchedCoupon.id,
      code: matchedCoupon.code,
      type: matchedCoupon.type,
      value: Number(matchedCoupon.value),
      minPurchase: matchedCoupon.minPurchase !== null ? Number(matchedCoupon.minPurchase) : null,
      maxDiscount: matchedCoupon.maxDiscount !== null ? Number(matchedCoupon.maxDiscount) : null,
      usageLimit: matchedCoupon.usageLimit !== null ? Number(matchedCoupon.usageLimit) : null,
      usedCount: Number(matchedCoupon.usedCount),
      validFrom: matchedCoupon.validFrom,
      validUntil: matchedCoupon.validUntil,
      isActive: matchedCoupon.isActive,
      createdAt: matchedCoupon.createdAt,
      updatedAt: matchedCoupon.updatedAt,
    };
  } catch {
    return null;
  }
}
