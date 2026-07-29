import { Link } from '@/i18n/navigation';
import { TProductItemProps } from '@/shared/types/product-item';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function ProductItem({ image, title, price, rate, rating }: TProductItemProps) {
  return (
    <Link href="/products" className="border-t border-border-muted p-2.5 flex gap-4 ">
      <div className="w-20 h-20 relative">
        <Image fill src={image} className="rounded-lg" alt={title} />
      </div>
      <div className="flex justify-between grow">
        <div>
          <h2 className="text-sm font-semi-bold text-text-plain ">{title}</h2>
          <span className="font-bold text-3xl text-text-plain">
            {price}
            <span className="text-xl font-semibold ">EGP</span>
          </span>
        </div>
        <div className="flex gap-1.5">
          <Star size={20} />
          <span className="font-normal font-sm text-text-plain ">
            Rating:<span className="text-base">{rate}</span>
          </span>
          <span className="text-text-info text-sm font-medium">{`${rating} ( ratings)`}</span>
        </div>
      </div>
    </Link>
  );
}
