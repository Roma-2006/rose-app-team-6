import React from 'react';
import { ITotalPriceProps } from '../../types/order-summary';
import { useTranslations } from 'next-intl';

export default function TotalPrice({
  subtotal,
  appliedCoupons,
  currency = 'EGP',
  isRecalculating,
}: ITotalPriceProps) {
  //Transelation
  const tSummary = useTranslations('cart');

  // Variables (derived)
  const totalDiscountAmount = appliedCoupons.reduce((sum, coupon) => {
    if (coupon.type === 'PERCENT') {
      let calculatedDiscount = (subtotal * coupon.value) / 100;
      if (coupon.maxDiscount !== null && calculatedDiscount > coupon.maxDiscount) {
        calculatedDiscount = coupon.maxDiscount;
      }
      return sum + calculatedDiscount;
    } else {
      return sum + coupon.value;
    }
  }, 0);

  const finalDiscount = Math.min(totalDiscountAmount, subtotal);
  const total = Math.max(0, subtotal - finalDiscount);

  return (
    <div className="w-full space-y-4 mb-2.5   font-sans">
      <div className="flex justify-between text-lg font-medium text-text-plain">
        <span>{tSummary('subtotal')}</span>
        <span className="font-semibold text-black">
          {subtotal.toFixed(0)} {currency}
        </span>
      </div>

      {isRecalculating ? (
        <div className="space-y-3 animate-pulse py-1">
          <div className="h-4  bg-bg-muted rounded w-full"></div>
          <div className="h-5 bg-bg-muted rounded w-2/3 ml-auto"></div>
        </div>
      ) : (
        <>
          {finalDiscount > 0 && (
            <div className="relative flex py-1 items-center animate-fadeIn">
              <div className="flex-grow border-t border-dashed border-[#E4E7EC]"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-[#A61C24] bg-white px-2.5 py-0.5 rounded-full border border-red-100">
                - {finalDiscount.toFixed(0)} {currency} Discount
              </span>
              <div className="flex-grow border-t border-dashed border-border-soft"></div>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-2 border-t border-border-soft">
            <span className="text-1xl font-bold text-text-primary">{tSummary('total')}</span>
            <span className="text-1xl font-bold text-text-primary tracking-tight">
              {total.toFixed(0)} {currency}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
