import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

type StatusVariant = 'positive' | 'attention' | 'neutral';

interface StatusTagProps {
  label: string;
  icon: LucideIcon;
  variant: StatusVariant;
  className?: string;
}

const VARIANT_CLASS: Record<StatusVariant, string> = {
  positive: 'status-tag--positive',
  attention: 'status-tag--attention',
  neutral: 'status-tag--neutral',
};

export function StatusTag({
  label,
  icon: Icon,
  variant,
  className,
}: StatusTagProps) {
  return (
    <span
      className={cn('status-tag', VARIANT_CLASS[variant], className)}
      title={label}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
