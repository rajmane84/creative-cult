'use client';

import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import {
  ActionCard,
  ActionCardHeader,
  ActionCardIcon,
  ActionCardEyebrow,
  ActionCardBadge,
  ActionCardTitle,
  ActionCardDescription,
  ActionCardFooter,
} from '@/components/ui/action-card';

export interface EmailVerificationCardProps {
  email?: string | null;
}

export function EmailVerificationCard({ email }: EmailVerificationCardProps) {
  const [isSending, setIsSending] = useState(false);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error('Email address is missing');
      return;
    }
    setIsSending(true);
    try {
      const callbackURL = `${window.location.origin}/dashboard/client`;
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL,
      });

      if (error) {
        toast.error(error.message || 'Failed to send verification email');
      } else {
        toast.success(`Verification email sent to ${email}`);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to send verification email';
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ActionCard animationDelay={0.25}>
      <ActionCardHeader>
        <div className="flex items-start gap-4">
          <ActionCardIcon icon={Mail} />
          <div className="space-y-1">
            <ActionCardEyebrow>
              Security Check{' '}
              <ActionCardBadge tone="attention">
                Action Required
              </ActionCardBadge>
            </ActionCardEyebrow>
            <ActionCardTitle>Verify your email</ActionCardTitle>
            <ActionCardDescription>
              Please verify your email{' '}
              {email ? (
                <span className="font-mono text-foreground underline underline-offset-2">
                  ({email})
                </span>
              ) : null}{' '}
              to build trust.
            </ActionCardDescription>
          </div>
        </div>
      </ActionCardHeader>

      <ActionCardFooter>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Unverified Account</span>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleResendEmail}
          disabled={isSending}
          size={'sm'}
        >
          {isSending ? 'Sending...' : 'Send Email'}
        </Button>
      </ActionCardFooter>
    </ActionCard>
  );
}
