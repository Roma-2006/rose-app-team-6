import { BreadcrumbProvider } from '@/features/dashboard/context/breadcrumbs-context';
import { DashboardBreadcrumbs } from '@/features/dashboard/components/layout/dashboard-breadcrumb';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BreadcrumbProvider>
      <DashboardBreadcrumbs />
      {children}
    </BreadcrumbProvider>
  );
}
