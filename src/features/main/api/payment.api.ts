'use client';

import { ICreateOrderPayload, IConfirmPaymentPayload } from '../types/payment';

export async function createOrder(payload: ICreateOrderPayload) {
  const response = await fetch('/api/orders', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || !result.status) {
    throw new Error(result.message || 'Order failed');
  }

  return result.payload;
}

export async function createPaymentIntent(orderId: string) {
  const response = await fetch('/api/payments/create-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId }),
  });

  const result = await response.json();

  if (!response.ok || !result.status) {
    throw new Error(result.message || 'Payment initialization failed');
  }

  return result.payload;
}

export async function confirmPayment(payload: IConfirmPaymentPayload): Promise<void> {
  const response = await fetch('/api/payments/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || !result.status) {
    throw new Error(result.message || 'Payment confirmation failed');
  }
}
