interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product?: {
    id: string;
  };
}
