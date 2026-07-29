export interface LocalCartProduct {
  id: string;
  title: string;
  cover: string;
  price: string;
  discountType?: 'PERCENT' | 'FIXED' | null;
  discountValue?: string | number;
  rating: number;
  ratings: number;
  stock: number;
}

export interface LocalCartItem {
  id: string;
  productId: string;
  quantity: number;
  product: LocalCartProduct;
}
