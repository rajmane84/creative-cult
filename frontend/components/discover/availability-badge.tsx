import { cn } from '@/lib/cn';

export function AvailabilityBadge({ isAvailable }: { isAvailable: boolean }) {
  return (
    <span
      className={cn(
        'font-mono text-[9px] uppercase font-semibold tracking-[0.08em] px-2.5 py-0.5 flex items-center gap-1.5 whitespace-nowrap border bg-background/95',
        isAvailable ? 'text-[var(--success)]' : 'text-muted-foreground'
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full shrink-0',
          isAvailable ? 'bg-[var(--success)]' : 'bg-muted-foreground/60'
        )}
      />
      {isAvailable ? 'AVAILABLE' : 'BOOKING AHEAD'}
    </span>
  );
}
