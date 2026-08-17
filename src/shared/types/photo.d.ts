import { photoSchema } from '../schemes/photo.schema';

export type PhotoFields = z.infer<typeof photoSchema>;
