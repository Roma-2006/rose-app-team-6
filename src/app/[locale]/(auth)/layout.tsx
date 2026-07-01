import { LanguageSwitcherAuth } from '@/features/features-auth/components/language-switcher-auth';
import Image from 'next/image';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-zinc-800 grid lg:grid-cols-[1fr_1.1fr]">
      {/* Form Panel */}
      <section className="flex items-center justify-centbackgroundground px-10">
        <div className="w-full max-w-md rounded-xl bg-card p-8">
          {/* Language Switcher */}
          <div className="flex justify-end">
            <LanguageSwitcherAuth />
          </div>
          {/* Top Separator */}
          <Image
            src="/assets/images/separator-1.png"
            alt=""
            aria-hidden="true"
            width={280}
            height={45}
            className="mx-auto mt-12 mb-10"
          />
          {/* ---------------------------------------------------- */}
          {/*welcome text*/}
          {/* ---------------------------------------------------- */}
          <div className="flex-1 flex items-center">{children}</div>
          {/* Bottom Separator */}
          <Image
            src="/assets/images/separator-1.png"
            alt=""
            aria-hidden="true"
            width={280}
            height={45}
            className="mx-auto mt-12 mb-10 rotate-180"
          />
        </div>
        <div className="my-8 h-px bg-border" />
      </section>

      {/* Image Panel */}
      <section className="relative h-screen w-full hidden lg:block">
        <Image
          src="/assets/images/Cover.png"
          alt="Authentication illustration"
          fill
          priority
          className="object-cover "
        />
      </section>
    </main>
  );
}
