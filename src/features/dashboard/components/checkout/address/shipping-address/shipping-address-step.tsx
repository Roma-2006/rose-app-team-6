'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Address } from '@/features/dashboard/types/address.d';
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
  const t = useTranslations('checkout');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // VALIDATION: at least one address must be selected before Next
  const canProceed = Boolean(selectedAddressId);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <div className="flex flex-col gap-6 flex-1 max-w-195.5">
        <ShippingAddressesSection
          addresses={addresses}
          isError={isError}
          selectedAddressId={selectedAddressId}
          onSelectAddress={onSelectAddress}
          onAddNewAddress={() => setIsModalOpen(true)}
        />

        <Button
          variant="primary"
          buttonVariant="text"
          // disabled={!canProceed}
          onClick={onNext}
          title={t('next')}
          className="self-end"
          rightIcon={<ArrowRight size={20} />}
        />
      </div>

      {/* <ProductsCarousel /> */}
    </div>
  );
};

export default ShippingAddressStep;
