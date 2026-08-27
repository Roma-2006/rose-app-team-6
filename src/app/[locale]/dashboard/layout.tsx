// Lib
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

// Relevants
import { BreadcrumbProvider } from '@/features/dashboard/context/breadcrumbs-context';
import { DashboardBreadcrumbs } from '@/features/dashboard/components/layout/dashboard-breadcrumb';
import { DashboardHeaderMobile } from '@/features/dashboard/components/layout/dashboard-mobile-breadcrumbs';
import { AppSidebar } from '@/features/dashboard/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/shared/components/ui/sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();

  if (!session || session?.user.role == 'USER') {
    redirect({ href: '/', locale: locale });
  }

  return (
    <BreadcrumbProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="hidden md:block">
            <DashboardBreadcrumbs />
          </div>
          <div className="md:hidden">
            <DashboardHeaderMobile />
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </BreadcrumbProvider>
  );
}
