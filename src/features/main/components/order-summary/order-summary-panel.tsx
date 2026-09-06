'use client';
import React, { useState } from 'react';
import CouponForm from './order-summary-form';
import { ICouponBackendResponse, IOrderSummaryPanelProps } from '../../types/order-summary';
import AppliedCouponsBox from './applied-coupons-box';
import TotalPrice from './total-price';

export default function OrderSummaryPanel({
  subtotal,
  variant = 'editable',
  className,
  appliedCoupons: controlledCoupons,
  onApplyCoupon,
  onRemoveCoupon: onRemoveCouponProp,
}: IOrderSummaryPanelProps) {
  const isEditable = variant === 'editable';
  const isControlled = controlledCoupons !== undefined;

  const [internalCoupons, setInternalCoupons] = useState<ICouponBackendResponse[]>([]);

  const appliedCoupons = isControlled ? controlledCoupons : internalCoupons;

  const handleApplyValidCoupon = (coupon: ICouponBackendResponse) => {
    if (isControlled) {
      onApplyCoupon?.(coupon);
      return;
    }
    const isAlreadyApplied = internalCoupons.some((c) => c.id === coupon.id);
    if (isAlreadyApplied) return;
    setInternalCoupons((prev) => [...prev, coupon]);
  };

  const handleRemoveCoupon = (id: string) => {
    if (isControlled) {
      onRemoveCouponProp?.(id);
      return;
    }
    setInternalCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section className={`w-full max-w-95 max-h-111 gap-4 flex flex-col ${className}`}>
      <h5 className="sec-title text-black text-3xl font-semibold">Summary</h5>

      {isEditable && (
        <CouponForm subtotal={subtotal} onValidCouponApplied={handleApplyValidCoupon} />
      )}

      <AppliedCouponsBox
        appliedCoupons={appliedCoupons}
        onRemoveCoupon={handleRemoveCoupon}
        currency="EGP"
        variant={variant}
      />

      <TotalPrice
        subtotal={subtotal}
        appliedCoupons={appliedCoupons}
        currency="EGP"
        isRecalculating={false}
      />
    </section>
  );
}
