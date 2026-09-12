export interface Address {
  id: string;
  title: string;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;
  isPrimary: boolean;
}

export interface CreateAddressRequest {
  title: string;
  city: string;
  street: string;
  phone: string;
  latitude: number;
  longitude: number;
  isPrimary: boolean;
}

export type UpdateAddressRequest = Partial<CreateAddressRequest>;

export interface GetAddressesResponse {
  status: boolean;
  code: number;
  payload: {
    addresses: Address[];
  };
}

export interface ApiResponse<T> {
  status: boolean;
  code: number;
  payload: T;
}
