import { Skeleton } from '@/shared/components/ui/skeleton';

export default function productsDashSkeleton() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4.5 bg-bg-plain p-6 mb-6">
        {/* Header */}
        <header className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </header>

        {/* Search */}
        <Skeleton className="h-10 w-full" />

        {/* Table */}
        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-6 bg-bg-muted p-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-5 w-20" />
            ))}
          </div>

          {/* Rows */}
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-6 items-center border-t border-border-muted p-3"
            >
              {Array.from({ length: 6 }).map((_, columnIndex) => (
                <Skeleton key={columnIndex} className="h-5 w-20" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Skeleton className="h-10 w-64" />
      </div>
    </section>
  );
}
