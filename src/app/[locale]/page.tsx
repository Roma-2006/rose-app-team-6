"use client"
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Basebutton from '@/shared/components/custom-ui/Basebutton';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const handleLog=()=>console.log("Hello Rowidaa")
  return (
    <>
    <Basebutton handleClick={handleLog}/>
    <main className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full flex flex-col items-center">
        {/* Language Switcher */}
        <div className="mb-6 w-full flex justify-end">
          <LanguageSwitcher />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
          {locale === 'ar' ? 'مرحباً بك في تطبيق روز' : 'Welcome to Rose App'}
        </h1>
       
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
          <span>Active Locale:</span>
          <span className="uppercase text-indigo-600 font-bold">{locale}</span>
        </div>
      </div>
    </main>
    </>
  );
}
