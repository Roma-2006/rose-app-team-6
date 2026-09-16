'use client';
import React, { useState } from 'react';
import CouponForm from './order-summary-form';
import { CouponBackendResponse, OrderSummaryPanelProps } from '../../types/order-summary';
import AppliedCouponsBox from './applied-coupons-box';
import TotalPrice from './total-price';
import { MoveRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function OrderSummaryPanel({
  subtotal,
  variant = 'editable',
  className = '',
  appliedCoupons = [],
  onApplyCoupon,
  onRemoveCoupon,
}: OrderSummaryPanelProps) {
  //Transelation
  const tCart = useTranslations('cart');

  // Variables
  const isEditable = variant === 'editable';

  // States
  const [couponError, setCouponError] = useState<string | null>(null);

  // Functions

  const handleApplyValidCoupon = (coupon: CouponBackendResponse) => {
    const isAlreadyApplied = appliedCoupons.some((c) => c.id === coupon.id);
    if (isAlreadyApplied) {
      setCouponError(tCart('couponAlreadyApplied'));
      return;
    }

    if (onApplyCoupon) {
      onApplyCoupon(coupon);
    }
    setCouponError(null);
  };

  return (
    <section className={`w-full max-w-114 max-h-114 gap-2.5 flex flex-col ${className}`}>
      <h5 className="sec-title text-text-plain text-3xl mb-7.5 font-semibold">
        {tCart('summary')}
      </h5>

      {isEditable && (
        <CouponForm
          subtotal={subtotal}
          onValidCouponApplied={handleApplyValidCoupon}
          onErrorTriggered={setCouponError}
        />
      )}

      <AppliedCouponsBox
        appliedCoupons={appliedCoupons}
        onRemoveCoupon={onRemoveCoupon || (() => {})}
        currency="EGP"
        variant={variant}
        errorMessage={couponError}
      />

      <TotalPrice
        subtotal={subtotal}
        appliedCoupons={appliedCoupons}
        currency="EGP"
        isRecalculating={false}
      />
      <Link
        href="/checkout"
        className="inline-flex text-center justify-center mb-8  items-center gap-2 px-6 py-3 bg-bg-primary-saturated hover:bg-rose-950 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
      >
        <span>{tCart('checkout')}</span>

        <MoveRight size={20} className="rtl:rotate-180 transition-transform" />
      </Link>
    </section>
  );
}
