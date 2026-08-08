'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

interface ClientDashboardHeaderProps {
  fullName?: string | null;
}

const ease = [0.76, 0, 0.24, 1] as const;

export function ClientDashboardHeader({
  fullName,
}: ClientDashboardHeaderProps) {
  const { data: sessionData } = authClient.useSession();
  const isEmailVerified = Boolean(sessionData?.user?.emailVerified);

  const displayName = fullName?.split(' ')[0];

  const handleCreateListingClick = (e: React.MouseEvent) => {
    if (!isEmailVerified) {
      e.preventDefault();
      toast.error(
        'Email verification required. Please verify your email address before proceeding.'
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="space-y-2"
      >
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <span>/ Client Dashboard</span>
          <span className="size-1.5 bg-primary selection:text-background selection:bg-primary inline-block" />
        </div>

        <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Welcome back,{' '}
          <span className="text-primary selection:text-background selection:bg-primary">
            {displayName}!
          </span>
        </h1>

        <p className="font-body text-base text-muted-foreground">
          Let&apos;s get your first listing live.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
        className="flex flex-col items-start md:items-end gap-1.5 shrink-0"
      >
        <Link
          href="/dashboard/client/listings/new"
          onClick={handleCreateListingClick}
        >
          <Button>
            <Plus className="size-4" />
            <span>Post a Job / Listing</span>
          </Button>
        </Link>
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          It only takes a few minutes!
        </span>
      </motion.div>
    </div>
  );
}
