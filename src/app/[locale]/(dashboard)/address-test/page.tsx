'use client';

import { useState } from 'react';
import { AddressBookModal } from '@/features/address/components/address-model';

export default function CheckoutTestPage() {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <h1 className="mb-6 text-3xl font-bold">Shipping Address</h1>

      <div className="space-y-4 rounded-xl border p-6">
        <div>
          <h2 className="text-xl font-semibold">My Addresses</h2>
          <p className="mt-1 text-sm text-gray-500">Select an address or add a new one.</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="font-semibold">Cairo</p>
          <p className="text-sm text-gray-500">14 Omar Ibn Al Khattab St., Ramsis St., Cairo</p>
        </div>

        <button
          type="button"
          className="w-full bg-red-100"
          onClick={() => setIsAddressModalOpen(true)}
        >
          Add a New Address
        </button>
      </div>

      <AddressBookModal isOpen={isAddressModalOpen} onOpenChange={setIsAddressModalOpen} />
    </main>
  );
}
