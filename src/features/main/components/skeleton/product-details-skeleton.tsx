export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Gallery Skeleton */}
        <div className="flex flex-col gap-4 w-full">
          <div className=" w-full h-96 md:h-101 rounded-2xl  bg-bg-muted" />

          <div className="flex items-center gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-bg-muted  shrink-0" />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="flex flex-col gap-5 w-full">
          {/* Title */}
          <div className="h-8 md:h-10 bg-bg-muted  rounded-lg w-3/4" />

          {/* Price & Stock */}
          <div className="flex items-center gap-4">
            <div className="h-8 bg-bg-muted  rounded-lg w-28" />
            <div className="h-6 bg-bg-muted  rounded-full w-32" />
          </div>

          <div className="h-px bg-border-subtle my-1" />

          {/* Rating */}
          <div className="h-5 bg-bg-muted  rounded-md w-40" />

          <div className="h-px bg-border-subtle my-1" />

          {/* Description Lines */}
          <div className="space-y-2">
            <div className="h-4 bg-bg-muted  rounded w-full" />
            <div className="h-4 bg-bg-muted  rounded w-5/6" />
            <div className="h-4 bg-bg-muted  rounded w-2/3" />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <div className="w-12 h-12 bg-bg-muted  rounded-xl shrink-0" />
            <div className="flex-1 h-12 bg-bg-muted  rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
