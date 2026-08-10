import { getServerSession } from 'next-auth';
import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

import { authOptions } from '@/auth';
import { getAddresses } from '@/features/main/api/address.api';
import CheckoutSteps from '@/features/main/components/checkout/checkout-steps';

export default async function CheckoutPage() {
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
    <CheckoutSteps
      initialAddresses={initialAddresses}
      initialAddressesError={initialAddressesError}
    />
  );
}
