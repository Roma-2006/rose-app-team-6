import { ICouponBackendResponse, IValidationResult } from '../../types/order-summary';
import { getTranslations } from 'next-intl/server';

export default async function CheckIsCouponValid(
  coupon: ICouponBackendResponse,
  subtotal: number
): Promise<IValidationResult> {
  //Transelation
  const tSummary = await getTranslations('cart');

  if (!coupon.isActive) {
    return { isValid: false, message: tSummary('invalidCoupon') };
  }
  if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
    return { isValid: false, message: tSummary('invalidCoupon') };
  }
  //Variables
  const now = new Date();
  const validFromDate = new Date(coupon.validFrom);
  const validUntilDate = new Date(coupon.validUntil);

  if (now < validFromDate || now > validUntilDate) {
    return { isValid: false, message: tSummary('invalidCoupon') };
  }

  if (coupon.minPurchase !== null && subtotal < coupon.minPurchase) {
    return { isValid: false, message: tSummary('invalidCoupon') };
  }

  return { isValid: true, message: null };
}
