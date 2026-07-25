'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CultInvite } from '@/types/creative/cult';

interface CultInviteCardProps {
  invite: CultInvite;
  onRespond: (inviteId: string, action: 'ACCEPT' | 'DECLINE') => void;
  isResponding?: boolean;
  activeAction?: 'ACCEPT' | 'DECLINE';
}

export function CultInviteCard({
  invite,
  onRespond,
  isResponding = false,
  activeAction,
}: CultInviteCardProps) {
  const [selectedAction, setSelectedAction] = useState<
    'ACCEPT' | 'DECLINE' | null
  >(null);

  const currentAction = activeAction || selectedAction;
  const isAccepting = isResponding && currentAction === 'ACCEPT';
  const isDeclining = isResponding && currentAction === 'DECLINE';

  const handleAction = (action: 'ACCEPT' | 'DECLINE') => {
    setSelectedAction(action);
    onRespond(invite.id, action);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: selectedAction === 'ACCEPT' ? 60 : -60,
        scale: 0.94,
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        overflow: 'hidden',
        transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
      }}
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border bg-card p-5 md:p-6 transition-colors overflow-hidden ${
        isAccepting
          ? 'bg-emerald-500/5 border-emerald-500/40'
          : isDeclining
            ? 'bg-destructive/5 border-destructive/40'
            : 'hover:border-foreground'
      }`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex size-12 shrink-0 items-center justify-center border border-border bg-background text-primary selection:text-background selection:bg-primary">
          <Mail className="size-5" />
        </div>

        <div className="space-y-1 min-w-0">
          <h4 className="font-editorial text-xl font-bold tracking-tight text-foreground truncate">
            Invite from{' '}
            <span className="text-primary selection:text-background selection:bg-primary">
              {invite.cultName}
            </span>
          </h4>
          <p className="font-body text-xs text-muted-foreground flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-primary selection:text-background selection:bg-primary animate-pulse" />
            <span>
              {isAccepting
                ? 'Joining cult...'
                : isDeclining
                  ? 'Declining invite...'
                  : 'Pending your response'}
            </span>
            {invite.inviterName && (
              <>
                <span className="text-border">•</span>
                <span className="truncate">From {invite.inviterName}</span>
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
          onClick={() => handleAction('DECLINE')}
          className="w-1/2 sm:w-auto cursor-pointer gap-1.5 text-foreground hover:bg-muted"
        >
          {isDeclining ? (
            <Loader2 className="size-3.5 animate-spin text-destructive" />
          ) : (
            <X className="size-3.5" />
          )}
          <span>{isDeclining ? 'Declining...' : 'Decline'}</span>
        </Button>

        <Button
          variant="default"
          size="sm"
          disabled={isResponding}
          onClick={() => handleAction('ACCEPT')}
          className="w-1/2 sm:w-auto cursor-pointer gap-1.5"
        >
          {isAccepting ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Check className="size-3.5" />
          )}
          <span>{isAccepting ? 'Accepting...' : 'Accept'}</span>
        </Button>
      </div>
    </motion.div>
  );
}
