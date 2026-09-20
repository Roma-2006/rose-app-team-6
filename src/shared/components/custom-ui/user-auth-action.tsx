import { TUserAuthActionProps } from '@/shared/types/user-auth-action';

import LoginPopover from '@/features/auth/components/login-popover/login-popover';

export default function UserAuthAction({ isAuthenticated }: TUserAuthActionProps) {
  if (!isAuthenticated) {
    return <LoginPopover />;
  }

  return null;
}
