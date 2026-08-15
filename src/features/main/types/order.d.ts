export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'Done' | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'PROCESSING';

export type PaymentMethod = 'CASH_ON_DELIVERY' | 'CREDIT_CARD';

export interface ProductSummary {
  id: string;
  title: string;
  cover: string;
}
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
  product: ProductSummary;
  productDetails?: ProductDetails | null;
}

export interface Order {
  id: string;
  userId: string;
  addressId: string;
  couponId: string | null;

  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  stripePaymentIntentId: string | null;

  subtotal: string;
  discount: string;
  shipping: string;
  total: string;

  trackingNumber: string | null;
  notes: string | null;

  createdAt: string;
  updatedAt: string;

  orderItems: OrderItem[];

  orderNumber?: string;
}

export interface OrdersMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrdersApiResponse {
  status: boolean;
  code: number;
  message?: string;
  payload: {
    data: Order[];
    metadata: OrdersMetadata;
  };
}
