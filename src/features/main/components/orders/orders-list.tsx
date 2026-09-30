import { getTranslations } from 'next-intl/server';

import { OrderCard } from './order-card';
import { getOrdersWithProductDetails } from '../../services/orders.server';

export async function OrdersList() {
  const t = await getTranslations('orders');

  const orders = await getOrdersWithProductDetails();

  if (orders.length === 0) {
    return <div className="py-12 text-center text-text-muted">{t('noOrders')}</div>;
  }

  return (
    <section className="w-full ">
      <h1 className="mb-8 text-5xl font-bold text-text-plain">{t('title')}</h1>

      <div className="flex w-full flex-col gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}
