// "use client";
// import { useTranslations } from 'next-intl';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { resetPasswordSchema } from '@/features/auth/schemes/auth-schemas'
// import { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';

// import { Button } from '@/shared/components/ui/button';

// export const ResetPasswordForm = () => {
//   const t = useTranslations('auth.forgotPw');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(resetPasswordSchema)
//   });

//   const onSubmit = async (data: any) => {

//     setIsLoading(false);
//   };

//   return (
//     <div className="w-full">
//       <div className="mb-8">
//         <h1 className="text-[28px] font-bold text-zinc-900 mb-2">{t('step3.title')}</h1>
//         <p className="text-zinc-500 text-sm leading-relaxed">{t('step3.subtitle')}</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-zinc-700">{t('step3.passwordLabel')}</label>
//           <div className="relative">
//             <input
//               {...register("password")}
//               type={showPassword ? "text" : "password"}
//               className="w-full px-4 py-3 rounded-lg border border-zinc-200"
//             />
//             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           {errors.password && <p className="text-destructive text-xs">{t(`errors.${errors.password.message}`)}</p>}
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium text-zinc-700">{t('step3.confirmPasswordLabel')}</label>
//           <div className="relative">
//             <input
//               {...register("confirmPassword")}
//               type={showConfirmPassword ? "text" : "password"}
//               className="w-full px-4 py-3 rounded-lg border border-zinc-200"
//             />
//             <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
//               {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           {errors.confirmPassword && <p className="text-destructive text-xs">{t(`errors.${errors.confirmPassword.message}`)}</p>}
//         </div>

//         {/* استخدام الـ Button الخاص بك */}
//         <Button
//           type="submit"
//           buttonVariant="text"
//           variant="primary"
//           title="auth.forgotPw.step3.reset" // Key الترجمة
//           loading={isLoading}
//           className="w-full h-12 mt-4"
//         />
//       </form>

//       <div className="mt-8 text-center text-sm">
//         <span className="text-zinc-500">{t('step3.footerText')} </span>
//         <button className="text-text-primary font-bold hover:underline">
//           {t('step3.contactLink')}
//         </button>
//       </div>
//     </div>
//   );
// };
