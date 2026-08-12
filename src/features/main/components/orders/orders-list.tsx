'use client';

import { useTranslations } from 'next-intl';

import { useOrders } from '@/features/main/hooks/use-order';
import { Skeleton } from '@/shared/components/ui/skeleton';

import { OrderCard } from './order-card';

export function OrdersList() {
  const t = useTranslations('orders');
  const { orders, isLoading, isError } = useOrders();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (orders.length === 0) {
    return <div className="py-12 text-center text-text-muted">{t('noOrders')}</div>;
  }

  return (
    <section className="w-full ">
      <h1 className="mb-6 text-4xl font-bold text-text-primary">{t('title')}</h1>

      <div className="flex w-full flex-col gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}
