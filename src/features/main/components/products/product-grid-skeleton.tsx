import { ProductCardSkeleton } from '../skeleton/product-card-skelton';

export function ProductGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
