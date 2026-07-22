'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  ShieldAlert,
  CheckCircle2,
  Mail,
  Send,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface EmailVerificationCardProps {
  email: string;
  isVerified?: boolean;
  onVerificationSent?: () => void;
  className?: string;
}

export default function EmailVerificationCard({
  email,
  isVerified: initialIsVerified = false,
  onVerificationSent,
  className,
}: EmailVerificationCardProps) {
  const [isVerified, setIsVerified] = useState(initialIsVerified);
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = () => {
    setIsResending(true);

    const resendPromise = new Promise<{ email: string }>((resolve) => {
      setTimeout(() => {
        setIsResending(false);
        onVerificationSent?.();
        resolve({ email });
      }, 1200);
    });

    toast.promise(resendPromise, {
      loading: `Sending verification link to ${email}...`,
      success: (data) =>
        `Verification email sent to ${data.email}! Check your inbox.`,
      error: 'Failed to send verification email. Please try again.',
    });
  };

  const toggleSimulatedState = () => {
    const nextState = !isVerified;
    setIsVerified(nextState);
    toast.info(
      `UI Preview: Simulated status set to ${
        nextState ? 'VERIFIED' : 'UNVERIFIED'
      }`
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      <AnimatePresence mode="wait">
        {!isVerified ? (
          <motion.div
            key="unverified-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 md:p-8"
          >
            {/* Background subtle noise/glow */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-600 border border-amber-500/40">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Email Unverified
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    // Action Required
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Verify your email to unlock all creator features
                </h3>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Your address{' '}
                  <strong className="text-foreground font-mono bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    {email}
                  </strong>{' '}
                  has not been verified yet. Unverified accounts cannot accept
                  direct client inquiries or appear on public creator listings.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <Button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="gap-2 font-mono text-xs uppercase tracking-wider min-w-[180px]"
                >
                  {isResending ? (
                    <Mail className="w-4 h-4 animate-bounce" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isResending ? 'Sending...' : 'Resend Email'}
                </Button>

                {/* Interactive Dev Preview Toggle */}
                <button
                  type="button"
                  onClick={toggleSimulatedState}
                  className="inline-flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-1.5"
                  title="Toggle verified state for testing UI"
                >
                  <ToggleLeft className="w-4 h-4 text-amber-500" />
                  <span>Preview Verified UI</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="verified-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-5 md:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-base text-foreground">
                      Email Address Verified
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-emerald-500/15 text-emerald-600">
                      <Sparkles className="w-3 h-3" />
                      Active
                    </span>
                  </div>

                  <p className="font-mono text-xs text-muted-foreground mt-0.5">
                    {email} • Direct inquiries enabled
                  </p>
                </div>
              </div>

              {/* Interactive Dev Preview Toggle */}
              <button
                type="button"
                onClick={toggleSimulatedState}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors self-end sm:self-center"
                title="Toggle verified state for testing UI"
              >
                <ToggleRight className="w-4 h-4 text-emerald-500" />
                <span>Simulate Unverified</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
