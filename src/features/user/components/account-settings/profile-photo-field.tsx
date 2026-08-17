import CustomInput from '@/shared/components/custom-input';
import { photoSchema } from '@/shared/schemes/photo.schema';
import { PhotoFields } from '@/shared/types/photo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { useRef } from 'react';
import useUploadPhoto from '@/shared/hooks/use-upload-photo';
import { ProfileFields, ProfilePhotoFieldProps } from '../../types/profile';
import AuthError from '@/features/auth/components/shared/auth-error';
import { useState } from 'react';
export default function ProfilePhotoField({ setPreview, setIsUploading }: ProfilePhotoFieldProps) {
  //State
  const [uploadError, setUploadError] = useState<string | undefined>();
  //Mutation
  const { mutate: uploadPhoto, isPending } = useUploadPhoto();
  //Refs
  const inputRef = useRef<HTMLInputElement>(null);
  //Form
  const profileForm = useFormContext<ProfileFields>();
  const form = useForm<PhotoFields>({
    resolver: zodResolver(photoSchema),
    mode: 'onChange',
  });
  useEffect(() => {
    const unSubscribe = form.subscribe({
      formState: {
        values: true,
        isValid: true,
      },
      name: 'photo',
      callback: ({ values, isValid }) => {
        if (isValid) {
          setIsUploading(true);
          uploadPhoto(values, {
            onError: (error) => {
              setIsUploading(false);
              setUploadError(error.message);
            },
            onSuccess: (data) => {
              setIsUploading(false);
              if (data.status && data.payload) {
                setUploadError(undefined);
                const url = data.payload.url;
                profileForm.setValue('photo', url, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              }
            },
          });
        }
      },
    });
    return () => unSubscribe();
  }, [form, profileForm, uploadPhoto, setPreview]);
  console.log(form.formState.errors);
  return (
    <Controller
      name="photo"
      control={form.control}
      render={({ fieldState, field: { onChange, ...field } }) => (
        <>
          <CustomInput
            ref={inputRef}
            id="profile-image"
            type="file"
            variant="file"
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            aria-invalid={fieldState.invalid}
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              onChange(file);
              setPreview(URL.createObjectURL(file));
            }}
            error={fieldState.invalid || !!uploadError}
          />
          {(fieldState.error || uploadError) && (
            <AuthError
              zodError={fieldState.error?.message}
              beError={uploadError}
              namespace="account-settings.profile"
            />
          )}
        </>
      )}
    />
  );
}
