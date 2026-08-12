import { useTranslations } from 'next-intl';
import { CreditCard, Wallet, Truck, PackageCheck, XCircle, Clock } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';

import { OrderItemsContainer } from './order-items-container';
import { Order } from '../../types/order';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const t = useTranslations('orders');

  const isPaid = order.paymentStatus === 'PAID';

  const isDelivered = Number(order.shipping) > 0;

  // Top-level order status badge (e.g. IN_PROGRESS / DONE / CANCELED)
  const getStatusClassName = () => {
    switch (order.status) {
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700';

      case 'DELIVERED':
        return 'bg-green-100 text-green-700';

      case 'CANCELLED':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-bg-muted bg-bg-soft shadow-sm">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-2 bg-bg-primary px-6 py-4 text-white">
        <h3 className="text-lg font-bold">
          {t('orderPrefix')} # {order.id}
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
      <div className="grid grid-cols-1 gap-6 border-b border-bg-muted px-6 pt-6 pb-4 md:grid-cols-2">
        {/* Left column: price, payment method, delivery status */}
        <div className="flex flex-col gap-3  ">
          <div className="flex flex-wrap items-center gap-3 pb-3 ">
            <span className="text-xl font-bold text-text-primary ">
              {t('totalPrice')}: {Number(order.total).toLocaleString()} {t('currency')}
            </span>

            <Badge className={isPaid ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}>
              {order.paymentStatus}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span>{t('paymentMethod')}:</span>

            {order.paymentMethod === 'CREDIT_CARD' ? (
              <CreditCard size={16} />
            ) : (
              <Wallet size={16} />
            )}

            <span>{order.paymentMethod}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-2 text-text-muted">{t('deliveryStatus')}:</span>

            <span
              className={isDelivered ? 'font-medium text-green-600' : 'font-medium text-yellow-600'}
            >
              {isDelivered ? 'Delivered' : 'Pending'}
            </span>
          </div>
        </div>

        {/* Right column */}
        <div className="flex items-start gap-2 md:justify-end">
          <span className="text-sm font-medium text-text-muted">{t('status.label')}:</span>

          <Badge className={getStatusClassName()}>{order.status}</Badge>
        </div>
      </div>

      {/* Items */}
      <div className="p-2">
        <p className="px-4 py-2 text-sm   text-text-muted">{t('orderItems')}</p>

        <OrderItemsContainer items={order.orderItems} />
      </div>
    </div>
  );
}
