export type SidebarNavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
    size?: number;
  }>;
};

export type SidebarMobileNavProps = {
  items: SidebarNavItem[];
  activeHref: string;
  logoSrc?: string;
  logoAlt?: string;
  onLogoClick?: () => void;
  className?: string;
} & Omit<React.ComponentProps<'nav'>, 'className'>;
