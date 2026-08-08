'use server';

import { getAuthToken } from '../lib/get-auth-token';
import {
  Address,
  CreateAddressRequest,
  UpdateAddressRequest,
  GetAddressesResponse,
  ApiResponse,
} from '../types/address-model';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

async function addressFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await getAuthToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      ...(options.body && { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Address API Error');
  }

  const data: ApiResponse<T> = await response.json();

  return data.payload;
}

export async function getAddressesAction(): Promise<Address[]> {
  const { addresses } = await addressFetch<GetAddressesResponse['payload']>('/addresses', {
    method: 'GET',
  });

  return addresses;
}

export async function createAddressAction(data: CreateAddressRequest): Promise<Address> {
  return addressFetch<Address>('/addresses', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAddressAction(
  id: string,
  data: UpdateAddressRequest
): Promise<Address> {
  return addressFetch<Address>(`/addresses/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteAddressAction(id: string): Promise<void> {
  return addressFetch<void>(`/addresses/${id}`, {
    method: 'DELETE',
  });
}
