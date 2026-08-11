'use server';

import { ICouponBackendResponse } from '../types/order-summary';

export async function findValidCouponAction(code: string): Promise<ICouponBackendResponse | null> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/coupons?isActive=true&search=${encodeURIComponent(code.trim())}`,
      {
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    const coupons: ICouponBackendResponse[] = data?.payload?.data || [];

    const matched = coupons.find((coupon) => coupon.code === code.toUpperCase());
    if (!matched) return null;

    return {
      ...matched,
      value: Number(matched.value),
      minPurchase: matched.minPurchase !== null ? Number(matched.minPurchase) : null,
      maxDiscount: matched.maxDiscount !== null ? Number(matched.maxDiscount) : null,
      usageLimit: matched.usageLimit !== null ? Number(matched.usageLimit) : null,
      usedCount: Number(matched.usedCount),
    };
  } catch (error) {
    return null;
  }
}
