'use client';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { Lock, LogOut, UserRoundPen } from 'lucide-react';

interface AccountSidebarProps {
  activeTab: 'profile' | 'password';
  onLogout?: () => void;
}

interface NavItem {
  id: 'profile' | 'password';
  title: string;
  leftIcon: React.ReactNode;
  href: string;
}

export default function AccountSidebar({ activeTab, onLogout }: AccountSidebarProps) {
  const navItems: NavItem[] = [
    {
      id: 'profile',
      title: 'sidebar.profile',
      leftIcon: <UserRoundPen className="-scale-x-100" />,
      href: '?tab=profile',
    },
    {
      id: 'password',
      title: 'sidebar.password',
      leftIcon: <Lock className="-scale-x-100" />,
      href: '?tab=password',
    },
  ];
  return (
    <nav
      className="w-66.75 h-158.5 border border-border-muted p-4 flex flex-col justify-between rounded-xl shadow-sm bg-bg-plain select-none"
      aria-label="Account management navigation"
    >
      {/* Top Section: Navigation Items */}
      <div className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <Link key={item.id} href={item.href} scroll={false} className="w-full block">
              <Button
                buttonVariant="text"
                variant="ghost"
                title={item.title}
                leftIcon={item.leftIcon}
                className={`w-full justify-start gap-3 px-4 py-3.5 rounded-xl transition-all text-lg font-medium ${
                  isActive ? 'bg-bg-inverse text-text-inverse' : 'text-text-plain'
                }`}
              />
            </Link>
          );
        })}
      </div>

      {/* Bottom Section: Logout Block */}
      <div className="w-full">
        <Button
          buttonVariant="text"
          variant="ghost"
          title="logout"
          leftIcon={<LogOut className="w-8 h-9 rotate-180" />}
          onClick={onLogout}
          className="w-full justify-start gap-3 px-4 py-3.5 rounded-xl transition-all text-lg font-medium bg-bg-muted text-text-danger border-none"
        />
      </div>
    </nav>
  );
}
