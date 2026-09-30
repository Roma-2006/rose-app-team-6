import { Address } from './address';
import { GetCartResponse } from './server-cart';

export interface CheckoutStepsProps {
  initialAddresses: Address[];
  initialAddressesError?: boolean;
  initialCart: GetCartResponse;
}
