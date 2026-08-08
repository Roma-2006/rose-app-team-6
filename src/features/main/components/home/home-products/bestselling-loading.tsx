import { ProductCardSkeleton } from './product-card-skelton';

export const BestSellingSectionLoading = () => {
  return (
    <section className="w-full mt-16">
      <div className="flex flex-col lg:flex-row lg:items-start gap-9">
        {/* Left Static Content Skeleton */}
        <div className="w-80 shrink-0 flex flex-col items-start gap-3">
          {/* Badge */}
          <div className="h-5 w-32 rounded-md bg-bg-soft animate-pulse" />

          {/* Title */}
          <div className="w-full space-y-2">
            <div className="h-9 w-full rounded-md bg-bg-soft animate-pulse" />
            <div className="h-9 w-4/5 rounded-md bg-bg-soft animate-pulse" />
          </div>

          {/* Description */}
          <div className="w-full space-y-2 ">
            <div className="h-4 w-full rounded-md bg-bg-soft animate-pulse" />
            <div className="h-4 w-11/12 rounded-md bg-bg-soft animate-pulse" />
            <div className="h-4 w-4/5 rounded-md bg-bg-soft animate-pulse" />
            <div className="h-4 w-4/6 rounded-md bg-bg-soft animate-pulse" />
             <div className="h-4 w-4/8 rounded-md bg-bg-soft animate-pulse" />
          </div>

          {/* Button */}
          <div className="mt-5 h-11 w-40 rounded-lg bg-bg-soft animate-pulse" />
        </div>

        {/* Product Skeletons */}
        <div className="relative flex-1 lg:max-w-5xl w-full overflow-hidden">
          <div className="flex gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-72 pointer-events-none select-none"
              >
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
