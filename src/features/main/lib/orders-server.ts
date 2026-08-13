import 'server-only';

import { getServerSession } from 'next-auth';

import { getOrders } from '../api/orders.api';
import { getProductById } from '../api/product-details.api';
import { Order } from '../types/order';
import { authOptions } from '@/auth';

export async function getOrdersWithProductDetails(): Promise<Order[]> {
  const session = await getServerSession(authOptions);

  const token = session?.token as string | undefined;

  if (!token) {
    throw new Error('Not authenticated');
  }

  const ordersResponse = await getOrders(token);

  const orders = ordersResponse.payload.data;

  const productIds = Array.from(
    new Set(orders.flatMap((order) => order.orderItems.map((item) => item.product.id)))
  );

  const productDetailsEntries = await Promise.all(
    productIds.map(async (id) => {
      const result = await getProductById(id);

      return [id, result.status ? result.payload.product : null] as const;
    })
  );

  const productDetailsById = new Map(productDetailsEntries);

  return orders.map((order) => ({
    ...order,
    orderItems: order.orderItems.map((item) => ({
      ...item,
      productDetails: productDetailsById.get(item.product.id) ?? null,
    })),
  }));
}
