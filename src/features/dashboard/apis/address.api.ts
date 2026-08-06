import { Address } from '../types/address';
import { ENDPOINTS } from '@/features/dashboard/constants/endpoints';
import { HEADERS } from '@/shared/constants/api.constants';

export interface AddressesApiResponse {
  status: boolean;
  code: number;
  message: string;
  payload: {
    addresses: Address[];
  };
}

export const getAddresses = async (token: string): Promise<Address[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${ENDPOINTS.ADDRESS}`;

  const response = await fetch(url, {
    headers: { ...HEADERS.jsonBody, Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    throw new Error('UNAUTHENTICATED');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch addresses');
  }

  const result: AddressesApiResponse = await response.json();

  const addresses = result.payload?.addresses;
  return Array.isArray(addresses) ? addresses : [];
};