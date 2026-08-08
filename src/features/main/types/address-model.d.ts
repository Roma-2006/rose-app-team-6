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

type UpdateAddressRequest = Partial<CreateAddressRequest>;

interface GetAddressesResponse {
  status: boolean;
  code: number;
  payload: {
    addresses: Address[];
  };
}

interface ApiResponse<T> {
  status: boolean;
  code: number;
  payload: T;
}
