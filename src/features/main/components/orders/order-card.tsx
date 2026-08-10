import { useTranslations } from 'next-intl';
import { CreditCard, Wallet, Truck } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';

import { Order } from '../types/order';
import { OrderItemsContainer } from './order-items-container';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const t = useTranslations('orders');

  const isPaid = order.paymentStatus === 'PAID';

  const getStatusClassName = () => {
    switch (order.status) {
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700';

      case 'SHIPPED':
        return 'bg-blue-100 text-blue-700';

      case 'DELIVERED':
        return 'bg-green-100 text-green-700';

      case 'CANCELED':
        return 'bg-red-100 text-red-700';

      case 'PENDING':
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getDeliveryLabel = () => {
    if (order.status === 'DELIVERED') {
      return t('delivery.delivered');
    }

    return t('delivery.pending');
  };

  const getDeliveryClassName = () => {
    if (order.status === 'DELIVERED') {
      return 'text-green-600';
    }

    return 'text-yellow-600';
  };

  const orderDisplayNumber = order.orderNumber ?? order.id.slice(0, 5);

  return (
    <article className="overflow-hidden rounded-xl border border-bg-muted bg-white shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between bg-primary px-6 py-4 text-white">
        <h3 className="text-lg font-bold">
          {t('orderPrefix')} #{orderDisplayNumber}
        </h3>

        <span className="text-sm opacity-90">
          {t('createdAt')}:{' '}
          {new Date(order.createdAt).toLocaleString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </header>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-6 border-b border-bg-muted bg-bg-muted/20 p-6 md:grid-cols-2">
        {/* Payment information */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl font-bold text-text-primary">
              {t('totalPrice')}: {Number(order.total).toLocaleString()} {t('currency')}
            </span>

            <Badge className={isPaid ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}>
              {t(`paymentStatus.${order.paymentStatus}`)}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-text-muted">
            {order.paymentMethod === 'CREDIT_CARD' ? (
              <CreditCard size={16} />
            ) : (
              <Wallet size={16} />
            )}

            <span>
              {t('paymentMethod')}: {t(`methods.${order.paymentMethod}`)}
            </span>
          </div>
        </div>

        {/* Delivery information */}
        <div className="flex flex-col gap-3 md:items-end">
          <Badge className={getStatusClassName()}>{t(`status.${order.status}`)}</Badge>

          <div className="flex items-center gap-2 text-sm">
            <Truck size={16} className={getDeliveryClassName()} />

            <span className="text-text-muted">{t('deliveryStatus')}:</span>

            <span className={`${getDeliveryClassName()} font-medium`}>{getDeliveryLabel()}</span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="p-2">
        <p className="px-4 py-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
          {t('orderItems')}
        </p>

        <OrderItemsContainer items={order.orderItems} />
      </div>
    </article>
  );
}
