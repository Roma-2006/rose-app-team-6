export interface ICouponBackendResponse {
  id: string;
  code: string;
  type: 'PERCENT' | 'FIXED';
  value: number;
  minPurchase: number | null;
  maxDiscount: number | null;
  usageLimit: number | null;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
interface ICouponFormData {
  couponCode: string;
}
interface ICouponFormProps {
  subtotal: number;
  onValidCouponApplied: (coupon: ICouponBackendResponse) => void;
}
interface IApplyValidCouponProps {
  IValidCoupon: (code: string, id: string, discount: number) => void;
}

import { ICouponBackendResponse } from './order-summary';

export interface IAppliedCouponsBoxProps {
  appliedCoupons: ICouponBackendResponse[];
  onRemoveCoupon: (id: string) => void;
  currency?: string;
}

export interface ITotalPriceProps {
  subtotal: number;
  appliedCoupons: ICouponBackendResponse[];
  currency?: string;
  isRecalculating: boolean;
}
export interface IOrderSummaryPanelProps {
  subtotal: number;
  variant?: 'editable' | 'read-only';

}


