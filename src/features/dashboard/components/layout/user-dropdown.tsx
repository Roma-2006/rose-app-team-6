'use client';

import * as React from 'react';
import { User, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { DeleteAccountPopover } from './delete-account-popover';
import { Link } from '@/i18n/navigation';

import { UserDropdownProps } from '@/features/main/types/layout/account';

export function UserDropdown({ trigger, onDelete, deleteLoading = false }: UserDropdownProps) {
  // Translation
  const t = useTranslations('dashboard.account.menu');

  // Session
  const session = useSession();

  // State
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={trigger as React.ReactElement} />
        <DropdownMenuContent align="end" sideOffset={8} className="min-w-40 bg-bg-plain">
          <DropdownMenuItem className="text-black [&_svg]:text-bg-black ">
            <Link href={'/dashboard/account'} className="flex gap-1.5 ">
              <User size={16} />
              {t('account-button')}
            </Link>
          </DropdownMenuItem>
          {!(session?.data?.user.role == 'SUPER_ADMIN') && (
            <DropdownMenuItem
              variant="destructive"
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-black flex gap-1.5 hover:text-text-danger"
            >
              <LogOut size={16} />
              {t('logout-button')}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteAccountPopover
        trigger={<span className="hidden" aria-hidden />}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={onDelete}
        loading={deleteLoading}
      />
    </>
  );
}
