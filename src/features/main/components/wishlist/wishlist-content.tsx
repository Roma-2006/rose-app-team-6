'use client';
import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from '@/i18n/navigation';
import WishlistItem from './wishlist-item';
import { useWishlist } from '../../hooks/use-wishlist';
import WishlistItemSkeleton from '../skeleton/wishlist-item-skeleton';
import { Button } from '@/shared/components/ui/button';
import { MoveLeft, MoveRight, FolderHeart, BrushCleaning } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Modal from '@/shared/components/custom-ui/modal';
import { AlertDialog, AlertDialogTrigger } from '@/shared/components/ui/alert-dialog';
import ClearConfirmation from '@/shared/components/custom-ui/clear-confirmation';
import { toast } from 'sonner';
import {
  removeFromWishlistAction,
  clearWishlist as clearWishlistAction,
} from '../../actions/wishlist.action';
import { WishlistContentProps } from '../../types/wishlist';

export default function WishlistContent({ initialWishlist }: WishlistContentProps) {
  //Translations
  const t = useTranslations('products');
  //Session
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Authenticated

  const serverItems = initialWishlist.payload.wishlistItems;

  // Guest
  const guestWishlist = useWishlist(undefined, initialWishlist);

  const wishlistItems = isAuthenticated ? serverItems : guestWishlist.wishlistItems;
  const wishlistCount = wishlistItems.length;

  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const locale = useLocale();
  const isRTL = locale === 'ar';

  //Function
  const handleRemoveItem = async (itemId: string) => {
    if (!isAuthenticated) {
      guestWishlist.removeItemFromWishlistMutation(itemId);
      return;
    }
    startTransition(async () => {
      try {
        await removeFromWishlistAction(itemId);
        router.refresh();
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  const handleClearWishlist = async () => {
    if (!isAuthenticated) {
      await guestWishlist.clearWishlist();
      setIsClearDialogOpen(false);
      return;
    }
    startTransition(async () => {
      try {
        await clearWishlistAction();
        toast.success('Wishlist cleared successfully');
        router.refresh();
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setIsClearDialogOpen(false);
      }
    });
  };

  const loadingClearWishlist = isAuthenticated ? isPending : guestWishlist.loadingClearWishlist;

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <h1 className="font-bold text-5xl text-text-plain flex items-end gap-3.75">
          <FolderHeart size={60} />
          {t('wishlist.title')}{' '}
          <span className="text-base font-normal text-text-muted ">
            {' '}
            {t('wishlist.items-count', { count: wishlistCount })}
          </span>
        </h1>
        {wishlistItems.length > 0 && (
          <AlertDialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
            <AlertDialogTrigger
              render={
                <Button
                  variant="destructive"
                  buttonVariant="text"
                  title="products.wishlist.clear"
                  leftIcon={<BrushCleaning size={20} />}
                />
              }
            />
            <Modal>
              <ClearConfirmation
                onClick={handleClearWishlist}
                icon={<BrushCleaning size={29} />}
                title={t('wishlist.clear-wishlist-confirmation')}
                cancelButtonTitle="button.cancel"
                confirmButtonTitle="button.confirm"
                loading={loadingClearWishlist}
              />
            </Modal>
          </AlertDialog>
        )}
      </div>
      {!isAuthenticated && guestWishlist.isLoading ? (
        <WishlistItemSkeleton />
      ) : wishlistItems.length > 0 ? (
        <div className="flex flex-col gap-5 border-t border-border-subtle my-4">
          {wishlistItems.map((item) => (
            <WishlistItem key={item.id} wishlistItem={item} onRemove={handleRemoveItem} />
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl font-bold min-h-80 mt-6">{t('wishlist.empty')}</p>
      )}
      <Link href="/products">
        <Button
          buttonVariant="text"
          variant="primary"
          title="products.wishlist.continue-shopping"
          leftIcon={isRTL ? <MoveRight /> : <MoveLeft />}
        />
      </Link>
    </>
  );
}
