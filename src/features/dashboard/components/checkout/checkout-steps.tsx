'use client';

// states
import React, { useState } from 'react';

// relatives
import { CheckoutStepsProps } from '@/features/dashboard/types/checkout.d';
import { Address } from '@/features/dashboard/types/address.d';
import Stepper from '@/shared/components/custom-ui/stepper';
import ShippingAddressStep from './address/shipping-address/shipping-address-step';

const CheckoutSteps = ({ initialAddresses, initialAddressesError }: CheckoutStepsProps) => {
  // states
  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(() => {
    const primary = initialAddresses.find((a) => a.isPrimary);
    if (primary) return primary.id;
    if (initialAddresses.length === 1) return initialAddresses[0].id;
    return null;
  });

  const handleAddressAdded = (newAddress: Address) => {
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
  };

  return (
    <div className=" flex gap-10 justify-between mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 max-w-195.5 w-full ">
        <Stepper currentStep={currentStep} numberOfSteps={2} type='center'/>
        {/* <Stepper currentStep={currentStep} numberOfSteps={2} /> */}


        {currentStep === 1 && (
          <ShippingAddressStep
            addresses={addresses}
            isError={initialAddressesError}
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
            onAddressAdded={handleAddressAdded}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <div>{/* Step 2 – payment method, out of scope for this task */}</div>
        )}
      </div>
      <aside className="w-121.25  flex flex-col gap-4 bg-bg-soft">
        {/* <OrderSummary /> */}
        <div className="rounded-2xl bg-bg-plain p-4 text-text-soft">Order summary (S5-02)</div>
      </aside>
    </div>
  );
};

export default CheckoutSteps;
