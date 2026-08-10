'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getOrders } from '../api/orders.api';

export const ordersKeys = {
  all: ['orders'] as const,
};

export function useOrders() {
  const { data: session, status } = useSession();

  const token = session?.token;

  const query = useQuery({
    queryKey: ordersKeys.all,
    queryFn: () => getOrders(token as string),
    enabled: status === 'authenticated' && !!token,
    staleTime: 60 * 1000,
  });

  return {
    orders: query.data?.payload?.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
