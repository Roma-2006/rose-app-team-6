import { getWishlist } from '@/features/main/api/get-wishlist.api';
import WishlistContent from '@/features/main/components/wishlist/wishlist-content';
export default async function wishlistPage() {
  const wishlist = await getWishlist();
  return (
    <>
      <WishlistContent initialWishlist={wishlist} />
    </>
  );
}
