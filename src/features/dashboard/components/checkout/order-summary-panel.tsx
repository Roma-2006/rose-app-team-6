'use client';
import React from 'react';
import CouponForm from './order-summary-form';
import { ICouponBackendResponse } from '../../types/order-summary';
import AppliedCouponsBox from './applied-coupons-box';
import TotalPrice from './total-price';

interface IOrderSummaryPanelProps {
  subtotal: number;
  appliedCoupons: ICouponBackendResponse[];
  onValidCouponApplied: (coupon: ICouponBackendResponse) => void;
  onRemoveCoupon: (id: string) => void;
  isRecalculating?: boolean;
  variant?: 'editable' | 'read-only';
}

export default function OrderSummaryPanel({
  subtotal,
  appliedCoupons,
  onValidCouponApplied,
  onRemoveCoupon,
  isRecalculating = false,
  variant = 'editable',
}: IOrderSummaryPanelProps) {
  const isEditable = variant === 'editable';

  return (
    <section className="w-full max-w-[458px] max-h-[604px] gap-6 flex flex-col p-6 bg-white border border-[#F2F4F7] rounded-xl shadow-sm font-sans">
      <h5 className="sec-title text-black text-3xl font-semibold">Summary</h5>

      {isEditable && <CouponForm subtotal={subtotal} onValidCouponApplied={onValidCouponApplied} />}

      <AppliedCouponsBox
        appliedCoupons={appliedCoupons}
        onRemoveCoupon={onRemoveCoupon}
        currency="EGP"
        variant={variant}
      />

      <TotalPrice
        subtotal={subtotal}
        appliedCoupons={appliedCoupons}
        currency="EGP"
        isRecalculating={isRecalculating}
      />
    </section>
  );
}
