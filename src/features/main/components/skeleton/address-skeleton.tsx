export function AddressSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="relative mt-8 rounded-2xl border border-border-soft bg-bg-plain pt-6 pr-9 pb-5 pl-4"
        >
          {/* Floating Title */}
          {/* <div className="absolute -top-3 left-6 h-6 w-28 rounded-md bg-bg-muted" /> */}

          <div className="flex w-full items-start justify-between">
            <div className="space-y-4">
              {/* City + Icon */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-bg-muted" />

                <div className="h-7 w-32 rounded-md bg-bg-muted" />
              </div>

              {/* Address Pill */}
              <div className="h-8 w-56 rounded-full bg-bg-muted" />
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 pr-8">
              <div className="h-5 w-5 rounded-full bg-bg-muted" />
              <div className="h-5 w-28 rounded-md bg-bg-muted" />
            </div>
          </div>

          {/* Floating Buttons */}
          <div className="absolute top-1/2 right-0 z-30 flex -translate-y-1/2 translate-x-1/2 flex-col gap-2">
            <div className="h-10 w-10 rounded-full bg-bg-muted shadow-sm" />
            <div className="h-10 w-10 rounded-full bg-bg-muted shadow-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}
