import Header from '@/shared/components/custom-ui/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* header */}
      <Header />
      <section>{children}</section>
      {/* //footer */}
    </main>
  );
}
