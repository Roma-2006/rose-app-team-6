import { useLocale, useTranslations } from 'next-intl';
import { CreditCard, Wallet, Truck, CheckCheck } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';

import { OrderItemsContainer } from './order-items-container';
import { Order } from '../../types/order';

export function OrderCard({ order }: { order: Order }) {
  const t = useTranslations('orders');
  const locale = useLocale();

  const isPaid = order.paymentStatus === 'SUCCEEDED';

  const isDelivered = order.status === 'DELIVERED';

  //  order status badge
  const getStatusClassName = () => {
    switch (order.status) {
      case 'PENDING':
        return 'bg-bg-warning text-text-inverse';

      case 'CONFIRMED':
      case 'PROCESSING':
      case 'SHIPPED':
        return 'bg-bg-info text-text-inverse';

      case 'DELIVERED':
        return 'bg-bg-success text-text-inverse';

      case 'CANCELLED':
      case 'REFUNDED':
        return 'bg-bg-danger text-text-inverse';

      default:
        return 'bg-bg-warning text-text-inverse';
    }
  };

  return (
    <div className="overflow-hidden rounded-xl  bg-bg-muted shadow-sm">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-2 bg-bg-primary-saturated px-6 py-4 text-text-inverse">
        <h3 className="text-2xl font-semibold">
          {t('orderPrefix')} # {order.id}
        </h3>

        <span className="text-base font-semibold  opacity-90">
          {t('createdAt')}:{' '}
          {new Date(order.createdAt).toLocaleString(locale, {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </header>

      {/* Summary */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between border-b  border-border-soft pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-text-plain ">
              {t('totalPrice')}: {Number(order.total).toLocaleString(locale)} {t('currency')}
            </span>

            <Badge
              className={
                isPaid ? 'bg-bg-success text-text-inverse' : 'bg-bg-warning text-text-inverse'
              }
            >
              {order.paymentStatus}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-plain text-base">{t('status.label')}:</span>
            <Badge className={getStatusClassName()}>{order.status}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pb-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center font-semibold text-text-plain gap-2 text-base">
              <span>{t('paymentMethod')}:</span>

              {order.paymentMethod === 'CREDIT_CARD' ? (
                <CreditCard size={16} className="text-text-soft" />
              ) : (
                <Wallet size={16} className="text-text-soft" />
              )}
              <span className="text-sm text-text-soft">{order.paymentMethod}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-2 font-semibold text-text-plain text-base">
                {t('deliveryStatus')}:
              </span>

              <span
                className={
                  isDelivered
                    ? 'flex items-center gap-1 font-medium text-text-success'
                    : 'flex items-center gap-1 font-medium text-text-warning'
                }
              >
                {isDelivered ? (
                  <>
                    <CheckCheck size={16} />
                    Delivered
                  </>
                ) : (
                  <>
                    <Truck size={16} />
                    Pending
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="pl-2">
        <p className="px-4 py-2 font-semibold text-text-plain text-base">{t('orderItems')}:</p>

        <OrderItemsContainer items={order.orderItems} />
      </div>
    </div>
  );
}
