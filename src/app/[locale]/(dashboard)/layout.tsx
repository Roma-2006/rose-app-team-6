import Header from '@/shared/components/custom-ui/header';
import SecondaryNavigation from '@/shared/components/custom-ui/secondary-navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* header */}
      <Header />
      <SecondaryNavigation />
      <section>{children}</section>
      {/* //footer */}
    </main>
  );
}
