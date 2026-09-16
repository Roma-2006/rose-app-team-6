import { useMutation } from '@tanstack/react-query';
import uploadPhotoAction from '../actions/upload-photo.action';
import { PhotoFields } from '../types/photo';

export default function useUploadPhoto() {
  return useMutation({
    mutationFn: (fields: PhotoFields) => {
      const formData = new FormData();
      formData.append('image', fields.photo);
      return uploadPhotoAction(formData);
    },
    onSuccess: (data) => {
      console.log(data, 'upload success');
    },
  });
}
