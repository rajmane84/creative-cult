'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Mail, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CultInvite } from '@/types/creative/cult';

interface CultInviteCardProps {
  invite: CultInvite;
  onRespond: (inviteId: string, action: 'ACCEPT' | 'DECLINE') => void;
  isResponding?: boolean;
}

export function CultInviteCard({
  invite,
  onRespond,
  isResponding = false,
}: CultInviteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border bg-card p-5 md:p-6 transition-all hover:border-foreground"
    >
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center border border-border bg-background text-primary selection:text-background selection:bg-primary">
          <Mail className="size-5" />
        </div>

        <div className="space-y-1">
          <h4 className="font-editorial text-xl font-bold tracking-tight text-foreground">
            Invite from{' '}
            <span className="text-primary selection:text-background selection:bg-primary">
              {invite.cultName}
            </span>
          </h4>
          <p className="font-body text-xs text-muted-foreground flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-primary selection:text-background selection:bg-primary animate-pulse" />
            <span>Pending your response</span>
            {invite.inviterName && (
              <>
                <span className="text-border">•</span>
                <span>From {invite.inviterName}</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-center shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
        <Button
          variant="secondary"
          size="sm"
          disabled={isResponding}
          onClick={() => onRespond(invite.id, 'DECLINE')}
          className="w-1/2 sm:w-auto cursor-pointer gap-1.5 text-foreground hover:bg-muted"
        >
          <X className="size-3.5" />
          <span>Decline</span>
        </Button>

        <Button
          variant="default"
          size="sm"
          disabled={isResponding}
          onClick={() => onRespond(invite.id, 'ACCEPT')}
          className="w-1/2 sm:w-auto cursor-pointer gap-1.5"
        >
          <Check className="size-3.5" />
          <span>Accept</span>
        </Button>
      </div>
    </motion.div>
  );
}
