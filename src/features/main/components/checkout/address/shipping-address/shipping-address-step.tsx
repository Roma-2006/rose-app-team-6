'use client';

import { useState } from 'react';
// lib
import { useTranslations } from 'next-intl';
// relatives
import { Address } from '@/features/main/types/address.d';
import { Button } from '@/shared/components/ui/button';
import ShippingAddressesSection from './shipping-addresses-section';
import { ArrowRight } from 'lucide-react';

interface ShippingAddressStepProps {
  addresses: Address[];
  isError?: boolean;
  selectedAddressId: string | null;
  onSelectAddress: (id: string) => void;
  onAddressAdded: (address: Address) => void;
  onNext: () => void;
}

const ShippingAddressStep = ({
  addresses,
  isError,
  selectedAddressId,
  onSelectAddress,
  onAddressAdded,
  onNext,
}: ShippingAddressStepProps) => {
  // translations
  const t = useTranslations('checkout');

  // states
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions
  const handleAddNewAddress = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <div className="flex flex-col gap-6 flex-1 max-w-195.5">
        <ShippingAddressesSection
          addresses={addresses}
          isError={isError}
          selectedAddressId={selectedAddressId}
          onSelectAddress={onSelectAddress}
          onAddNewAddress={handleAddNewAddress}
        />

        <Button
          variant="primary"
          buttonVariant="text"
          disabled={!selectedAddressId}
          onClick={onNext}
          title={t('next')}
          className="self-end"
          rightIcon={<ArrowRight size={20} className="rtl:rotate-180" />}
        />
      </div>

      {/* <ProductsCarousel /> */}
    </div>
  );
};

export default ShippingAddressStep;
