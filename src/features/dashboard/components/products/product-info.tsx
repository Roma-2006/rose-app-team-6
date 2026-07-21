'use client';

import { Star, Package } from 'lucide-react';

interface ProductInfoProps {
  product: {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    stock: number;
    rating: number;
    ratingsCount: number;
    description: string;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-5 w-full text-start">
      {/* title*/}
      <h1 className="text-2xl md:text-3xl font-bold text-text-plain ">{product.title}</h1>

      {/* originalPrice*/}
      <div className="flex items-center gap-4 flex-wrap">
        {product.originalPrice && (
          <span className="text-lg text-text-muted line-through">{product.originalPrice}</span>
        )}
        <span className="text-3xl font-bold text-text-plain ">
          {product.price.toFixed(2)} <span className="text-lg font-normal">EGP</span>
        </span>

        {/* stock*/}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 font-medium text-lg rounded-full bg-bg-muted text-text-plain  ">
          <Package className="w-5 h-5 text-text-muted shrink-0" />
          <span>{product.stock} left in stock</span>
        </span>
      </div>
      <hr className="border-border-subtle  my-1" />
      {/* rating*/}
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
        <span className="font-semibold text-text-plain">Rating: {product.rating}/5</span>
        <span className="text-text-info">({product.ratingsCount} ratings)</span>
      </div>

      <hr className="border-border-subtle  my-1" />

      {/* Description*/}
      <p className="text-sm md:text-base text-text-default  leading-relaxed">
        {product.description}
      </p>

      {/* Button and wish list*/}
    </div>
  );
}
