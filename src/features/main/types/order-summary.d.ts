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

export interface ICouponFormData {
  couponCode: string;
}

export interface ICouponFormProps {
  subtotal: number;
  onValidCouponApplied: (coupon: ICouponBackendResponse) => void;
  onErrorTriggered: (msg: string | null) => void;
}

export interface IApplyValidCouponProps {
  IValidCoupon: (code: string, id: string, discount: number) => void;
}

export interface IAppliedCouponsBoxProps {
  appliedCoupons: ICouponBackendResponse[];
  onRemoveCoupon: (id: string) => void;
  currency?: string;
  variant?: 'editable' | 'read-only';
  errorMessage?: string | null;
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
  className?: string;
  appliedCoupons?: ICouponBackendResponse[];
  onApplyCoupon?: (coupon: ICouponBackendResponse) => void;
  onRemoveCoupon?: (id: string) => void;
}
interface IValidationResult {
  isValid: boolean;
  message: string | null;
}
