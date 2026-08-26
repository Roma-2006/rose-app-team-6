export interface CouponBackendResponse {
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

export interface CouponFormData {
  couponCode: string;
}

export interface CouponFormProps {
  subtotal: number;
  onValidCouponApplied: (coupon: ICouponBackendResponse) => void;
  onErrorTriggered: (msg: string | null) => void;
}

export interface ApplyValidCouponProps {
  IValidCoupon: (code: string, id: string, discount: number) => void;
}

export interface AppliedCouponsBoxProps {
  appliedCoupons: ICouponBackendResponse[];
  onRemoveCoupon: (id: string) => void;
  currency?: string;
  variant?: 'editable' | 'read-only';
  errorMessage?: string | null;
}

export interface TotalPriceProps {
  subtotal: number;
  appliedCoupons: CouponBackendResponse[];
  currency?: string;
  isRecalculating: boolean;
}

export interface OrderSummaryPanelProps {
  subtotal: number;
  variant?: 'editable' | 'read-only';
  className?: string;
  appliedCoupons?: CouponBackendResponse[];
  onApplyCoupon?: (coupon: ICouponBackendResponse) => void;
  onRemoveCoupon?: (id: string) => void;
}
interface ValidationResult {
  isValid: boolean;
  message: string | null;
}
