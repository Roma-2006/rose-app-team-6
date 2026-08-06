import React, { useState } from 'react';
import { ICouponBackendResponse, ICouponFormProps } from '../../types/order-summary';
import CheckIsCouponValid from './check-coupon-valid ';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';

const LOCAL_COUPONS_DATABASE: ICouponBackendResponse[] = [
  {
    id: 'uuid-1',
    code: 'DISCOUNT50',
    type: 'PERCENT',
    value: 50,
    minPurchase: 100,
    maxDiscount: 200,
    usageLimit: 10,
    usedCount: 2,
    validFrom: '2026-01-01T00:00:00.000Z',
    validUntil: '2027-12-31T23:59:59.000Z',
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

export default function CouponForm({ subtotal, onValidCouponApplied }: ICouponFormProps) {
  //States
  const [couponInput, setCouponInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const cleanCoupon = couponInput.trim().toUpperCase();

    if (!cleanCoupon) {
      setErrorMessage('كوبون غير صالح أو منتهي الصلاحية / Invalid or expired coupon');
      return;
    }

    setIsButtonLoading(true);

    const matchedCoupon = LOCAL_COUPONS_DATABASE.find((c) => c.code === cleanCoupon);

    if (!matchedCoupon) {
      setErrorMessage('كوبون غير صالح أو منتهي الصلاحية / Invalid or expired coupon');
      setIsButtonLoading(false);
      return;
    }

    const validation = CheckIsCouponValid(matchedCoupon, subtotal);

    if (validation.isValid) {
      onValidCouponApplied(matchedCoupon);
      setCouponInput('');
    } else {
      setErrorMessage('كوبون غير صالح أو منتهي الصلاحية / Invalid or expired coupon');
    }

    setIsButtonLoading(false);
  };

  return (
    <form onSubmit={handleApply} className="flex gap-2 max-w-114.5">
      <CustomInput
        className="w-2/3"
        variant="default"
        value={couponInput}
        onChange={(e) => {
          setCouponInput(e.target.value);
          if (errorMessage) setErrorMessage(null);
        }}
        disabled={isButtonLoading}
      />
      <Button
        type="submit"
        buttonVariant="text"
        variant="primary"
        disabled={isButtonLoading}
        title="Apply"
        loading={isButtonLoading}
        className=" w-1/3"
      ></Button>
    </form>
  );
}
