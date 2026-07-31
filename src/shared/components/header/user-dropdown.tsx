'use client';
// import { useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { HelloButton } from '../ui/hello-button';
import { UserIcon, MapPinHouse, ScrollText, Settings, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { User } from '@/features/auth/types/user';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

interface userMenuProps {
  user: User;
}

const UserDropdown = ({ user }: userMenuProps) => {
  // const { data: session, status } = useSession();
  const t = useTranslations('header.user-menu');

  // if (status === 'loading') return null;
  // if (!session) return null;

  const handleSignout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<HelloButton variant={'ghost'} name={user.firstName}></HelloButton>}
      ></DropdownMenuTrigger>
      <DropdownMenuContent
        className="shadow-none border-0 bg-bg-plain w-56 max-h-55.5 h-fit text-start p-0 "
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-text-primary font-semibold text-sm">
            {user.firstName} {user.lastName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-bg-muted"></DropdownMenuSeparator>
          <DropdownMenuItem>
            <Link
              href={`/profile`}
              className="flex gap-2 w-full text-text-plain font-medium text-sm"
            >
              <UserIcon className="size-4" />
              {t('account')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-bg-muted"></DropdownMenuSeparator>

          <DropdownMenuItem>
            <Link
              href={`/addresses`}
              className="flex gap-2 w-full text-text-plain font-medium text-sm"
            >
              <MapPinHouse className="size-4" />
              {t('addresses')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-bg-muted"></DropdownMenuSeparator>

          <DropdownMenuItem>
            <Link
              href={`/orders`}
              className="flex gap-2 w-full text-text-plain font-medium text-sm"
            >
              <ScrollText className="size-4" />
              {t('orders')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-bg-muted"></DropdownMenuSeparator>

          {!(user.role == 'USER') && (
            <DropdownMenuItem>
              <Link
                href={`/dashboard`}
                className="flex gap-2 w-full text-text-plain font-medium text-sm"
              >
                <Settings className="size-4" />
                {t('dashboard')}
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="py-0">
            <Button
              variant="ghost"
              buttonVariant="text"
              leftIcon={<LogOut className="size-4 " />}
              title="header.user-menu.logout"
              onClick={handleSignout}
              className="flex gap-2 w-full text-text-plain font-medium text-sm justify-start h-8 border-0 m-0 hover:bg-bg-plain cursor-pointer"
            ></Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-bg-muted"></DropdownMenuSeparator>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
