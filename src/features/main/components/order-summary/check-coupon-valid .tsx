import { ICouponBackendResponse, IValidationResult } from '../../types/order-summary';

export default function CheckIsCouponValid(
  coupon: ICouponBackendResponse,
  subtotal: number
): IValidationResult {
  if (!coupon.isActive) {
    return { isValid: false, message: 'Invalid or expired coupon' };
  }
  if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
    return { isValid: false, message: ' Invalid or expired coupon' };
  }
  //Variables
  const now = new Date();
  const validFromDate = new Date(coupon.validFrom);
  const validUntilDate = new Date(coupon.validUntil);

  if (now < validFromDate || now > validUntilDate) {
    return { isValid: false, message: 'Invalid or expired coupon' };
  }

  if (coupon.minPurchase !== null && subtotal < coupon.minPurchase) {
    return { isValid: false, message: ' Invalid or expired coupon' };
  }

  return { isValid: true, message: null };
}
