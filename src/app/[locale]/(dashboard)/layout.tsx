import Header from '@/shared/components/custom-ui/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* header */}
      <Header />
      <section className="my-17 mx-20">{children}</section>
      {/* //footer */}
    </main>
  );
}
