import { ProductCardSkeleton } from './product-card-skelton';

export const BestSellingSectionLoading = () => {
  return (
    <div className="flex gap-6 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="snap-start">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
};
