import { Suspense } from 'react';

import { Skeleton } from '@/shared/components/ui/skeleton';

import { OrdersList } from '../orders/orders-list';

function OrdersListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<OrdersListSkeleton />}>
      <OrdersList />
    </Suspense>
  );
}
