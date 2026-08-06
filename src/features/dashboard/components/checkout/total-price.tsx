import React from 'react';
import { ITotalPriceProps } from '../../types/order-summary';

export default function TotalPrice({
  subtotal,
  appliedCoupons,
  currency = 'EGP',
  isRecalculating,
}:ITotalPriceProps) {
  
   // Variables (derived)  
  const totalDiscountAmount = appliedCoupons.reduce((sum, coupon) => {
    if (coupon.type === 'PERCENT') {
      let calculatedDiscount = (subtotal * coupon.value) / 100;
      if (coupon.maxDiscount !== null && calculatedDiscount > coupon.maxDiscount) {
        calculatedDiscount = coupon.maxDiscount;
      }
      return sum + calculatedDiscount;
    } else {
      return sum + coupon.value; // للخصم المالي الثابت FIXED
    }
  }, 0);

  const total = Math.max(0, subtotal - totalDiscountAmount);

  return (
    <div className="w-full space-y-4 pt-4 border-t border-[#F2F4F7] font-sans">
      
      {/* صف المجموع الفرعي (Subtotal) */}
      <div className="flex justify-between text-sm font-medium text-[#475467]">
        <span>Subtotal</span>
        <span className="font-semibold text-[#101828]">
          {subtotal.toFixed(0)} {currency}
        </span>
      </div>

      {isRecalculating ? (
        /* تأثير الهيكل العظمي النبضي Skeleton UI المخصص عند تحديث المدخلات */
        <div className="space-y-3 animate-pulse py-1">
          <div className="h-4 bg-[#F2F4F7] rounded w-full"></div>
          <div className="h-5 bg-[#F2F4F7] rounded w-2/3 ml-auto"></div>
        </div>
      ) : (
        <>
          {/* صف قيمة الخصم التراكمي والخط الفاصل البصري */}
          {totalDiscountAmount > 0 && (
            <div className="relative flex py-1 items-center animate-fadeIn">
              <div className="flex-grow border-t border-dashed border-[#E4E7EC]"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-[#A61C24] bg-white px-2.5 py-0.5 rounded-full border border-red-100">
                - {totalDiscountAmount.toFixed(0)} {currency} Discount
              </span>
              <div className="flex-grow border-t border-dashed border-[#E4E7EC]"></div>
            </div>
          )}

          {/* صف المجموع الإجمالي النهائي (Total) يطابق الصورة تماماً */}
          <div className="flex justify-between items-baseline pt-2 border-t border-[#F2F4F7]">
            <span className="text-xl font-bold text-[#A61C24]">Total</span>
            <span className="text-2xl font-bold text-[#A61C24] tracking-tight">
              {total.toFixed(0)} {currency}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
