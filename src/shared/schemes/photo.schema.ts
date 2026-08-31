import z from 'zod';

export const photoSchema = z
  .object({
    photo: z
      .file()
      .min(1)
      .max(2 * 1024 * 1024, 'Image must be under 2MB')
      .mime(['image/png', 'image/jpeg', 'image/gif'], 'Please upload a valid image file'),
  })
  .strict();
