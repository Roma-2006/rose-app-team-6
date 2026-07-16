// src/features/home/components/ProductCardSkeleton.tsx

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm animate-pulse">
      {/* 1. Image Placeholder (Square Aspect Ratio) */}
      <div className="relative aspect-square bg-zinc-200 dark:bg-zinc-800" />

      {/* 2. Content Area */}
      <div className="p-4 space-y-3">
        {/* Title Line */}
        <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4" />

        {/* Rating Stars Line */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          ))}
        </div>

        {/* Price and Cart Button Line */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-2">
            {/* Price Line */}
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md w-20" />
            {/* Old Price Line (Smaller) */}
            <div className="h-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-md w-12" />
          </div>

          {/* Cart Button Circle */}
          <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        </div>
      </div>
    </div>
  );
};
