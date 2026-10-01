export type BreadcrumbOverrideItem = {
  label: string;
  href?: string;
};

export type BreadcrumbContextValue = {
  override: BreadcrumbOverrideItem[] | null;
  setOverride: (items: BreadcrumbOverrideItem[] | null) => void;
};
