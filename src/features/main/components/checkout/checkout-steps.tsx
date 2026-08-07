'use client';

// states
import React, { useState } from 'react';

// lib
import { useTranslations } from 'next-intl';

// relatives
import { CheckoutStepsProps } from '@/features/main/types/checkout.d';
import { Address } from '@/features/main/types/address.d';
import Stepper from '@/shared/components/custom-ui/stepper';
import ShippingAddressStep from './address/shipping-address/shipping-address-step';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CheckoutSteps = ({ initialAddresses, initialAddressesError }: CheckoutStepsProps) => {
  // translations
  const t = useTranslations('checkout');
  // states
  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(() => {
    const primary = initialAddresses.find((a) => a.isPrimary);
    if (primary) return primary.id;
    if (initialAddresses.length === 1) return initialAddresses[0].id;
    return null;
  });

  // functions

  const handleAddressAdded = (newAddress: Address) => {
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
  };

  const handelNextStep = () => {
    if (initialAddresses && initialAddresses.length > 0) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className=" flex gap-10 justify-between mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 max-w-195.5 w-full ">
        <Stepper currentStep={currentStep} numberOfSteps={2} type="center" />
        {/* <Stepper currentStep={currentStep} numberOfSteps={2} /> */}

        {currentStep === 1 && (
          <ShippingAddressStep
            addresses={addresses}
            isError={initialAddressesError}
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
            onAddressAdded={handleAddressAdded}
            onNext={handelNextStep}
          />
        )}

        {currentStep === 2 && (
          <Button
            variant="primary"
            buttonVariant="text"
            // disabled={!canProceed}
            onClick={handleBackStep}
            title={t('back')}
            className="self-end"
            leftIcon={<ArrowLeft size={20} />}
          />
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
