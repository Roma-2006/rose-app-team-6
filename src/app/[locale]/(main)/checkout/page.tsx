import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';
import { getAddresses } from '@/features/main/api/address.api';

import CheckoutSteps from '@/features/main/components/checkout/checkout-steps';
import OrderSummaryPanel from '@/features/main/components/order-summary/order-summary-panel';

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  let initialAddresses: Awaited<ReturnType<typeof getAddresses>> = [];
  let initialAddressesError = false;

  try {
    initialAddresses = await getAddresses(session.token as string);
  } catch {
    initialAddressesError = true;
  }

  return (
    <main className="w-min-h-screen ">
      <CheckoutSteps
        initialAddresses={initialAddresses}
        initialAddressesError={initialAddressesError}
      />
    </main>
  );
}
