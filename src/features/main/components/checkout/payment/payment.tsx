'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { PaymentMethod } from '@/features/main/types/payment';
import { useCreateOrder } from '@/features/main/hooks/use-payment';
import { clearCartAction } from '@/features/main/api/cart.api';
import { Button } from '@/shared/components/ui/button';
import { PaymentMethodOption } from './PaymentMethodOption';

interface CheckoutPaymentStepProps {
  selectedAddressId: string | null;
  onBack: () => void;
}

export function CheckoutPaymentStep({ selectedAddressId, onBack }: CheckoutPaymentStepProps) {
  const router = useRouter();
  const t = useTranslations('checkout');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  function handlePaymentMethodChange(method: PaymentMethod) {
    console.log('[Checkout] Payment method selected:', method);
    setPaymentMethod(method);
  }

  const createOrderMutation = useCreateOrder();

  const isPending = createOrderMutation.isPending;

  async function handlePlaceOrder() {
    if (!paymentMethod) {
      toast.error(t('selectPaymentMethod'));
      return;
    }

    if (!selectedAddressId) {
      toast.error(t('selectAddress'));
      return;
    }

    try {
      const order = await createOrderMutation.mutateAsync({
        addressId: selectedAddressId,
        paymentMethod,
      });

      if (paymentMethod === 'CASH_ON_DELIVERY') {
        await clearCartAction();
        toast.success(t('orderSuccess'));
        router.replace('/orders');
        return;
      }

      // CREDIT_CARD
      // router.push(`/checkout/payment?orderId=${order.id}`);
    } catch (err) {
      console.error('[Checkout] Order failed:', err);
      toast.error(t('orderFailed'));
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-4">
        <Button
          variant="ghost"
          buttonVariant="text"
          type="button"
          onClick={onBack}
          title={t('back')}
          className="w-auto self-start bg-bg-muted px-4 flex-row-reverse"
          rightIcon={<ArrowLeft size={20} />}
        />

        <h2 className="text-2xl font-semibold">{t('step2Title')}</h2>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <PaymentMethodOption
          value="CASH_ON_DELIVERY"
          selectedValue={paymentMethod}
          title={t('cashOnDelivery')}
          description={t('cashDescription')}
          image="/assets/payment/cash-on-delivery.svg"
          imageAlt={t('cashOnDelivery')}
          onChange={handlePaymentMethodChange}
        />

        <PaymentMethodOption
          value="CREDIT_CARD"
          selectedValue={paymentMethod}
          title={t('creditCard')}
          description={t('creditDescription')}
          image="/assets/payment/credit-card.svg"
          imageAlt={t('creditCard')}
          onChange={handlePaymentMethodChange}
        />
      </div>

      <div className="flex justify-end border-t border-t-bg-muted pt-6">
        <Button
          variant="primary"
          buttonVariant="text"
          type="button"
          disabled={!paymentMethod || !selectedAddressId || isPending}
          onClick={handlePlaceOrder}
          title={t('placeOrder')}
          className="self-end"
          rightIcon={
            isPending ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />
          }
        />
      </div>
    </section>
  );
}
