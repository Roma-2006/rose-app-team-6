'use client';
import React, { useState } from 'react';
import CouponForm from './order-summary-form';
import { ICouponBackendResponse, IOrderSummaryPanelProps } from '../../types/order-summary';
import AppliedCouponsBox from './applied-coupons-box';
import TotalPrice from './total-price';
import { Button } from '@/shared/components/ui/button';
import { MoveRight, MoveLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function OrderSummaryPanel({
  subtotal,
  variant = 'editable',
  className,
}: IOrderSummaryPanelProps) {
  //Transelation
  const tButton = useTranslations('cart');

  // Variables
  const isEditable = variant === 'editable';

  // States

  const [storedValidCoupons, setstoredValidCoupons] = useState<ICouponBackendResponse[]>([]);

  // Functions
  const handleApplyValidCoupon = (coupon: ICouponBackendResponse) => {
    const isAlreadyApplied = storedValidCoupons.some((c) => c.id === coupon.id);
    if (isAlreadyApplied) return;

    setstoredValidCoupons((prev) => [...prev, coupon]);
  };

  const handleRemoveCoupon = (id: string) => {
    setstoredValidCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
  };

  return (
    <section className={`w-full max-w-114 max-h-114 gap-4 flex flex-col ${className}`}>
      <h5 className="sec-title text-text-plain text-3xl font-semibold">Summary</h5>

      {isEditable && (
        <CouponForm subtotal={subtotal} onValidCouponApplied={handleApplyValidCoupon} />
      )}

      <AppliedCouponsBox
        appliedCoupons={storedValidCoupons}
        onRemoveCoupon={handleRemoveCoupon}
        currency="EGP"
        variant={variant}
      />

      <TotalPrice
        subtotal={subtotal}
        appliedCoupons={storedValidCoupons}
        currency="EGP"
        isRecalculating={false}
      />

      <Link
        href="/checkout"
        className="inline-flex text-center justify-center items-center gap-2 px-6 py-3 bg-bg-primary-saturated hover:bg-rose-950 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
      >
        <span>{tButton('checkout')}</span>

        <MoveRight size={20} className="rtl:rotate-180 transition-transform" />
      </Link>
    </section>
  );
}
