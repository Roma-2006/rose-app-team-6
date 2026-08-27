'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { MoreVertical, CircleUserRound } from 'lucide-react';

import { cn } from '@/shared/lib/utils/tailwind-cn';
import { UserDropdown } from './user-dropdown';
import { UserProfileSectionProps } from '@/features/main/types/layout/account';
import { useDeleteAccount } from '@/features/main/hooks/use-delete-account';

export function UserProfileSection({ className }: UserProfileSectionProps) {
  // State
  const { data: session } = useSession();

  // Variables
  const firstname = session?.user?.firstName ?? 'Firstname';
  const lastname = session?.user?.lastName ?? 'Lastname';

  const email = session?.user?.email ?? 'user-email@example.com';
  const image = session?.user?.photo;

  // Function
  const { handleDelete } = useDeleteAccount?.() ?? {};

  return (
    <div className={cn('flex items-center gap-3 border-t border-border-muted pt-4', className)}>
      {/* Avatar */}
      <div className="relative  shrink-0 overflow-hidden rounded-full bg-bg-primary-fade">
        {image ? (
          <Image src={image} alt={firstname} fill className="object-cover h-12 w-12" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-medium  text-text-primary">
            <CircleUserRound size={25} />
          </div>
        )}
      </div>

      {/* Name & Email */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-text-plain">{firstname + ' ' + lastname} </p>
        <p className="truncate text-[12px] font-semibold text-text-soft">{email}</p>
      </div>

      {/* Actions */}
      <UserDropdown
        trigger={
          <button
            type="button"
            aria-label="user-menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-soft text-text-soft transition-colors"
          >
            <MoreVertical size={20} />
          </button>
        }
        onDelete={handleDelete}
      />
    </div>
  );
}
