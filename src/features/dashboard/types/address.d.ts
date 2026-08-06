export interface Address {
  id: string;
  city: string;
  street: string;
  phone: string;
  isPrimary: boolean;
}

export interface ShippingAddressSectionProps {
  addresses: Address[];
  isLoading?: boolean;
  isError?: boolean;
  selectedAddressId: string | null;
  onSelectAddress: (id: string) => void;
  onAddNewAddress: () => void;
}

export interface AddressListProps {
  addresses: Address[];
  selectedAddressId: string | null;
  onSelectAddress: (id: string) => void;
}

export interface AddressListItemProps {
  address: Address;
  isSelected: boolean;
  onSelect: (id: string) => void;
}