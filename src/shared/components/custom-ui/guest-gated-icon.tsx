import { Link } from '@/i18n/navigation';
import { Badge } from '@/shared/components/ui/badge';
import { TGuestGatedIconProps } from '@/shared/types/guest-gated-icon';
export default function GuestGatedIcon({
  isAuthenticated,
  children,
  badgeCount,
  type,
}: TGuestGatedIconProps) {
  if (!isAuthenticated) {
    return <Link href="/login">{children}</Link>;
  }
  return (
    <Link
      href={type === 'wishlist' ? '/products/wishlist' : type === 'cart' ? '/products/cart' : ''}
      className="relative"
    >
      {children}
      {badgeCount !== undefined && badgeCount > 0 && (
        <Badge className="absolute -right-3 -top-3">{badgeCount}</Badge>
      )}
    </Link>
  );
}
