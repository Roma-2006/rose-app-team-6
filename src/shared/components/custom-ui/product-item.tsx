import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import RatingStarts from './rating-stars';
import { TProductItemProps } from '@/features/main/types/product-item';
import { calculateDiscountedPrice } from '@/features/main/utils/calculate-discount';

export default function ProductItem({ product, search }: TProductItemProps) {
  const t = useTranslations();
  const discountedPrice = Number(calculateDiscountedPrice(product));
  const hasDiscount = product.discountType && Number(product.discountValue) > 0;
  const safeSearch = search?.trim() ? search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
  const regex = safeSearch ? new RegExp(`(${safeSearch})`, 'gi') : null;
  return (
    <Link
      href={`/products/${product.id}`}
      className="border-t border-border-muted p-2.5 flex flex-col  items-center  sm:flex-row gap-4 "
    >
      <div className="w-20 h-20 relative">
        <Image fill src={product.cover} className="rounded-lg" alt={product.title} />
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-between grow ">
        <div>
          <h2 className="text-sm font-semi-bold text-text-plain">
            {regex
              ? product.title.split(regex).map((part, i) =>
                  part.toLowerCase() === search?.trim().toLowerCase() ? (
                    <span key={i} className="text-text-primary">
                      {part}
                    </span>
                  ) : (
                    part
                  )
                )
              : product.title}
          </h2>
          <span className="flex gap-2 items-end">
            <span className="font-bold text-3xl text-text-plain">
              {discountedPrice.toFixed(2)}
              <span className="text-xl font-semibold ">{t('products.filter.currency.egp')}</span>
            </span>
            {hasDiscount && (
              <span className="line-through text-sm text-text-muted">
                {Number(product.price).toFixed(2)}
                <span>{t('products.filter.currency.egp')}</span>
              </span>
            )}
          </span>
        </div>
        <div className="flex flex-col  md:flex-row gap-1.5 items-center">
          <div className="flex pt-2 md:pt-0">
            <RatingStarts rating={product.rating} />
          </div>
          <span className="font-normal font-sm text-text-plain ">
            {t('products.filter.rating.title')}:{' '}
            <span className="text-base">
              {Number(product.rating) > 0
                ? Number(product.rating).toFixed(1)
                : Number(product.rating)}
              /5
            </span>
          </span>
          <span className="text-text-info text-sm font-medium">
            ({product.ratings} {t('products.filter.rating.subtitle')})
          </span>
        </div>
      </div>
    </Link>
  );
}
