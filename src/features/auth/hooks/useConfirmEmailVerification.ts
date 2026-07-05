import { useMutation } from '@tanstack/react-query';
import { confirmEmailVerification } from '../apis/confirm-email-verification.api';

export function useConfirmEmailVerification() {
  return useMutation({
    mutationFn: confirmEmailVerification,
  });
}
