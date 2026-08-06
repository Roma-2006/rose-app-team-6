import { ICouponBackendResponse } from '../../types/order-summary';

export default function CheckIsCouponValid(
  coupon: ICouponBackendResponse,
  currentSubtotal: number
): { isValid: boolean; reason: string } {
  // Variables (derived)
  const now = new Date();
  const validFromDate = new Date(coupon.validFrom);
  const validUntilDate = new Date(coupon.validUntil);

  if (!coupon.isActive) {
    return { isValid: false, reason: 'Coupon is disabled' };
  }

  if (now < validFromDate) {
    return { isValid: false, reason: 'Coupon is not active yet' };
  }

  if (now > validUntilDate) {
    return { isValid: false, reason: 'Coupon has expired' };
  }

  if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
    return { isValid: false, reason: 'Coupon usage limit has been reached' };
  }

  if (coupon.minPurchase !== null && currentSubtotal < coupon.minPurchase) {
    return { isValid: false, reason: `Min purchase required is ${coupon.minPurchase}` };
  }

  return { isValid: true, reason: 'Success' };
}
