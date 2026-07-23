'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import {
  ProfileCompletionCard,
  EmailVerificationCard,
} from '@/components/client/dashboard';

const ease = [0.76, 0, 0.24, 1] as const;
const smoothSpring = {
  type: 'spring',
  stiffness: 220,
  damping: 26,
  mass: 0.8,
} as const;

export default function ClientDashboard() {
  const { data: sessionData, isPending } = authClient.useSession();
  const user = sessionData?.user;

  if (isPending || !user) return null;

  const fullName = user.name;
  const displayName = fullName ? fullName.split(' ')[0] : 'Client';
  const userEmail = user.email;
  const isEmailVerified = Boolean(user.emailVerified);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      <div className="w-full space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Top Welcome Header & Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-border pb-6 sm:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="space-y-2"
          >
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <span>/ Client Dashboard</span>
              <span className="w-1.5 h-1.5 bg-primary selection:text-background selection:bg-primary inline-block" />
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Welcome back,{' '}
              <span className="text-primary selection:text-background selection:bg-primary">
                {displayName}!
              </span>
            </h1>

            <p className="font-body text-sm sm:text-base text-muted-foreground">
              Let&apos;s get your first listing live.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="flex flex-col items-start sm:items-end gap-1.5 shrink-0"
          >
            <Link
              href="/dashboard/client/listings/new"
              className="w-full sm:w-auto"
            >
              <Button className="w-full sm:w-auto cursor-pointer gap-2">
                <Plus className="size-4" />
                <span>Post a Job / Listing</span>
              </Button>
            </Link>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              It only takes a few minutes!
            </span>
          </motion.div>
        </div>

        {/* Dynamic Responsive Notice Cards Grid */}
        <motion.div
          layout
          transition={smoothSpring}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <motion.div
            layout
            transition={smoothSpring}
            className={cn('w-full', isEmailVerified && 'lg:col-span-2')}
          >
            <ProfileCompletionCard completedSteps={2} totalSteps={5} />
          </motion.div>

          <AnimatePresence>
            {!isEmailVerified && (
              <motion.div
                key="email-verification-card"
                layout
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: -20,
                  transition: { duration: 0.35, ease },
                }}
                transition={smoothSpring}
              >
                <EmailVerificationCard email={userEmail} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
