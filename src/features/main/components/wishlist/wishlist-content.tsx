'use client';
import WishlistItem from './wishlist-item';
import { useWishlist } from '../../hooks/use-wishlist';
import WishlistItemSkeleton from '../skeleton/wishlist-item-skeleton';
import { Button } from '@/shared/components/ui/button';
import { MoveLeft, MoveRight, FolderHeart, BrushCleaning } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Modal from '@/shared/components/custom-ui/modal';
import { AlertDialog, AlertDialogTrigger } from '@/shared/components/ui/alert-dialog';
import ClearConfirmation from '@/shared/components/custom-ui/clear-confirmation';
export default function WishlistContent() {
  //Translations
  const t = useTranslations('products');
  //Hooks
  const { wishlistItems, isLoading, error, wishlistCount, clearWishlist } = useWishlist();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  return (
    <>
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <h1 className="font-bold text-5xl text-text-plain flex items-end gap-3.75">
          <FolderHeart size={60} />
          {t('wishlist.title')}{' '}
          <span className="text-base font-normal terxt-text-muted ">{wishlistCount}items</span>
        </h1>
        <AlertDialog>
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
              onClick={clearWishlist}
              icon={<BrushCleaning size={29} />}
              title={t('wishlist.clear-wishlist-confirmation')}
              cancelButtonTitle="button.cancel"
              confirmButtonTitle="button.confirm"
            />
          </Modal>
        </AlertDialog>
      </div>
      {isLoading ? (
        <WishlistItemSkeleton />
      ) : wishlistItems.length > 0 ? (
        <div className="flex flex-col gap-5 border-t border-border-subtle my-4">
          {wishlistItems.map((item) => (
            <WishlistItem key={item.id} wishlistItem={item} />
          ))}
        </div>
      ) : wishlistItems.length === 0 ? (
        <p className="text-center text-3xl font-bold min-h-80 mt-6">{t('wishlist.empty')}</p>
      ) : (
        error && <p>{error.message}</p>
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
