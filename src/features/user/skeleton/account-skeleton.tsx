import { Skeleton } from '@/shared/components/ui/skeleton';

export default function AccountSkeleton() {
  return (
    <div className="w-full mt-15.5">
      {/* Page Title */}
      <Skeleton className="h-12 w-64 mb-9 rounded-lg" />

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Sidebar Skeleton */}
        <nav
          className="fixed bottom-0 left-0 z-50 gap-1
            lg:static lg:z-0 w-full lg:w-[25%]
            h-auto lg:h-158.5
            border border-border-muted p-2 lg:p-4
            flex flex-row lg:flex-col justify-between
            rounded-xl shadow-sm bg-bg-plain"
        >
          {/* Navigation Items */}
          <div className="flex flex-row lg:flex-col gap-2 w-[75%] lg:w-full">
            <Skeleton className="h-12 lg:h-14 w-full rounded-lg" />
            <Skeleton className="h-12 lg:h-14 w-full rounded-lg" />
          </div>

          {/* Logout */}
          <div className="w-[25%] lg:w-full">
            <Skeleton className="h-12 lg:h-14 w-full rounded-lg" />
          </div>
        </nav>

        {/* Profile Content Skeleton */}
        <main className="w-full lg:flex-1 min-w-0">
          <div className="border border-border-muted rounded-xl p-4 lg:p-6 space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <Skeleton className="w-24 h-24 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Skeleton className="h-11 w-32 rounded-lg" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
