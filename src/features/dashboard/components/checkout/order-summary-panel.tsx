'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CouponForm from './order-summary-form';
import { ICouponBackendResponse } from '../../types/order-summary';

export default function OrderSummaryPanel() {
  //State
  const [subtotal, setSubtotal] = useState<number>(250);
  const [appliedCoupons, setAppliedCoupons] = useState<ICouponBackendResponse[]>([]);
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);

  // 3. دالة استقبال الكوبون الناجح من مكون النموذج (Task 1 Success)
  const handleValidCouponApplied = (coupon: ICouponBackendResponse) => {
    // منع تكرار نفس الكوبون
    if (appliedCoupons.some((c) => c.id === coupon.id)) return;

    setIsRecalculating(true);

    setAppliedCoupons([...appliedCoupons, coupon]);
    setIsRecalculating(false);
  };
  return (
    <section className="w-full max-w-114.5 max-h-151 gap-6 flex flex-col">
      <h5 className="sec-title text-black text-3xl font-semibold">Summary</h5>

      <CouponForm subtotal={subtotal} onValidCouponApplied={handleValidCouponApplied} />
    </section>
  );
}
