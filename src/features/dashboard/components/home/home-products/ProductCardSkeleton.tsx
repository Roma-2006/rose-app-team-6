// src/features/home/components/ProductCardSkeleton.tsx

export const ProductCardSkeleton = () => {
  return (
    <div className="w-72 h-96 rounded-2xl bg-bg-plain border border-border-subtle dark:border-border-muted overflow-hidden shadow-sm animate-pulse">
      {' '}
      {/* 1. Image Placeholder (Square Aspect Ratio) */}
      <div className="relative aspect-square bg-bg-soft" />
      {/* 2. Content Area */}
      <div className="p-4 space-y-3">
        {/* Title  */}
        <div className="h-5 bg-bg-soft rounded-md w-3/4" />

        {/* Rating Stars  */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-bg-soft rounded-full" />
          ))}
        </div>

        {/* Price and Cart Button  */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-2">
            {/* Price  */}
            <div className="h-6 bg-bg-soft rounded-md w-20" />
            {/* Old Price   */}
            <div className="h-4 bg-bg-muted dark:bg-bg-plain/50 rounded-md w-12" />
          </div>

          {/* Cart Button Circle */}
          <div className="w-10 h-10 bg-bg-soft rounded-full" />
        </div>
      </div>
    </div>
  );
};
