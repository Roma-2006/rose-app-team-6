import React from 'react';
import { IAppliedCouponsBoxProps } from '../../types/order-summary';
import { useTranslations } from 'next-intl';

export default function AppliedCouponsBox({
  appliedCoupons,
  onRemoveCoupon,
  currency = 'EGP',
  variant = 'editable',
  errorMessage = null,
}: IAppliedCouponsBoxProps) {
  //Transelation
  const tSummary = useTranslations('cart');

  // Variables
  const hasCoupons = appliedCoupons.length > 0;
  const isEditable = variant === 'editable';

  return (
    <div className="w-full flex flex-col h-61 gap-1 items-center justify-center border border-border-soft rounded-xl p-5 mb-1 transition-all duration-200 ">
      {hasCoupons ? (
        <div className="w-60  flex flex-col gap-2.5">
          {appliedCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="flex items-center justify-between w-full  text-text-muted text-xs rounded-xl border border-border-soft px-2 "
            >
              <div className="flex items-center gap-1 h-10  ">
                <span className="font-mono font-bold text-text-primary bg-bg-secondary-fade px-3 py-1 rounded-lg  ">
                  {coupon.code}
                </span>
                <span className="text-text-muted font-medium">
                  ({coupon.type === 'PERCENT' ? `${coupon.value}%` : `${coupon.value} ${currency}`}{' '}
                  Off)
                </span>
              </div>

              {isEditable && (
                <button
                  type="button"
                  onClick={() => onRemoveCoupon(coupon.id)}
                  className="text-text-primary  focus:outline-none transition-colors duration-150 p-1 font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      ) : errorMessage ? (
        <p
          className="text-text-danger text-sm font-semibold tracking-wide text-center"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : (
        <p className="text-text-muted text-sm italic font-semibold tracking-wide select-none">
          {tSummary('NocouponApplied')}
        </p>
      )}
    </div>
  );
}
