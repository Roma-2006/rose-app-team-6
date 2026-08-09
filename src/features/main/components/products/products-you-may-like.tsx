'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ProductCard } from '@/features/main/components/home/home-products/Product-card';
import { ProductCardSkeleton } from '@/features/main/components/home/home-products/product-card-skelton';
import SecTitle from '@/features/main/components/shared/section-title';
import { Carousel } from '@/features/main/components/shared/carousel';
import { Product, TProductsResponse } from '@/features/main/types/products';
import { ServerCartItem, CartItem, ServerCartProduct } from '@/features/main/hooks/use-cart';
import { getProducts } from '../../api/product.api';
import { LocalCartItem } from '../../types/local-cart';

interface IProductsYouMayLikeProps {
  cartItems: CartItem[];
  isLoadingCart: boolean;
}

export default function ProductsYouMayLike({ cartItems, isLoadingCart }: IProductsYouMayLikeProps) {
  // Translation
  const t = useTranslations('cart');

  // States
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hooks
  useEffect(() => {
    const fetchCartRecommendations = async () => {
      try {
        setIsLoading(true);
        let productsPayload: TProductsResponse | Product[] | undefined = undefined;

        if (cartItems.length === 0) {
          productsPayload = await getProducts({
            page: 1,
            limit: 12,
            sortBy: 'bestSelling',
            sortOrder: 'desc',
          });
        } else {
          const firstItem = cartItems[0];
          let targetCategoryId: string | undefined = undefined;

          if (firstItem) {
            if ('product' in firstItem && firstItem.product) {
              const serverProd = firstItem.product as ServerCartProduct;
              targetCategoryId =
                serverProd.categoryId ?? serverProd.category?.id ?? serverProd.category?.categoryId;
            } else if ('productId' in firstItem) {
              const guestProd = (firstItem as LocalCartItem).product;
              if (guestProd && typeof guestProd === 'object') {
                targetCategoryId =
                  ('categoryId' in guestProd
                    ? (guestProd as { categoryId?: string }).categoryId
                    : undefined) ??
                  ('category' in guestProd
                    ? (guestProd as { category?: { id?: string } }).category?.id
                    : undefined);
              }
            }
          }

          productsPayload = await getProducts({
            page: 1,
            limit: 12,
            sortBy: 'bestSelling',
            sortOrder: 'desc',
            categoryId: targetCategoryId,
          });
        }

        let productsFromApi: Product[] = [];
        if (productsPayload) {
          if (Array.isArray(productsPayload)) {
            productsFromApi = productsPayload;
          } else if ('data' in productsPayload && Array.isArray(productsPayload.data)) {
            productsFromApi = productsPayload.data;
          }
        }

        //Variables
        const cartProductIds: string[] = cartItems
          .map((item) => {
            return (
              (item as ServerCartItem).productId ??
              (item as ServerCartItem).product?.id ??
              (item as LocalCartItem).productId ??
              ''
            );
          })
          .filter(Boolean);

        const filteredRecommendationProducts = productsFromApi.filter((prod: Product) => {
          const prodId = prod.id || '';
          return !cartProductIds.includes(String(prodId));
        });

        setSuggestedProducts(filteredRecommendationProducts);
      } catch (error) {
        console.error('Failed to fetch cart recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoadingCart) {
      fetchCartRecommendations();
    }
  }, [cartItems, isLoadingCart]);

  const isComponentLoading = isLoadingCart || isLoading;

  return (
    <section className="mt-16">
      <div className="mb-8">
        <SecTitle text={t('title-2')} />
      </div>
      <div className="flex-1 w-full">
        <Carousel>
          {isComponentLoading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="snap-start">
                  <ProductCardSkeleton />
                </div>
              ))
            : suggestedProducts.map((product) => (
                <div key={product.id} className="snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
        </Carousel>
      </div>
    </section>
  );
}
