'use client';

import { useTranslations } from 'next-intl';

import { ShippingAddressSectionProps } from '@/features/main/types/address.d';
import { Button } from '@/shared/components/ui/button';
import AddressList from './address-list';
import AddressListSkeleton from './address-list-skeleton';
import { AddressBookModal } from '../../../address/address-model';
import { useState } from 'react';

const ShippingAddressesSection = ({
  addresses,
  isLoading = false,
  isError = false,
  selectedAddressId,
  onSelectAddress,
  onAddNewAddress,
}: ShippingAddressSectionProps) => {
  const t = useTranslations('checkout.shipping-address');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3 w-full justify-center">
      <h2 className="font-semibold text-text-plain text-3xl text-start">{t('title')}</h2>

      {isLoading && <AddressListSkeleton />}

      {!isLoading && isError && (
        <p className="text-text-danger text-lg py-6 text-center">{t('load-error ')}</p>
      )}

      {!isLoading && !isError && addresses.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-6">
          <p className="text-text-soft text-lg text-center">{t('no-addresses-error')}</p>
          <Button
            variant="primary"
            buttonVariant="text"
            onClick={onAddNewAddress}
            title={t('add-new-address')}
          />
        </div>
      )}

      {!isLoading && !isError && addresses.length > 0 && (
        <>
          <AddressList
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelectAddress={onSelectAddress}
          />

          <span className="text-text-soft text-lg py-2.25 flex justify-center my-3">{t('or')}</span>

          <Button
            variant="secondary"
            buttonVariant="text"
            onClick={() => setIsAddressModalOpen(true)}
            title={t('add-new-address')}
            className="self-center w-full text-center"
          />
          <AddressBookModal isOpen={isAddressModalOpen} onOpenChange={setIsAddressModalOpen} />
        </>
      )}
    </div>
  );
};

export default ShippingAddressesSection;
