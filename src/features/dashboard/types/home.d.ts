import { LucideIcon } from 'lucide-react';

export interface HeroCard {
  image: string;
  href: string;
}

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
