import Header from '@/shared/components/header/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* header */}
      <Header />
      <section className="my-17 px-20">{children}</section>
      {/* //footer */}
    </main>
  );
}
