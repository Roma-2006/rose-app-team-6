interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
  };
}
interface GetCartResponse {
  status: boolean;
  code: number;
  payload: {
    cartItems: CartItem[];
  };
}
