import z from 'zod';
import { profileSchema } from '../schemas/profile.schema';
//AccountPage
export type AccountPageProps = {
  searchParams: Promise<{ tab?: string }>;
};
//Sidebar
export type AccountSidebarProps = {
  activeTab: 'profile' | 'password';
  onLogout?: () => void;
};
export type NavItem = {
  id: 'profile' | 'password';
  title: string;
  leftIcon: React.ReactNode;
  href: string;
};
export type ProfileFields = z.infer<typeof profileSchema>;
export interface ProfilePhotoFieldProps {
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
  setIsUploading: (value: boolean) => void;
}
