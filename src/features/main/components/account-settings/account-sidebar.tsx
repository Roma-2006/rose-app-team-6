'use client';

import { Lock, UserRoundPen } from 'lucide-react';

// 1. تحديد أنواع الـ Props لتمرير الـ State من الصفحة الأب
interface AccountSidebarProps {
  activeTab: 'profile' | 'password';
  setActiveTab: (tab: 'profile' | 'password') => void;
}

interface NavItem {
  id: 'profile' | 'password';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: UserRoundPen,
  },
  {
    id: 'password',
    label: 'Change Password',
    icon: Lock,
  },
];

export default function AccountSidebar({ activeTab, setActiveTab }: AccountSidebarProps) {
  return (
    <nav
      className="w-66.75 h-158.5 border border-border-muted p-4 flex flex-col justify-between rounded-lg shadow-sm select-none"
      aria-label="Account management navigation"
    >
      {/* القائمة العلوية للأزرار */}
      <div className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          // 2. المقارنة تتم الآن بناءً على الـ State النشط وليس الـ URL
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)} // 3. عند الضغط يتم تحديث الـ State في الصفحة الرئيسية
              className={`
                flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-150 group text-sm font-medium w-full text-left
                ${
                  isActive
                    ? 'bg-bg-overlay text-text-inverse'
                    : 'text-text-plain hover:bg-gray-50 active:bg-bg-inverse'
                }
              `}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-text-inverse' : 'text-text-plain group-hover:text-gray-600'
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
