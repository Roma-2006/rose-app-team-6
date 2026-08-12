import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';
import { OrdersList } from '@/features/main/components/orders/orders-list';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="w-full px-6 py-2 lg:px-14">
      <OrdersList />
    </main>
  );
}
