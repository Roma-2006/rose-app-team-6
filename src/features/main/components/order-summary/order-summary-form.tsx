'use client';
import React, { useState } from 'react';
import { ICouponBackendResponse, ICouponFormProps } from '../../types/order-summary';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { TicketPercent } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { findValidCouponAction } from '../../actions/coupon.action';

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

    try {
      const coupon = await findValidCouponAction(cleanCoupon);

      if (!coupon) {
        onErrorTriggered(tForm('invalidCoupon'));
        return;
      }

      const now = new Date();
      if (now < new Date(coupon.validFrom) || now > new Date(coupon.validUntil)) {
        onErrorTriggered(tForm('invalidCoupon'));
        return;
      }

      if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
        onErrorTriggered(tForm('invalidCoupon'));
        return;
      }

      if (coupon.minPurchase !== null && subtotal < coupon.minPurchase) {
        onErrorTriggered(tForm('invalidCoupon'));
        return;
      }

      onValidCouponApplied(coupon);
      setCouponInput('');
      onErrorTriggered(null);
    } catch (error) {
      onErrorTriggered(tForm('invalidCoupon'));
    } finally {
      setIsButtonLoading(false);
    }
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
