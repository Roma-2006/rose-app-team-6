import React from 'react';
import { IAppliedCouponsBoxProps } from '../../types/order-summary';

export default function AppliedCouponsBox({
  appliedCoupons,
  onRemoveCoupon,
  currency = 'EGP',
}: IAppliedCouponsBoxProps) {
  const hasCoupons = appliedCoupons.length > 0;

  return (
    <div className="max-w-114.5 max-h-65 flex  items-center justify-center">
      {!hasCoupons ? (
        /* Empty State: يطابق التصميم والصورة المرسلة تماماً */
        <p className="text-[#98A2B3] text-sm italic font-light tracking-wide select-none">
          No coupons applied
        </p>
      ) : (
        /* Success State: عرض قائمة الكوبونات المطبقة حياً عند تخطي الفحص */
        <div className="w-full flex flex-col gap-2.5">
          {appliedCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="flex items-center justify-between w-full bg-white text-gray-800 text-xs px-3.5 py-2.5 rounded-md border border-gray-200 shadow-sm transition-all duration-200 animate-fadeIn"
            >
              <div className="flex items-center gap-2">
                {/* رمز الكوبون بمظهر متناسق */}
                <span className="font-mono font-bold text-[#A61C24] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  {coupon.code}
                </span>
                {/* تفاصيل الخصم بناءً على الـ Enum */}
                <span className="text-gray-500 font-medium">
                  ({coupon.type === 'PERCENT' ? `${coupon.value}%` : `${coupon.value} ${currency}`}{' '}
                  Off)
                </span>
              </div>

              {/* زر الحذف المخصص (Remove Action) */}
              <button
                type="button"
                onClick={() => onRemoveCoupon(coupon.id)}
                className="text-gray-400 hover:text-red-600 focus:outline-none transition-colors duration-150 p-1 font-bold text-sm"
                aria-label={`Remove coupon ${coupon.code}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
