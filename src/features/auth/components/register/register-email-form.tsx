// 'use client';

// import { useTranslations, useLocale } from 'next-intl';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { RegisterEmailSchema } from '@/features/auth/schemas/register-email.schema';

<<<<<<< HEAD:src/features/auth/components/register/register-email-from.tsx
// import { Button } from '@/shared/components/ui/button';
// import CustomInput from '@/shared/components/custom-input';
// import ErrorAlert from '@/shared/components/error-alert';
// import { useState } from 'react';
// import * as z from 'zod';
// import Link from 'next/link';
// import { useRouter } from '@/i18n/navigation';
// import { useRegisterEmail } from '../../hooks/useRegisterEmail';

// export const RegisterEmailForm = () => {
//   const t = useTranslations('auth.auth-register');
//   const locale = useLocale();
//   const isRtl = locale === 'ar';
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
=======
import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-input';
import { useState } from 'react';
import * as z from 'zod';
import Link from 'next/link';

import { useRegisterEmail } from '../../hooks/useRegisterEmail';
import AuthError from '../shared/auth-error';
import { TRegisterEmailFormProps } from '../../types/register';

export const RegisterEmailForm = ({ setEmail, setStep, verifyError }: TRegisterEmailFormProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [isLoading, setIsLoading] = useState(false);
>>>>>>> 8486f40392516c240ca68cd3d8817ade7a822c04:src/features/auth/components/register/register-email-form.tsx

//   const registerEmailMutation = useRegisterEmail();
//   type RegisterEmailValues = z.infer<typeof RegisterEmailSchema>;

<<<<<<< HEAD:src/features/auth/components/register/register-email-from.tsx
//   const { control, handleSubmit, setError } = useForm<RegisterEmailValues>({
//     resolver: zodResolver(RegisterEmailSchema),
//     mode: 'onTouched',
//     reValidateMode: 'onTouched',
//     defaultValues: {
//       email: '',
//     },
//   });

//   const onSubmit = async (data: RegisterEmailValues) => {
//     setIsLoading(true);
//     try {
//       const res = await registerEmailMutation.mutateAsync(data.email);

//       if (res?.status) {
//         router.push(`/register/otp?email=${encodeURIComponent(data.email)}`);
//       }
//     } catch (err) {
//       type ApiErrorLike = {
//         message?: string;
//         response?: { message?: string };
//       };

//       const apiMessage =
//         err instanceof Error
//           ? err.message
//           : ((err as ApiErrorLike)?.response?.message ?? (err as ApiErrorLike)?.message ?? '');

//       if (apiMessage?.toLowerCase().includes('no account') || apiMessage?.includes('حساب')) {
//         setError('email', {
//           type: 'server',
//           message: 'noAccount',
//         });
//       } else {
//         setError('email', {
//           type: 'server',
//           message: 'noAccount',
//         });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <hr className="w-full border-0 border-t border-border-muted dark:border-border-soft" />
//       <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
//         <div className="space-y-2">
//           <Controller
//             name="email"
//             control={control}
//             render={({ field, fieldState }) => {
//               const errorMessageKey = fieldState.error?.message;
//               const translatedMessage = errorMessageKey
//                 ? t(`errors.${errorMessageKey}`)
//                 : undefined;

//               return (
//                 <>
//                   <CustomInput
//                     id="email"
//                     variant="email"
//                     label={t('step1.emailLabel')}
//                     placeholder={t('step1.emailPlaceholder')}
//                     error={fieldState.invalid}
//                     errorMessage={translatedMessage}
//                     isRtl={isRtl}
//                     {...field}
//                   />

//                   {fieldState.error && (
//                     <ErrorAlert errorMessage={translatedMessage ?? ''} isRtl={isRtl} />
//                   )}
//                 </>
//               );
//             }}
//           />
//         </div>
=======
  const { control, handleSubmit, setError } = useForm<RegisterEmailValues>({
    resolver: zodResolver(RegisterEmailSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: RegisterEmailValues) => {
    setIsLoading(true);
    try {
      const res = await registerEmailMutation.mutateAsync(data.email);
      console.log(res);
      if (res?.status) {
        setEmail(data.email);
        setStep('otp');
        const getEndTime = () => Date.now() + 60 * 1000;
        localStorage.setItem('otp-resend-end-time', getEndTime().toString());
      }
    } catch (err) {
      type ApiErrorLike = {
        message?: string;
        response?: { message?: string };
      };

      const apiMessage =
        err instanceof Error
          ? err.message
          : ((err as ApiErrorLike)?.message ?? (err as ApiErrorLike)?.response?.message) || '';

      const normalizedMessage = apiMessage.toLowerCase();

      if (normalizedMessage.includes('no account')) {
        setError('email', {
          message: 'step1.errors.no-account',
        });
      } else if (normalizedMessage.includes('registered')) {
        setError('email', {
          message: 'step1.errors.email-already-registered',
        });
      } else {
        setError('email', {
          message: 'step1.errors.something-went-wrong',
        });
        console.log(normalizedMessage, apiMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => {
              const hasError = fieldState.invalid || !!verifyError;
              return (
                <>
                  <CustomInput
                    id="email"
                    variant="email"
                    label={t('auth.auth-register.step1.emailLabel')}
                    placeholder={t('auth.auth-register.step1.emailPlaceholder')}
                    error={hasError}
                    isRtl={isRtl}
                    {...field}
                  />

                  {/* {errorMessage && <AuthError beError={errorMessage} />} */}
                  {(fieldState.error || verifyError) && (
                    <AuthError zodError={fieldState.error?.message} beError={verifyError} />
                  )}
                </>
              );
            }}
          />
        </div>
>>>>>>> 8486f40392516c240ca68cd3d8817ade7a822c04:src/features/auth/components/register/register-email-form.tsx

//         <Button
//           type="submit"
//           buttonVariant="text"
//           variant="primary"
//           title="auth.auth-register.step1.continue"
//           loading={isLoading}
//           className="h-12 w-full transition-all"
//         />
//       </form>

//       <hr className="mt-9 w-full border-0 border-t border-border-muted dark:border-border-soft" />

<<<<<<< HEAD:src/features/auth/components/register/register-email-from.tsx
//       <div className="mt-8 text-center text-sm">
//         <span className="text-text-plain dark:text-text-plain">{t('step1.footerText')} </span>

//         <Link
//           href="/login"
//           className="font-bold text-text-primary transition-colors hover:underline dark:text-text-primary"
//         >
//           {t('step1.registerLink')}
//         </Link>
//       </div>
//     </div>
//   );
// };
=======
      <div className="mt-8 text-center text-sm">
        <span className="text-text-plain dark:text-text-plain">
          {t('auth.auth-register.step1.footerText')}{' '}
        </span>

        <Link
          href="/login"
          className="font-bold text-text-primary transition-colors hover:underline dark:text-text-primary"
        >
          {t('auth.auth-register.step1.registerLink')}
        </Link>
      </div>
    </div>
  );
};
>>>>>>> 8486f40392516c240ca68cd3d8817ade7a822c04:src/features/auth/components/register/register-email-form.tsx
