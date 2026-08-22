'use client';

import React, { useState } from 'react';

// navigation
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

// lib
import { useTranslations } from 'next-intl';

// relatives

import { CheckoutStepsProps } from '@/features/main/types/checkout.d';
import { Address } from '@/features/main/types/address.d';
import { CouponBackendResponse } from '@/features/main/types/order-summary';
import Stepper from '@/shared/components/custom-ui/stepper';

import ShippingAddressStep from './address/shipping-address/shipping-address-step';
import { CheckoutPaymentStep } from './payment/payment';
import OrderSummaryPanel from '../order-summary/order-summary-panel';

const CheckoutSteps = ({ initialAddresses, initialAddressesError }: CheckoutStepsProps) => {
  // Translations
  const t = useTranslations('checkout');

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addressIdFromUrl = searchParams.get('addressId');
  const step = Number(searchParams.get('step') ?? 1);

  // State
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(addressIdFromUrl);
  const [currentStep, setCurrentStep] = useState<number>(step);
  const [appliedCoupons, setAppliedCoupons] = useState<CouponBackendResponse[]>([]);

  // Functions

  const handleAddressAdded = (newAddress: Address) => {
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
  };

  const handleNextStep = () => {
    if (!selectedAddressId) return;
    router.push(`${pathname}?step=2&addressId=${encodeURIComponent(selectedAddressId)}`);
  };

  const handleBackStep = () => {
    router.push(`${pathname}?step=1`);
  };
  const handleApplyCoupon = (coupon: CouponBackendResponse) => {
    const isAlreadyApplied = appliedCoupons.some((c) => c.id === coupon.id);
    if (isAlreadyApplied) return;
    setAppliedCoupons((prev) => [...prev, coupon]);
  };

  const handleRemoveCoupon = (id: string) => {
    setAppliedCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className=" flex gap-10 justify-between mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 max-w-195.5 w-full ">
        <Stepper currentStep={currentStep} numberOfSteps={2} type="center" />

        {currentStep === 1 && (
          <ShippingAddressStep
            addresses={addresses}
            isError={initialAddressesError}
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
            onAddressAdded={handleAddressAdded}
            onNext={handleNextStep}
          />
        )}

        {currentStep === 2 && (
          <CheckoutPaymentStep
            selectedAddressId={selectedAddressId}
            couponCode={appliedCoupons[0]?.code}
            onBack={handleBackStep}
          />
        )}
      </div>

      <OrderSummaryPanel
        subtotal={500}
        appliedCoupons={appliedCoupons}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />
    </div>
  );
};

export default CheckoutSteps;
