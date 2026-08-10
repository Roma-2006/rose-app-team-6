import { Link } from '@/i18n/navigation';
import { Badge } from '@/shared/components/ui/badge';
import { TGuestGatedIconProps } from '@/shared/types/guest-gated-icon';

export default function GuestGatedIcon({
  isAuthenticated,
  children,
  badgeCount,
}: TGuestGatedIconProps) {
  if (!isAuthenticated) {
    return (
      <Link href="/login" className="relative">
        {children}

        {badgeCount !== undefined && badgeCount > 0 && (
          <Badge className="absolute -right-3 -top-3">{badgeCount}</Badge>
        )}
      </Link>
    );
  }

  return (
    <span className="relative">
      {children}

      {badgeCount !== undefined && badgeCount > 0 && (
        <Badge className="absolute -right-3 -top-3">{badgeCount}</Badge>
      )}
    </span>
  );
}
