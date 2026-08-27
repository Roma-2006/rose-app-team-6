'use client';

import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils/tailwind-cn';
import { SidebarNavItem } from '../../types/layout/sidebar';

export interface SidebarMobileNavProps extends React.ComponentProps<'nav'> {
  items: SidebarNavItem[];
  activeHref: string;
  masterIcon: LucideIcon;
  masterIconLabel?: string;
  onMasterIconClick?: () => void;
}

export function SidebarMobileNav({
  items,
  activeHref,
  masterIcon: MasterIcon,
  masterIconLabel = 'Menu',
  onMasterIconClick,
  className,
  ...props
}: SidebarMobileNavProps) {
  return (
    <nav
      data-slot="sidebar-mobile-nav"
      data-sidebar="mobile-nav"
      className={cn(
        'fixed inset-x-0 bottom-0 z-20 flex h-20 items-center justify-around rounded-t-xl bg-sidebar px-2 pt-3 pb-2 shadow-[0_-2px_12px_rgba(0,0,0,0.08)] md:hidden',
        className
      )}
      {...props}
    >
      {MasterIcon && (
        <button
          type="button"
          onClick={onMasterIconClick}
          aria-label={masterIconLabel}
          data-slot="sidebar-mobile-nav-master-icon"
          className="absolute -top-6 left-1/2 flex size-13 -translate-x-1/2 items-center justify-center rounded-full bg-bg-primary shadow-lg shadow-maroon-600/25 transition-transform active:scale-95"
        >
          <MasterIcon className="size-6 text-text-inverse" strokeWidth={2} />
        </button>
      )}

      {items.map((item) => (
        <SidebarMobileNavItem key={item.href} item={item} isActive={activeHref === item.href} />
      ))}
    </nav>
  );
}

function SidebarMobileNavItem({ item, isActive }: { item: SidebarNavItem; isActive: boolean }) {
  const Icon = item.icon;

  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        href: item.href,
        className: cn(
          'group/mobile-nav-item flex flex-1 items-center justify-center transition-colors'
        ),
      },
      {}
    ),
    render: (
      <a>
        <span
          className={cn(
            'flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 transition-colors',
            isActive && 'bg-bg-primary-fade'
          )}
        >
          <Icon
            className={cn(
              'size-5.5',
              isActive ? 'text-text-primary' : 'text-sidebar-foreground/80'
            )}
          />
          <span
            className={cn(
              'whitespace-nowrap text-[11px] font-semibold',
              isActive ? 'text-text-primary' : 'text-sidebar-foreground/80'
            )}
          >
            {item.title}
          </span>
        </span>
      </a>
    ),
    state: {
      slot: 'sidebar-mobile-nav-item',
      sidebar: 'mobile-nav-item',
      active: isActive,
    },
  });
}
