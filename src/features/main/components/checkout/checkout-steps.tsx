'use client';

// states
import React, { useState } from 'react';

// navigation
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

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
  // Translations
  const t = useTranslations('checkout');

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStep = searchParams.get('step') === '2' ? 2 : 1;
  const addressIdFromUrl = searchParams.get('addressId');

  // State
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(addressIdFromUrl);

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
          <Button
            variant="primary"
            buttonVariant="text"
            onClick={handleBackStep}
            title={t('back')}
            className="self-end"
            leftIcon={<ArrowLeft size={20} className="rtl:rotate-180" />}
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
