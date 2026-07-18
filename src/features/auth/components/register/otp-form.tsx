<<<<<<< HEAD
// 'use client';

// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import { useTranslations } from 'next-intl';
// import { useState } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from '@/i18n/navigation';
// import { Button } from '@/shared/components/ui/button';
// import OTPVariant from '@/shared/components/ui/otp-variant';

// import { confirmEmailVerification } from '../../apis/confirm-email-verification.api';
// import { sendEmailVerification } from '../../apis/send-email-verification.api';
// import { maskEmail } from '../../utils/mask-email';
// import OTPSection from './otp-timer';
// import Stepper from './stepper';
// import { useForm } from 'react-hook-form';
// import { otpSchema, OtpSchema } from '../../schemas/otp.schema';

// export function OtpForm() {
//   const t = useTranslations();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const email = searchParams.get('email') ?? '';
//   const maskedEmail = maskEmail(email);
=======
'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import OTPVariant from '@/shared/components/ui/otp-variant';
import { confirmEmailVerification } from '../../apis/confirm-email-verification.api';
import { sendEmailVerification } from '../../apis/send-email-verification.api';
import { maskEmail } from '../../utils/mask-email';
import OTPSection from './otp-timer';
import Stepper from './stepper';
import { useForm } from 'react-hook-form';
import { otpSchema, OtpSchema } from '../../schemas/otp.schema';
import { TOtpFormProps } from '../../types/register';

export function OtpForm({ email, setStep }: TOtpFormProps) {
  const t = useTranslations();
  const maskedEmail = maskEmail(email);
>>>>>>> 8486f40392516c240ca68cd3d8817ade7a822c04

//   const [loading, setLoading] = useState(false);
//   const {
//     watch,
//     setValue,
//     setError,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<OtpSchema>({
//     resolver: zodResolver(otpSchema),
//     defaultValues: {
//       otp: '',
//     },
//   });

//   const otp = watch('otp');
//   // Verify OTP
//   const onSubmit = async () => {
//     setLoading(true);

//     try {
//       await confirmEmailVerification({
//         email,
//         code: otp,
//       });

<<<<<<< HEAD
//       router.push(`/register/user-info?email=${encodeURIComponent(email)}`);
//     } catch (err) {
//       setError('otp', {
//         type: 'server',
//         message: err instanceof Error ? err.message : t('auth-register.otp.invalid'),
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
=======
      setStep('user-info');
    } catch (err) {
      let message = t('auth.auth-register.otp.invalid');

      if (err instanceof Error) {
        const status = (err as Error & { status?: number }).status;

        switch (status) {
          case 400:
            message = t('auth.auth-register.otp.invalid');
            break;

          default:
            message = t('common.select.somethingWentWrong');
        }
      }

      setError('otp', {
        type: 'server',
        message,
      });
    } finally {
      setLoading(false);
    }
  };
>>>>>>> 8486f40392516c240ca68cd3d8817ade7a822c04

//   // Resend OTP
//   const handleResendEmail = async (): Promise<boolean> => {
//     try {
//       await sendEmailVerification({
//         email,
//       });

<<<<<<< HEAD
//       // setError('');
//       return true;
//     } catch (err) {
//       if (err instanceof Error) {
//         setError('otp', { type: 'server', message: err.message });
//       } else {
//         // setError(t('auth.auth-register.otp.invalid'));
//         setError('otp', {
//           type: 'server',
//           message: t('auth.auth-register.otp.invalid'),
//         });
//       }

//       return false;
//     }
//   };

//   return (
//     <div className="mx-auto w-full max-w-md">
//       <hr className=" mb-7 border-border-muted " />
//       {/* Stepper */}
//       <Stepper currentStep={2} />

//       {/* Title */}
//       <div className="mb-3">
//         <h1 className="text-[30px] font-bold text-zinc-800">{t('auth.auth-register.title')}</h1>
=======
      localStorage.setItem('otp-resend-end-time', (Date.now() + 60 * 1000).toString());

      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError('otp', {
          type: 'server',
          message: err.message,
        });
      } else {
        setError('otp', {
          type: 'server',
          message: t('auth.auth-register.otp.invalid'),
        });
      }
      return false;
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Stepper */}
      <Stepper currentStep={2} />

      {/* Title */}
      <div className="mb-3">
        <h1 className="text-[30px] font-bold text-text-inverse">{t('auth.auth-register.title')}</h1>
>>>>>>> 8486f40392516c240ca68cd3d8817ade7a822c04

//         <h2 className="text-[20px] font-bold text-text-primary">
//           {t('auth.auth-register.otp.subtitle-1')}
//         </h2>

<<<<<<< HEAD
//         <p className="mt-2 text-sm text-text-plain">
//           {t('auth.auth-register.otp.subtitle-2', { email: maskedEmail })}{' '}
//           <Link
//             href="/register"
//             className="font-medium text-blue-400 hover:underline dark:text-blue-700"
//           >
//             {t('auth.auth-register.otp.Edit')}
//           </Link>
//         </p>
//       </div>

//       <hr className=" mb-7 border-border-muted " />
=======
        <p className="mt-2 text-sm text-text-plain">
          {t('auth.auth-register.otp.subtitle-2', { email: maskedEmail })}{' '}
          <button
            type="button"
            onClick={() => setStep('register')}
            className="font-medium text-text-info hover:underline cursor-pointer"
          >
            {t('auth.auth-register.otp.Edit')}
          </button>
        </p>
      </div>

      <hr className="mb-7 border-border-muted" />
>>>>>>> 8486f40392516c240ca68cd3d8817ade7a822c04

//       {/* OTP */}
//       <div className="my-10 flex flex-col items-center">
//         <OTPVariant
//           value={otp}
//           onChange={(value) =>
//             setValue('otp', value, {
//               shouldValidate: true,
//             })
//           }
//         />

<<<<<<< HEAD
//         {errors.otp && (
//           <p className="mt-2 text-center text-sm text-red-500">{errors.otp.message}</p>
//         )}
//       </div>
=======
        {errors.otp && (
          <p className="mt-2 text-center text-sm text-text-danger">{errors.otp.message}</p>
        )}
      </div>
>>>>>>> 8486f40392516c240ca68cd3d8817ade7a822c04

//       {/* Resend */}
//       <div className="mb-2 flex justify-end">
//         <OTPSection onResend={handleResendEmail} />
//       </div>

//       {/* Verify */}
//       <Button
//         type="button"
//         buttonVariant="text"
//         variant="primary"
//         title="auth.auth-register.otp.verify"
//         className="h-12 w-full"
//         onClick={handleSubmit(onSubmit)}
//         disabled={loading}
//       />

<<<<<<< HEAD
//       <hr className="mb-7  border-border-muted" />
=======
      <hr className="mb-7 border-border-muted" />
>>>>>>> 8486f40392516c240ca68cd3d8817ade7a822c04

//       {/* Footer */}
//       <div className="text-center text-sm">
//         <span className="text-text-plain">{t('auth.auth-register.need-help')} </span>

//         <Link href="/contact" className="font-semibold text-text-primary hover:underline">
//           {t('auth.auth-register.contact-us')}
//         </Link>
//       </div>
//     </div>
//   );
// }
