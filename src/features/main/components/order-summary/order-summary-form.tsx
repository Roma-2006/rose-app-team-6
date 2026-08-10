'use client';
import React, { useState } from 'react';
import { ICouponBackendResponse, ICouponFormProps } from '../../types/order-summary';
import CheckIsCouponValid from './check-coupon-valid ';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { TicketPercent } from 'lucide-react';
import { useTranslations } from 'next-intl';

const LOCAL_COUPONS_DATABASE: ICouponBackendResponse[] = [
  {
    id: 'uuid-1',
    code: 'DISCOUNT20',
    type: 'PERCENT',
    value: 20,
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
  {
    id: 'uuid-2',
    code: 'DISCOUNT30',
    type: 'PERCENT',
    value: 30,
    minPurchase: 200,
    maxDiscount: 300,
    usageLimit: 10,
    usedCount: 2,
    validFrom: '2026-01-01T00:00:00.000Z',
    validUntil: '2027-12-31T23:59:59.000Z',
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'uuid-3',
    code: 'DISCOUNT50',
    type: 'PERCENT',
    value: 50,
    minPurchase: 500,
    maxDiscount: 1000,
    usageLimit: 10,
    usedCount: 2,
    validFrom: '2026-01-01T00:00:00.000Z',
    validUntil: '2027-12-31T23:59:59.000Z',
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

export default function CouponForm({
  subtotal,
  onValidCouponApplied,
  onErrorTriggered,
}: ICouponFormProps) {
  //Transelation
  const tForm = useTranslations('cart');

  // States
  const [couponInput, setCouponInput] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // Functions
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    onErrorTriggered(null);
    const cleanCoupon = couponInput.trim().toUpperCase();

    if (!cleanCoupon) {
      onErrorTriggered(tForm('invalidCoupon'));
      return;
    }

    setIsButtonLoading(true);

    const matchedCoupon = LOCAL_COUPONS_DATABASE.find((c) => c.code === cleanCoupon);

    if (!matchedCoupon) {
      onErrorTriggered(tForm('invalidCoupon'));
      setIsButtonLoading(false);
      return;
    }

    const validation = await CheckIsCouponValid(matchedCoupon, subtotal);

    if (validation.isValid) {
      onValidCouponApplied(matchedCoupon);
      setCouponInput('');
      onErrorTriggered(null);
    } else {
      onErrorTriggered(tForm('invalidCoupon'));
    }

    setIsButtonLoading(false);
  };

  return (
    <form onSubmit={handleApply} className="flex gap-2.5 w-106.5 w-full justify-between">
      <CustomInput
        className=" w-77 h-9 mt-0.5"
        variant="default"
        value={couponInput}
        placeholder={tForm('couponPlaceholder')}
        label={tForm('couponLabel')}
        onChange={(e) => {
          setCouponInput(e.target.value);
          onErrorTriggered(null);
        }}
        disabled={isButtonLoading}
      />
      <Button
        type="submit"
        buttonVariant="text"
        variant="primary"
        disabled={isButtonLoading}
        title={tForm('applyCoupon')}
        leftIcon={<TicketPercent size={20} />}
        loading={isButtonLoading}
        className="w-27 text-xs mt-0.0.5  py-5.75"
      ></Button>
    </form>
  );
}
