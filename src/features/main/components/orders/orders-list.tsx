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

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <p className="font-medium text-destructive">{t('error')}</p>

        <button
          type="button"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white"
        >
          {t('retry')}
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return <div className="py-12 text-center text-text-muted">{t('noOrders')}</div>;
  }

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-text-primary">{t('title')}</h1>

      <div className="flex max-h-[3xl] flex-col gap-6 overflow-y-auto pe-2">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}
