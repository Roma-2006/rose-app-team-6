import Image from 'next/image';
import ThemeSeparator from '@/features/auth/components/theme-separator';
import WelcomeText from '@/features/auth/components/welcome-text';
import { LanguageSwitcherAuth } from '@/features/auth/components/language-switcher-auth';
export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-bg-plain  grid lg:grid-cols-[1fr_1.1fr]">
      {/* Form Panel */}
      <section className="flex items-center justify-center bg-background  px-10">
        <div className="w-full max-w-md rounded-xl bg-card p-8">
          {/* Language Switcher */}
          <div className="flex justify-end">
            <LanguageSwitcherAuth />
          </div>
          {/* Top Separator */}
          <ThemeSeparator />
          {/* ---------------------------------------------------- */}
          {/*welcome text*/}
          <WelcomeText />
          {/* ---------------------------------------------------- */}
          <div className=" flex items-center">{children}</div>
          {/* Bottom Separator */}
          <ThemeSeparator />
        </div>
        <div className="my-8 h-px bg-border" />
      </section>

      {/* Image Panel */}
      <section className="hidden lg:block relative w-full h-full min-h-screen ">
        <Image
          src="/assets/images/Cover.png"
          alt="Authentication illustration"
          fill
          priority
          className="object-cover object-center  "
        />
      </section>
    </main>
  );
}
