import { Badge } from '@/shared/components/ui/badge';
import { TBaseBadgeProps } from '@/shared/types/base-badge';
export default function BaseBadge({ variant, text = 'badge' }: TBaseBadgeProps) {
  return (
    <Badge className="px-2 py-0.5" variant={variant}>
      {text}
    </Badge>
  );
}
