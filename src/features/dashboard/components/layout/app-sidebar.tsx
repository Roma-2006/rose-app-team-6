'use client';

import { LayoutGrid, ClipboardList, CalendarHeart, Package, Flower } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils/tailwind-cn';

import { useIsMobile } from '@/hooks/use-mobile';
import { usePathname } from '@/i18n/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/shared/components/ui/sidebar';

import { SidebarMobileNav } from './sidebar-mobile-nav';
import { Button } from '@/shared/components/ui/button';
import { UserProfileSection } from './user-profile-section';
import { SidebarNavItem } from '@/features/main/types/layout/sidebar';

const navItems: SidebarNavItem[] = [
  { title: 'Overview', href: '/dashboard', icon: LayoutGrid },
  { title: 'Categories', href: '/dashboard/categories', icon: ClipboardList },
  { title: 'Occasions', href: '/dashboard/occasions', icon: CalendarHeart },
  { title: 'Products', href: '/dashboard/products', icon: Package },
];

export function AppSidebar() {
  // Variables
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();

  // Functions
  const handlePreview = () => {
    router.push('/');
  };

  if (isMobile) {
    return (
      <SidebarMobileNav
        items={navItems}
        activeHref={pathname}
        masterIcon={Flower}
        masterIconLabel="Rose"
        onMasterIconClick={handlePreview}
        className="md:hidden"
      />
    );
  }

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 h-lvh w-75.75 py-5.5 px-8.5 shadow-shadow-subtle"
    >
      <SidebarHeader className="py-9 flex flex-col gap-6 justify-center items-center">
        <Image
          src="/assets/icons/logo.png"
          alt="Rose"
          width={120}
          height={120}
          className="object-contain self-center"
          priority
        />
        <Button
          variant="primary"
          buttonVariant="text"
          leftIcon={<Flower size={25} />}
          title="button.preview-website"
          className="w-full"
          onClick={handlePreview}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={active}
                  render={<a href={item.href} />}
                  className={cn(
                    'w-full rounded-lg gap-3 transition-colors',
                    active ? 'bg-bg-primary-fade text-text-primary' : 'text-text-plain '
                  )}
                >
                  <item.icon size={25} className="shrink-0" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <UserProfileSection />
      </SidebarFooter>
    </Sidebar>
  );
}
