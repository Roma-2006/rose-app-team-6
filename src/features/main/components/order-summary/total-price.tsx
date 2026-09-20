import React from 'react';
import { TotalPriceProps } from '../../types/order-summary';
import { useTranslations } from 'next-intl';

//Calculate and show totalPrice
export default function TotalPrice({
  subtotal,
  appliedCoupons = [],
  currency = 'EGP',
  isRecalculating,
}: TotalPriceProps) {
  // Translation
  const tSummary = useTranslations('cart');

  // Variables (derived)
  let workingSubtotal = subtotal;
  let accumulatedDiscount = 0;

  appliedCoupons.forEach((coupon) => {
    let calculatedDiscount = 0;

    if (coupon.type === 'PERCENT') {
      calculatedDiscount = (workingSubtotal * coupon.value) / 100;
      if (coupon.maxDiscount !== null && calculatedDiscount > coupon.maxDiscount) {
        calculatedDiscount = coupon.maxDiscount;
      }
    } else {
      calculatedDiscount = coupon.value;
    }

    accumulatedDiscount += calculatedDiscount;
    workingSubtotal = Math.max(0, workingSubtotal - calculatedDiscount);
  });

  const finalDiscount = Math.min(accumulatedDiscount, subtotal);
  const totalAmount = Math.max(0, subtotal - finalDiscount);
  const hasDiscount = finalDiscount > 0;

  return (
    <div className="w-full space-y-4 mb-2.5 font-sans">
      <div className="flex justify-between text-base font-medium text-text-plain">
        <span>{tSummary('subtotal')}</span>
        <span className="font-semibold text-text-plain tracking-tight">
          {subtotal.toLocaleString()} {currency}
        </span>
      </div>

      {isRecalculating ? (
        <div className="space-y-3 animate-pulse py-1">
          <div className="h-4 bg-bg-muted rounded w-full"></div>
          <div className="h-5 bg-bg-muted rounded w-2/3 text-end"></div>
        </div>
      ) : (
        <>
          {hasDiscount && (
            <div className="relative flex py-1 items-center animate-fadeIn">
              <div className="flex-grow border-t border-dashed border-border-soft"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-text-danger bg-bg-primary px-2.5 py-0.5 rounded-full border border-border-soft">
                - {finalDiscount.toLocaleString()} {currency} {tSummary('discountApplied')}
              </span>
              <div className="flex-grow border-t border-dashed border-border-soft"></div>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-3 border-t border-border-soft">
            <span className="text-xl font-bold text-text-primary">{tSummary('total')}</span>
            <span className="text-xl font-bold text-text-primary tracking-tight">
              {totalAmount.toLocaleString()} {currency}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
