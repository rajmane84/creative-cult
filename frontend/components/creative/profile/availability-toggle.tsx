'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AvailabilityStatus } from '@/types';
import {
  Check,
  ChevronDown,
  Sparkles,
  Clock,
  Slash,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useUpdateAvailability } from '@/hooks/creative/profile/use-update-availability';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

interface AvailabilityToggleProps {
  currentStatus: AvailabilityStatus | string;
  onStatusChange?: (newStatus: AvailabilityStatus) => void;
  className?: string;
}

const STATUS_CONFIG: Record<
  AvailabilityStatus,
  {
    label: string;
    description: string;
    icon: typeof Sparkles;
    badgeClasses: string;
    dotClasses: string;
  }
> = {
  [AvailabilityStatus.AVAILABLE]: {
    label: 'Available for Work',
    description: 'Open for freelance, contract, or full-time roles',
    icon: Sparkles,
    badgeClasses:
      'bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/15',
    dotClasses: 'bg-green-500 animate-pulse',
  },
  [AvailabilityStatus.BUSY]: {
    label: 'Currently Booked',
    description: 'Busy with active projects, limited availability',
    icon: Clock,
    badgeClasses:
      'bg-orange-500/10 text-orange-600 border-amber-500/30 hover:bg-orange-500/15',
    dotClasses: 'bg-orange-500',
  },
  [AvailabilityStatus.NOT_AVAILABLE]: {
    label: 'Not Available',
    description: 'Not taking new project inquiries',
    icon: Slash,
    badgeClasses:
      'bg-muted/80 text-muted-foreground border-border hover:bg-muted',
    dotClasses: 'bg-muted-foreground/60',
  },
};

export default function AvailabilityToggle({
  currentStatus: initialStatus,
  onStatusChange,
  className,
}: AvailabilityToggleProps) {
  const [status, setStatus] = useState<AvailabilityStatus>(
    (initialStatus as AvailabilityStatus) || AvailabilityStatus.AVAILABLE
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (initialStatus) {
      setStatus(initialStatus as AvailabilityStatus);
    }
  }, [initialStatus]);

  const { updateAvailabilityMutation } = useUpdateAvailability({
    onSuccess: (_, variables) => {
      onStatusChange?.(variables.availability);
    },
  });

  const activeConfig =
    STATUS_CONFIG[status] || STATUS_CONFIG[AvailabilityStatus.AVAILABLE];
  const isUpdating = updateAvailabilityMutation.isPending;

  const handleSelect = (newStatus: AvailabilityStatus) => {
    if (newStatus === status || isUpdating) {
      return;
    }

    updateAvailabilityMutation.mutate(
      { availability: newStatus },
      {
        onSuccess: () => {
          setStatus(newStatus);
          toast.success(
            `Availability updated to "${STATUS_CONFIG[newStatus].label}"`
          );
          onStatusChange?.(newStatus);
        },
      }
    );
  };

  return (
    <div className={cn('inline-block text-left', className)}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          disabled={isUpdating}
          className={cn(
            'group flex items-center gap-2.5 px-3 py-1.5 border transition-all duration-200 font-mono text-xs uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-md cursor-pointer select-none',
            activeConfig.badgeClasses,
            isUpdating && 'opacity-70 cursor-wait'
          )}
        >
          {isUpdating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
          ) : (
            <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
              <span
                className={cn(
                  'absolute inline-flex h-full w-full rounded-full opacity-75',
                  activeConfig.dotClasses
                )}
              />
              <span
                className={cn(
                  'relative inline-flex h-1.5 w-1.5 rounded-full',
                  activeConfig.dotClasses.split(' ')[0]
                )}
              />
            </span>
          )}

          <span className="font-semibold">{activeConfig.label}</span>

          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 opacity-60 transition-transform duration-200 group-hover:opacity-100 shrink-0 ml-0.5',
              isOpen && 'rotate-180'
            )}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="w-72 rounded-xl border border-border/80 bg-card/95 backdrop-blur-md p-1.5 shadow-xl ring-1 ring-black/5 z-50"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className=" py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              / Set Availability Status
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator className="my-1 bg-border/50" /> */}

            <div className="space-y-1">
              {(Object.keys(STATUS_CONFIG) as AvailabilityStatus[]).map(
                (key) => {
                  const cfg = STATUS_CONFIG[key];
                  const Icon = cfg.icon;
                  const isSelected = key === status;

                  return (
                    <DropdownMenuItem
                      key={key}
                      disabled={isUpdating}
                      onClick={() => handleSelect(key)}
                      className={cn(
                        'w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-colors cursor-pointer focus:bg-muted/70 group',
                        isSelected
                          ? 'bg-muted/60 text-foreground font-medium'
                          : 'text-foreground/80 hover:bg-muted/40'
                      )}
                    >
                      <div
                        className={cn(
                          'p-1.5 rounded-md shrink-0 mt-0.5 border',
                          cfg.badgeClasses
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                            {cfg.label}
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-primary shrink-0 selection:text-background selection:bg-primary" />
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug font-sans">
                          {cfg.description}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  );
                }
              )}
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
