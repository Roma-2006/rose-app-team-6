import React from 'react';
import { ICouponBackendResponse } from '../../types/order-summary';

export interface IAppliedCouponsBoxProps {
  appliedCoupons: ICouponBackendResponse[];
  onRemoveCoupon: (id: string) => void;
  currency?: string;
  variant?: 'editable' | 'read-only';
}

export default function AppliedCouponsBox({
  appliedCoupons,
  onRemoveCoupon,
  currency = 'EGP',
  variant = 'editable',
}: IAppliedCouponsBoxProps) {
  
  const hasCoupons = appliedCoupons.length > 0;
  const isEditable = variant === 'editable';

  return (
    <div className="w-full min-h-[140px] flex flex-col items-center justify-center border border-solid border-[#E4E7EC] rounded-lg bg-[#FAFAFA] p-5 mb-1">
      {!hasCoupons ? (
        <p className="text-[#98A2B3] text-sm italic font-light tracking-wide select-none">
          No coupons applied
        </p>
      ) : (
        <div className="w-full flex flex-col gap-2.5">
          {appliedCoupons.map((coupon) => (
            <div key={coupon.id} className="flex items-center justify-between w-full bg-white text-gray-800 text-xs px-3.5 py-2.5 rounded-md border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#A61C24] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  {coupon.code}
                </span>
                <span className="text-gray-500 font-medium">
                  ({coupon.type === 'PERCENT' ? `${coupon.value}%` : `${coupon.value} ${currency}`} Off)
                </span>
              </div>

              {/* 🛠️ يظهر زر الحذف فقط إذا كان المكون في وضع التعديل التفاعلي */}
              {isEditable && (
                <button
                  type="button"
                  onClick={() => onRemoveCoupon(coupon.id)}
                  className="text-gray-400 hover:text-red-600 focus:outline-none transition-colors duration-150 p-1 font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
