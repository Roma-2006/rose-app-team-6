import { Product } from './products';
interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: Product;
}
interface GetWishlistResponse {
  status: boolean;
  code: number;
  payload: {
    wishlistItems: WishlistItem[];
  };
}
export type TWishlistItemProps = {
  wishlistItem: WishlistItem | LocalWishlistItem;
};
interface WishlistContentProps {
  wishlist?: GetWishlistResponse;
  isAuthenticated: boolean;
}
