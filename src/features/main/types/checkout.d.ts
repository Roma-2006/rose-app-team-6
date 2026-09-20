import { Address } from './address';

export interface CheckoutStepsProps {
  initialAddresses: Address[];
  initialAddressesError?: boolean;
}
