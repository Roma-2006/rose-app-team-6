'use client';

import ClearConfirmation from '@/shared/components/custom-ui/clear-confirmation';
import Modal from '@/shared/components/custom-ui/modal';
import { AlertDialog, AlertDialogTrigger } from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';
import { Trash, CloudUpload, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { profileSchema } from '../../schemas/profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileFields } from '../../types/profile';
import CustomInput from '@/shared/components/custom-input';
import SelectGender from '@/shared/components/custom-ui/select-gender';
import { TUser } from '@/features/auth/types/user';
import useUpdateProfile from '../../hooks/use-update-profile';
import ProfilePhotoField from './profile-photo-field';
import { ValidationError } from '@/shared/types/api';
import AuthError from '@/features/auth/components/shared/auth-error';
import { toast } from 'sonner';
import useDeleteProfile from '../../hooks/use-delete-profile';
import Avatar from '@/shared/components/custom-ui/avatar';
import Link from 'next/link';

export default function ProfileView({ user }: { user: TUser }) {
  //Translations
  const t = useTranslations();
  //State
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const getBackendError = (path: string) => errors.find((err) => err.path === path)?.message;
  //mutation
  const { mutate: updateProfile, isPending } = useUpdateProfile(setErrors);
  const { mutate: deleteProfile, isPending: deleteLoading } = useDeleteProfile();
  const imageSrc = preview || user?.photo;

  //Form
  const form = useForm<ProfileFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      photo: '',
      phone: '',
    },
  });

  //Functions
  const onSubmit: SubmitHandler<ProfileFields> = (values) => {
    if (!form.formState.isDirty) {
      toast.warning(t('account-settings.profile.no-changes'));
      return;
    }
    setErrors([]);
    updateProfile(values);
  };

  const handleDeleteAccount = () => {
    deleteProfile(undefined, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  };

  useEffect(() => {
    if (!user || form.formState.isDirty) return;
    form.reset({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      photo: user.photo ?? '',
      phone: user.phone ?? '',
    });
  }, [user]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Photo Upload Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 aspect-square rounded-full shrink-0">
            <Avatar src={imageSrc} alt="Profile photo" fallback={user?.firstName} size={112} />
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 cursor-pointer w-8 h-8 rounded-full bg-zinc-100 border border-border-muted flex justify-center items-center shadow-sm"
            >
              {isUploading ? (
                <LoaderCircle className="animate-spin text-gray-600" size={18} />
              ) : (
                <CloudUpload size={18} className="text-gray-700" />
              )}
            </label>
          </div>
          <ProfilePhotoField setPreview={setPreview} setIsUploading={setIsUploading} />
          <div className="grow">
            <h2 className="font-semibold text-lg sm:text-xl text-text-plain">
              {t('account-settings.profile.upload-photo')}
            </h2>
            <p className="text-text-muted text-sm sm:text-base font-normal mt-1">
              {t('account-settings.profile.upload-photo-description')}
            </p>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="flex flex-col gap-4">
          {/* Name Fields: 1 column on mobile, 2 columns on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <CustomInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    variant="default"
                    subVariant="first-name"
                    label={t('account-settings.profile.first-name')}
                    error={fieldState.invalid || !!getBackendError('firstName')}
                  />
                  {(fieldState.error || getBackendError('firstName')) && (
                    <AuthError
                      zodError={fieldState.error?.message}
                      beError={getBackendError('firstName')}
                      namespace="account-settings.profile"
                    />
                  )}
                </div>
              )}
            />

            {/* Last Name */}
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <CustomInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    variant="default"
                    subVariant="last-name"
                    label={t('account-settings.profile.last-name')}
                    error={fieldState.invalid || !!getBackendError('lastName')}
                  />
                  {(fieldState.error || getBackendError('lastName')) && (
                    <AuthError
                      zodError={fieldState.error?.message}
                      beError={getBackendError('lastName')}
                      namespace="account-settings.profile"
                    />
                  )}
                </div>
              )}
            />
          </div>

          {/* Email Field */}
          <CustomInput
            value={user?.email ?? ''}
            variant="email"
            subVariant="email"
            label={t('account-settings.profile.email')}
            disabled
          />

          {/* Phone Field */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <CustomInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  variant="phone"
                  subVariant="phone"
                  label={t('account-settings.profile.phone')}
                  error={fieldState.invalid || !!getBackendError('phone')}
                />
                {(fieldState.error || getBackendError('phone')) && (
                  <AuthError
                    zodError={fieldState.error?.message}
                    beError={getBackendError('phone')}
                    namespace="account-settings.profile"
                  />
                )}
              </div>
            )}
          />

          {/* Gender Select */}
          <SelectGender value={user?.gender ?? ''} disabled />
        </div>

        {/* Footer Actions */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger
                render={
                  <Button
                    buttonVariant="text"
                    variant="ghost"
                    title="account-settings.profile.delete-my-account"
                    className="text-red-600 p-0 hover:bg-transparent hover:underline"
                  />
                }
              />
              <Modal>
                <ClearConfirmation
                  onClick={handleDeleteAccount}
                  icon={<Trash size={29} />}
                  title={t('account-settings.profile.delete-account-confirmation')}
                  subTitle={t('account-settings.profile.permanent-warning')}
                  cancelButtonTitle="button.account-cancel"
                  confirmButtonTitle="button.account-confirm"
                  loading={deleteLoading}
                />
              </Modal>
            </AlertDialog>

            <Link
              href="/dashboard/account?tab=password"
              className="text-sm font-semibold text-gray-700 hover:underline sm:hidden"
            >
              {t('account-settings.change-password.title') || 'Change Password'}
            </Link>
          </div>

          <Button
            type="submit"
            buttonVariant="text"
            variant="primary"
            title="account-settings.profile.save-changes"
            loading={isPending}
            className="w-full sm:w-auto px-8"
          />
        </footer>
      </form>
    </FormProvider>
  );
}
