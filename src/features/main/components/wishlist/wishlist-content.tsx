'use client';
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
import { useState } from 'react';
import { WishlistContentProps } from '../../types/wishlist';
export default function WishlistContent({ initialWishlist }: WishlistContentProps) {
  //Translations
  const t = useTranslations('products');
  //Hooks
  const {
    wishlistItems,
    isLoading,
    isFetching,
    error,
    wishlistCount,
    clearWishlist,
    loadingClearWishlist,
    refetch,
    isError,
  } = useWishlist(undefined, initialWishlist);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const locale = useLocale();
  const isRTL = locale === 'ar';
  //Function
  const handleClearWishlist = async () => {
    await clearWishlist();
    setIsClearDialogOpen(false);
  };
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
      {isLoading ? (
        <WishlistItemSkeleton />
      ) : isError ? (
        <div className="text-center text-2xl font-bold min-h-80 mt-6">
          <p className="mb-3">{error?.message}</p>
          <Button
            buttonVariant="text"
            variant="primary"
            title="button.retry"
            onClick={() => refetch()}
            loading={isFetching}
          />
        </div>
      ) : wishlistItems.length > 0 ? (
        <div className="flex flex-col gap-5 border-t border-border-subtle my-4">
          {wishlistItems.map((item) => (
            <WishlistItem key={item.id} wishlistItem={item} />
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
