export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-bg-muted sm:h-36 lg:h-48" />
          ))}
        </div>
        <div className="h-56 animate-pulse rounded-xl bg-bg-muted" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-64 animate-pulse rounded-xl bg-bg-muted" />
        <div className="h-64 animate-pulse rounded-xl bg-bg-muted" />
      </div>
    </div>
  );
}
