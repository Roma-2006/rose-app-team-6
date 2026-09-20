'use client';

import { useMutation } from '@tanstack/react-query';
import { confirmPayment, createOrder, createPaymentIntent } from '../api/payment.api';

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
  });
}

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: createPaymentIntent,
  });
}

export function useConfirmPayment() {
  return useMutation({
    mutationFn: confirmPayment,
  });
}
