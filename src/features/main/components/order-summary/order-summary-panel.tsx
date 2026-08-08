'use client';
import React, { useState } from 'react';
import CouponForm from './order-summary-form';
import { ICouponBackendResponse, IOrderSummaryPanelProps } from '../../types/order-summary';
import AppliedCouponsBox from './applied-coupons-box';
import TotalPrice from './total-price';
import { Button } from '@/shared/components/ui/button';
import { MoveRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function OrderSummaryPanel({
  subtotal,
  variant = 'editable',
  className,
}: IOrderSummaryPanelProps) {
  //Transelation
  const tButton = useTranslations('button');

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
    <section className={`w-full max-w-95 max-h-111 gap-4 flex flex-col ${className}`}>
      <h5 className="sec-title text-black text-3xl font-semibold">Summary</h5>

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

      <Button
        type="submit"
        buttonVariant="text"
        variant="primary"
        title={tButton('checkout')}
        rightIcon={<MoveRight size={20} />}
        className="w-full  mt-6 py-3"
      >
        <Link href="/checkout"></Link>
      </Button>
    </section>
  );
}
