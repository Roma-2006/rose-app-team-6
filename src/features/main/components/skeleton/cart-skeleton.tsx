'use client';

import { Skeleton } from '@/shared/components/ui/skeleton';

export default function CartSkeleton() {
  return (
    <div className="divide-y border rounded-3xl py-4 px-4 border-border-plain pb-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="flex items-center gap-4 py-4 w-full">
          {/* Image Skeleton */}
          <Skeleton className="h-32 w-28 shrink-0 rounded-xl" />

          {/* Content Skeleton */}
          <div className="flex flex-col justify-between flex-1 gap-6">
            <div className="flex items-start justify-between w-full">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>

            <div className="flex items-center justify-between w-full pt-1">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-9 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
