'use client';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/features/auth/schemes/reset-password.schema';
import { resetPasswordAction } from '@/features/auth/apis/forgotpass.api';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import * as z from 'zod';

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    if (!token) {
      toast.error('Invalid or missing token');
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetPasswordAction({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      if (res.status) {
        toast.success(t('auth-forgotPw.step3.successToast'));
        router.push('/login');
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-zinc-900 mb-2">
          {t('auth-forgotPw.step3.title')}
        </h1>
        <p className="text-zinc-500 text-sm leading-relaxed">{t('auth-forgotPw.step3.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* New Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">
            {t('auth-forgotPw.step3.passwordLabel')}
          </label>
          <div className="relative">
            <Input
              {...register('newPassword')}
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              aria-invalid={!!errors.newPassword}
              className="pr-10" // إضافة padding جهة اليمين لكي لا يغطي النص الأيقونة
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              {t(`auth-forgotPw.errors.${errors.newPassword.message}`)}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">
            {t('auth-forgotPw.step3.confirmPasswordLabel')}
          </label>
          <div className="relative">
            <Input
              {...register('confirmPassword')}
              type={showConfirmPass ? 'text' : 'password'} // جعل النوع ديناميكي أيضاً
              placeholder="••••••••"
              aria-invalid={!!errors.confirmPassword}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {t(`auth-forgotPw.errors.${errors.confirmPassword.message}`)}
            </p>
          )}
        </div>

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          title="auth-forgotPw.step3.reset"
          loading={isLoading}
          className="w-full h-12 mt-4"
        />
      </form>
    </div>
  );
};
