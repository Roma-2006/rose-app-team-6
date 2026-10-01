'use client';

import React, { useState } from 'react';

// navigation
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

// relatives

import { CheckoutStepsProps } from '@/features/main/types/checkout.d';
import { Address } from '@/features/main/types/address.d';

import Stepper from '@/shared/components/custom-ui/stepper';

import ShippingAddressStep from './address/shipping-address/shipping-address-step';
import { CheckoutPaymentStep } from './payment/payment';
import OrderSummaryPanel from '../order-summary/order-summary-panel';
import { CouponBackendResponse } from '../../types/order-summary';
import type { GetCartResponse } from '@/features/main/types/server-cart';
import { useCart } from '../../hooks/use-cart';

const CheckoutSteps = ({
  initialAddresses,
  initialAddressesError,
  initialCart,
}: CheckoutStepsProps) => {
  // Translations
  // const t = useTranslations('checkout');

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addressIdFromUrl = searchParams.get('addressId');
  const currentStep = Number(searchParams.get('step') ?? 1);

  // State
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(addressIdFromUrl);
  const [appliedCoupons, setAppliedCoupons] = useState<CouponBackendResponse[]>([]);

  const { cartItems, isLoading: isCartLoading } = useCart({
    initialItems: initialCart,
  });
  // Functions
  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.product?.price ?? 0);

    return total + price * item.quantity;
  }, 0);
  const handleAddressAdded = (newAddress: Address) => {
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
  };

  const handleNextStep = () => {
    if (!selectedAddressId) return;
    router.push(`${pathname}?step=2&addressId=${encodeURIComponent(selectedAddressId)}`);
  };

  const handleBackStep = () => {
    router.push(`${pathname}?step=1`);
  };
  const handleApplyCoupon = (coupon: CouponBackendResponse) => {
    const isAlreadyApplied = appliedCoupons.some((c) => c.id === coupon.id);
    if (isAlreadyApplied) return;
    setAppliedCoupons((prev) => [...prev, coupon]);
  };

  const handleRemoveCoupon = (id: string) => {
    setAppliedCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className=" flex gap-10 justify-between mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 max-w-195.5 w-full ">
        <Stepper currentStep={currentStep} numberOfSteps={2} type="center" />

        {currentStep === 1 && (
          <ShippingAddressStep
            addresses={addresses}
            isError={initialAddressesError}
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
            onAddressAdded={handleAddressAdded}
            onNext={handleNextStep}
          />
        )}

        {currentStep === 2 && (
          <CheckoutPaymentStep
            selectedAddressId={selectedAddressId}
            couponCode={appliedCoupons[0]?.code}
            onBack={handleBackStep}
          />
        )}
      </div>

      <OrderSummaryPanel
        subtotal={subtotal}
        appliedCoupons={appliedCoupons}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />
    </div>
  );
};

export default CheckoutSteps;
