'use client';
import React, { useState } from 'react';
import { CouponFormProps } from '../../types/order-summary';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { TicketPercent } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { findValidCouponAction } from '../../actions/coupon.action';

//Enter coupon
export default function CouponForm({
  subtotal,
  onValidCouponApplied,
  onErrorTriggered,
}: CouponFormProps) {
  //Transelation
  const tForm = useTranslations('cart');

  // States
  const [couponInput, setCouponInput] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // Functions (handlers)

  const handleApplyCoupon = async (event: React.FormEvent) => {
    event.preventDefault();
    onErrorTriggered(null);

    const cleanCouponCode = couponInput.trim().toUpperCase();
    if (!cleanCouponCode) {
      onErrorTriggered(tForm('invalidCoupon'));
      return;
    }

    setIsButtonLoading(true);

    try {
      const coupon = await findValidCouponAction(cleanCouponCode);
      console.log('=== API COUPON DATA ===', {
        code: coupon?.code,
        validUntil: coupon?.validUntil,
        minPurchase: coupon?.minPurchase,
        subtotalPassed: subtotal,
      });
      if (!coupon) {
        onErrorTriggered(tForm('invalidCoupon'));
        return;
      }

      // Check Activation
      if (!coupon.isActive) {
        onErrorTriggered(tForm('couponDisabled'));
        return;
      }

      // Check Expiration
      const currentDate = new Date();
      if (currentDate > new Date(coupon.validUntil)) {
        onErrorTriggered(tForm('couponExpired'));
        return;
      }

      // Check Not Started Yet
      const isBeforeStart = currentDate < new Date(coupon.validFrom);
      if (isBeforeStart) {
        onErrorTriggered(tForm('invalidCoupon'));
        return;
      }

      // Usage Volume Cap Check
      const isUsageLimitExceeded =
        coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit;
      if (isUsageLimitExceeded) {
        onErrorTriggered(tForm('invalidCoupon'));
        return;
      }

      //Order Value Check
      const isMinimumPurchaseNotMet = coupon.minPurchase !== null && subtotal < coupon.minPurchase;
      if (isMinimumPurchaseNotMet) {
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
    <form onSubmit={handleApplyCoupon} className="flex gap-2.5 w-106.5 w-full justify-between">
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
        title="cart.applyCoupon"
        leftIcon={<TicketPercent size={20} />}
        loading={isButtonLoading}
        className="w-27 text-xs   py-3.5"
        aria-label={tForm('applyCoupon')}
      />
    </form>
  );
}
