export interface LocalWishlistProduct {
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

export interface LocalWishlistItem {
  id: string;
  productId: string;
  product: LocalWishlistProduct;
}
