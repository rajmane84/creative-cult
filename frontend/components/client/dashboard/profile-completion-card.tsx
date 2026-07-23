'use client';

import * as React from 'react';
import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import {
  ActionCard,
  ActionCardHeader,
  ActionCardIcon,
  ActionCardEyebrow,
  ActionCardTitle,
  ActionCardDescription,
  ActionCardMedia,
  ActionCardFooter,
} from '@/components/ui/action-card';

interface ProfileCompletePercentageSvgProps extends React.ComponentProps<'svg'> {
  percentage?: number;
}

function ProfileCompletePercentageSvg({
  percentage = 0,
  className,
  ...props
}: ProfileCompletePercentageSvgProps) {
  return (
    <svg
      className={cn('w-10 h-10 -rotate-90', className)}
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        className="text-muted/40"
        strokeWidth="3"
        stroke="currentColor"
        fill="none"
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        className="text-primary selection:text-background selection:bg-primary"
        strokeDasharray={`${percentage}, 100`}
        strokeWidth="3"
        strokeLinecap="square"
        stroke="currentColor"
        fill="none"
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
    </svg>
  );
}

interface ProfileCompletionCardProps {
  completedSteps?: number;
  totalSteps?: number;
}

export function ProfileCompletionCard({
  completedSteps = 0,
  totalSteps = 5,
}: ProfileCompletionCardProps) {
  const percentage = Math.round((completedSteps / totalSteps) * 100);

  return (
    <ActionCard>
      <ActionCardHeader>
        <div className="flex items-start gap-4">
          <ActionCardIcon icon={Building2} />
          <div className="space-y-1">
            <ActionCardEyebrow>Setup Action</ActionCardEyebrow>
            <ActionCardTitle>
              Complete your company profile to post your first listing
            </ActionCardTitle>
            <ActionCardDescription>
              Add a few more details to build trust and attract the right
              creatives.
            </ActionCardDescription>
          </div>
        </div>

        <ActionCardMedia>
          <div className="relative w-14 h-14 flex items-center justify-center border border-border bg-background">
            <ProfileCompletePercentageSvg percentage={percentage} />
            <span className="absolute font-mono text-xs font-bold text-foreground">
              {completedSteps}/{totalSteps}
            </span>
          </div>
        </ActionCardMedia>
      </ActionCardHeader>

      <ActionCardFooter>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Progress:{' '}
          <span className="text-foreground font-semibold">
            {percentage}% Completed
          </span>
        </div>
        <Link href="/dashboard/client/profile" className="cursor-pointer">
          <Button variant="secondary" size="sm">
            <span>Complete Profile</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </Link>
      </ActionCardFooter>
    </ActionCard>
  );
}
