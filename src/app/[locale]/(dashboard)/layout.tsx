import SecondaryNavigation from '@/shared/components/custom-ui/secondary-navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* header */}
      <SecondaryNavigation />
      <section>{children}</section>
      {/* //footer */}
    </main>
  );
}
