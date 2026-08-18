import Header from '@/shared/components/custom-ui/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* header */}
      <Header />
      <section className="my-2 md:my-17 px-2 md:px-20 ">{children}</section>
      {/* //footer */}
    </main>
  );
}
