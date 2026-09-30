import { authOptions } from '@/auth';
import { getWishlist } from '@/features/main/api/get-wishlist.api';
import WishlistContent from '@/features/main/components/wishlist/wishlist-content';
import { getServerSession } from 'next-auth';
export default async function wishlistPage() {
  const session = await getServerSession(authOptions);
  let wishlist;
  if (session?.user) {
    wishlist = await getWishlist();
  }
  return (
    <>
      <WishlistContent wishlist={wishlist} isAuthenticated={!!session?.user} />
    </>
  );
}
