'use client';

// relatives
import { AddressListProps } from '@/features/dashboard/types/address.d';
import AddressListItem from './address-list-item';

const AddressList = ({ addresses, selectedAddressId, onSelectAddress }: AddressListProps) => {
  return (
    <div role="radiogroup" aria-label="Shipping addresses" className="flex flex-col gap-3">
      {addresses.map((address) => (
        <AddressListItem
          key={address.id}
          address={address}
          isSelected={address.id === selectedAddressId}
          onSelect={onSelectAddress}
        />
      ))}
    </div>
  );
};

export default AddressList;