'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Inbox } from 'lucide-react';
import { useCults, useRespondInvite } from '@/hooks/creative/cult';
import {
  CultHeader,
  CultCard,
  CultInviteCard,
} from '@/components/creative/cult';

export default function CultsPage() {
  const { cults, invites, isLoadingCults } = useCults();
  const { respondToInvite, isResponding } = useRespondInvite();

  const handleRespond = (inviteId: string, action: 'ACCEPT' | 'DECLINE') => {
    respondToInvite({ inviteId, action });
  };

  return (
    <div className="w-full bg-background">
      <div className="w-full space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header */}
        <CultHeader />

        {/* Pending Invites Section */}
        <AnimatePresence>
          {invites.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Inbox className="size-3.5 text-primary selection:text-background selection:bg-primary" />
                  <span>Pending Invites ({invites.length})</span>
                </h3>
              </div>

              <div className="space-y-3">
                {invites.map((invite) => (
                  <CultInviteCard
                    key={invite.id}
                    invite={invite}
                    onRespond={handleRespond}
                    isResponding={isResponding}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Cults Grid */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Sparkles className="size-3.5 text-primary selection:text-background selection:bg-primary" />
              <span>Active Collectives ({cults.length})</span>
            </h2>
          </div>

          {isLoadingCults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-44 border border-border bg-card/50 animate-pulse" />
              <div className="h-44 border border-border bg-card/50 animate-pulse" />
            </div>
          ) : cults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {cults.map((cult) => (
                <CultCard key={cult.id} cult={cult} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border border-dashed border-border bg-card p-12 text-center space-y-4">
              <div className="flex size-12 items-center justify-center border border-border bg-background text-muted-foreground">
                <Sparkles className="size-6 text-primary selection:text-background selection:bg-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-2xl font-bold text-foreground">
                  No cults joined yet
                </h3>
                <p className="font-body text-sm text-muted-foreground max-w-md">
                  Create your own creative collective or accept pending invites
                  to start collaborating on team briefs.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
