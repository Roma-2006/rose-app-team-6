// import { LanguageSwitcherAuth } from '@/features/auth/components/language-switcher-auth';
// import Image from 'next/image';

// export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <main className="min-h-screen bg-bg-inverse grid lg:grid-cols-[1fr_1.1fr]">
//       {/* Form Panel */}
//       <section className="flex items-center justify-center bg-background px-10">
//         <div className="w-full max-w-md rounded-xl bg-card p-8">
//           {/* Language Switcher */}
//           <div className="flex justify-end">
//             <LanguageSwitcherAuth />
//           </div>
//           {/* Top Separator */}
//           <Image
//             src="/assets/images/separator-1.png"
//             alt="Separator"
//             aria-hidden="true"
//             width={280}
//             height={45}
//             priority
//             className="mx-auto mt-12 mb-10"
//           />
//           {/* ---------------------------------------------------- */}
//           {/*welcome text*/}
//           {/* ---------------------------------------------------- */}
//           <div className=" flex items-center">{children}</div>
//           {/* Bottom Separator */}
//           <Image
//             src="/assets/images/separator-1.png"
//             alt="Separator"
//             aria-hidden="true"
//             width={280}
//             height={45}
//             priority
//             className="mx-auto mt-12 mb-10 rotate-180"
//           />
//         </div>
//         <div className="my-8 h-px bg-border" />
//       </section>

//       {/* Image Panel */}
//       <section className="hidden lg:block relative w-full h-full min-h-screen ">
//         <Image
//           src="/assets/images/Cover.png"
//           alt="Authentication illustration"
//           fill
//           priority
//           className="object-cover object-center  "
