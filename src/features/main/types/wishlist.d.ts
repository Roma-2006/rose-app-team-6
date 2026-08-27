interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: {
    id: string;
  };
}
interface GetWishlistResponse {
  status: boolean;
  code: number;
  payload: {
    wishlistItems: WishlistItem[];
  };
}
