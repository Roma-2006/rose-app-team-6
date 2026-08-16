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
import Image from 'next/image';
import { TUser } from '@/features/auth/types/user';
import useUpdateProfile from '../../hooks/use-update-profile';
import ProfilePhotoField from './profile-photo-field';
import { ValidationError } from '@/shared/types/api';
import AuthError from '@/features/auth/components/shared/auth-error';
import { toast } from 'sonner';
import useDeleteProfile from '../../hooks/use-delete-profile';
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
  console.log({
    preview,
    userPhoto: user?.photo,
    imageSrc,
  });
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4 items-center">
          <div className="relative w-32 h-32 aspect-square rounded-full ">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="Profile photo"
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full flex items-center justify-center bg-bg-primary text-text-inverse text-3xl font-semibold">
                {user?.firstName?.charAt(0).toUpperCase()}
              </div>
            )}
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 cursor-pointer w-8  h-8 rounded-full bg-zinc-100 border border-border-muted flex justify-center items-center"
            >
              {isUploading ? (
                <LoaderCircle className="animate-spin text-white" size={20} />
              ) : (
                <CloudUpload size={20} />
              )}
            </label>
          </div>
          <ProfilePhotoField setPreview={setPreview} setIsUploading={setIsUploading} />
          <div className="grow ">
            <h2 className="font-semibold text-xl text-text-plain">
              {t('account-settings.profile.upload-photo')}
            </h2>
            <h3 className="text-text-muted text-base font-normal">
              {t('account-settings.profile.upload-photo-description')}{' '}
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-4 my-4">
          <div className="flex gap-5 justify-between ">
            {/* first-name*/}
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="basis-1/2">
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
            {/* last-name */}
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="basis-1/2">
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
          {/* Email */}
          <CustomInput
            value={user.email ?? ''}
            variant="email"
            subVariant="email"
            label={t('account-settings.profile.email')}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
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
              </>
            )}
          />
          {/* gender */}
          <SelectGender value={user?.gender ?? ''} disabled />
        </div>
        <footer className="flex justify-between mt-15">
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger
              render={
                <Button
                  buttonVariant="text"
                  variant="ghost"
                  title="account-settings.profile.delete-my-account"
                  className="text-text-primary"
                />
              }
            />
            <Modal>
              <ClearConfirmation
                onClick={handleDeleteAccount}
                icon={<Trash size={29} />}
                title={t('account-settings.profile.delete-account-confirmation')}
                subTitle={t('account-settings.profile.permanent-warning')}
                cancelButtonTitle="button.cancel"
                confirmButtonTitle="button.confirm"
                loading={deleteLoading}
              />
            </Modal>
          </AlertDialog>
          <Button
            type="submit"
            buttonVariant="text"
            variant="primary"
            title="account-settings.profile.save-changes"
            loading={isPending}
          />
        </footer>
      </form>
    </FormProvider>
  );
}
