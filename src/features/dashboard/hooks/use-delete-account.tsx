'use client';

import { useTransition } from 'react';
import { useRouter } from '@/i18n/navigation';
import { signOut } from 'next-auth/react';
import { deleteAccount } from '@/features/dashboard/apis/layout/delete-account.api';
import { useSession } from 'next-auth/react';

export function useDeleteAccount() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const session = useSession();

  if (!session) return;

  console.log('token : ', session?.data?.token);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAccount(session?.data?.token || '');
      if (result.ok) {
        await signOut({ redirect: false });
        router.push('/login');
      }
    });
  };

  return { handleDelete, isPending };
}
