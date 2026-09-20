import { Skeleton } from '@/shared/components/ui/skeleton';

export default function ProductItemSkeleton() {
  return (
    <div className="border-t border-border-muted p-2.5 flex gap-4 ">
      {/* Image */}
      <Skeleton className="w-20 h-20 rounded-lg shrink-0" />

      <div className="flex flex-col lg:flex-row items-start justify-between grow">
        {/* Product info */}
        <div>
          {/* title */}
          <Skeleton className="h-4 w-40 mb-3" />

          {/* prices */}
          <div className="flex gap-2 items-end">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Rating */}
        <div className="flex gap-1.5 items-center">
          {/* stars */}
          <div className="flex gap-1">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-4 h-4 rounded-full" />
          </div>

          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
