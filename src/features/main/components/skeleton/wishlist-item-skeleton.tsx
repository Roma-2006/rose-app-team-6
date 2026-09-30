import { Skeleton } from '@/shared/components/ui/skeleton';

export default function WishlistItemSkeleton() {
  return (
    <div className="flex gap-4 py-5 border-b border-border-muted">
      {/* Image */}
      <Skeleton className="w-29.25 h-35 rounded-base" />

      <div className="flex grow justify-between">
        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            {/* Stock */}
            <Skeleton className="h-4 w-20" />

            {/* Title */}
            <Skeleton className="h-5 w-48" />

            {/* Rating */}
            <Skeleton className="h-7 w-24" />
          </div>

          {/* Price */}
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="flex flex-col justify-between">
          {/* Delete icon */}
          <Skeleton className="h-10 w-10 rounded ml-auto" />

          {/* Button */}
          <Skeleton className="h-10 w-32 rounded" />
        </div>
      </div>
    </div>
  );
}
