import { getServerSession } from 'next-auth';
import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

import ProductsYouMayLike from '@/features/main/components/products/products-you-may-like';
import { authOptions } from '@/auth';
import { getAddresses } from '@/features/main/api/address.api';
import CheckoutSteps from '@/features/main/components/checkout/checkout-steps';

import type { Product } from '@/features/main/types/products';

interface CartPageProps {
  suggestedProducts: Product[];
}

export default async function CheckoutPage({ suggestedProducts }: CartPageProps) {
  // Auth
  const session = await getServerSession(authOptions);

  // Locale
  const locale = await getLocale();

  if (!session) {
    redirect({
      href: {
        pathname: '/login',
        query: {
          callbackUrl: '/checkout',
        },
      },
      locale,
    });
  }

  // Addresses
  let initialAddresses: Awaited<ReturnType<typeof getAddresses>> = [];
  let initialAddressesError = false;

  try {
    initialAddresses = await getAddresses(session?.token as string);
  } catch {
    initialAddressesError = true;
  }

  return (
    <main className="mx-auto px-4 py-8">
      {/* Checkout */}
      <CheckoutSteps
        initialAddresses={initialAddresses}
        initialAddressesError={initialAddressesError}
      />

      {/* Products You May Like */}
      <div className="mt-16">
        <ProductsYouMayLike products={suggestedProducts} isLoading={false} />
      </div>
    </main>
  );
}
