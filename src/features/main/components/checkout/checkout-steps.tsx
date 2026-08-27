'use client';

import React, { useState } from 'react';

import { CheckoutStepsProps } from '@/features/main/types/checkout.d';
import { Address } from '@/features/main/types/address.d';
import { CouponBackendResponse } from '@/features/main/types/order-summary';
import Stepper from '@/shared/components/custom-ui/stepper';

import ShippingAddressStep from './address/shipping-address/shipping-address-step';
import { CheckoutPaymentStep } from './payment/payment';
import OrderSummaryPanel from '../order-summary/order-summary-panel';

const CheckoutSteps = ({ initialAddresses, initialAddressesError }: CheckoutStepsProps) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(() => {
    const primary = initialAddresses.find((address) => address.isPrimary);
    return primary?.id ?? initialAddresses[0]?.id ?? null;
  });

  const [appliedCoupons, setAppliedCoupons] = useState<CouponBackendResponse[]>([]);

  const handleAddressAdded = (newAddress: Address) => {
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
  };

  const handleApplyCoupon = (coupon: CouponBackendResponse) => {
    const isAlreadyApplied = appliedCoupons.some((c) => c.id === coupon.id);
    if (isAlreadyApplied) return;
    setAppliedCoupons((prev) => [...prev, coupon]);
  };

  const handleRemoveCoupon = (id: string) => {
    setAppliedCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const handleNextStep = () => {
    if (!selectedAddressId) return;
    setCurrentStep(2);
  };

  const handleBackStep = () => {
    setCurrentStep(1);
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <Stepper currentStep={currentStep} />

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
