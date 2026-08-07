'use server';

import { getAuthToken } from '@/features/dashboard/lib/get-auth-token';
import {
  Address,
  CreateAddressRequest,
  UpdateAddressRequest,
  GetAddressesResponse,
} from '../types/address.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  status: boolean;
  code: number;
  payload: T;
}

interface AddressesResponse {
  addresses: Address[];
}

async function addressFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await getAuthToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      accept: 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    // Surface the backend's real validation errors (field + message) instead
    // of a generic "Validation failed" toast. This helps pinpoint the exact
    // failing field when the payload does not match the backend contract.
    if (errorData?.errors?.length) {
      const details = errorData.errors
        .map((err: { path?: string; message?: string; messages?: string[] }) => {
          const field = err.path ?? 'field';
          const message = err.message ?? err.messages?.[0] ?? 'Invalid value';
          return `${field}: ${message}`;
        })
        .join(' | ');

      const prefix = errorData?.message ? `${errorData.message}: ` : '';
      throw new Error(`${prefix}${details}`);
    }

    throw new Error(errorData?.message || 'Address API Error');
  }

  const data: ApiResponse<T> = await response.json();

  return data.payload;
}

export async function getAddressesAction(): Promise<Address[]> {
  const token = await getAuthToken();

  const response = await fetch(`${API_URL}/addresses`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch addresses');
  }

  const data: GetAddressesResponse = await response.json();

  return data.payload.addresses;
}
export async function createAddressAction(data: CreateAddressRequest) {
  return addressFetch<Address>('/addresses', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAddressAction(id: string, data: UpdateAddressRequest) {
  return addressFetch<Address>(`/addresses/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteAddressAction(id: string) {
  return addressFetch<unknown>(`/addresses/${id}`, {
    method: 'DELETE',
  });
}
