'use client';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { Lock, LogOut, UserRoundPen } from 'lucide-react';
import { AccountSidebarProps, NavItem } from '../../types/profile';

// Variables
const navItems: NavItem[] = [
  {
    id: 'profile',
    title: 'account-settings.sidebar.profile-tab',
    leftIcon: <UserRoundPen className="w-6 h-6" />,
    href: '?tab=profile',
  },
  {
    id: 'password',
    title: 'account-settings.sidebar.password-tab',
    leftIcon: <Lock className="w-6 h-6" />,
    href: '?tab=password',
  },
];

// Styles
const navContainerStyle = `
   fixed bottom-0 left-0 z-50
   
   lg:static lg:z-0 w-full lg:w-[25%] h-auto
    lg:h-158.5 border border-border-muted p-2 lg:p-4 
    flex flex-row lg:flex-col justify-between rounded-xl 
    shadow-sm bg-bg-plain select-none
  `;
const logoutButtonStyle = `
    w-full justify-center lg:justify-start gap-2 lg:gap-3 
    px-2 lg:px-4 py-2.5 lg:py-3.5 rounded-lg lg:rounded-xl 
    transition-all text-xs sm:text-sm lg:text-lg font-medium 
    bg-bg-muted text-text-danger border-none
  `;
export default function AccountSidebar({ activeTab, onLogout }: AccountSidebarProps) {
  return (
    <nav className={navContainerStyle} aria-label="Account management navigation">
      {/* Navigation Items  */}
      <div className="flex flex-row lg:flex-col gap-2 w-full">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <Link key={item.id} href={item.href} scroll={false} className="flex-1 lg:w-full">
              <Button
                buttonVariant="text"
                variant="account"
                title={item.title}
                leftIcon={item.leftIcon}
                className={isActive ? 'bg-bg-inverse text-text-inverse' : 'text-text-plain'}
              />
            </Link>
          );
        })}
      </div>

      {/* Logout Block */}
      <div className="w-auto lg:w-full">
        <Button
          buttonVariant="text"
          variant="ghost"
          title="account-settings.sidebar.logout"
          leftIcon={<LogOut className="w-5 h-5 lg:w-8 lg:h-9 rotate-180" />}
          onClick={onLogout}
          className={logoutButtonStyle}
        />
      </div>
    </nav>
  );
}
