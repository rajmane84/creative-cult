'use client';

import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  ActionCard,
  ActionCardHeader,
  ActionCardIcon,
  ActionCardEyebrow,
  ActionCardBadge,
  ActionCardTitle,
  ActionCardDescription,
  ActionCardDismiss,
  ActionCardFooter,
} from '@/components/ui/action-card';

export interface EmailVerificationCardProps {
  email?: string | null;
  onDismiss?: () => void;
}

export function EmailVerificationCard({
  email = 'rajesh@creativeminds.com',
  onDismiss,
}: EmailVerificationCardProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleResendEmail = async () => {
    setIsSending(true);
    // Simulate API email dispatch
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSending(false);
    toast.success(`Verification email resent to ${email}`);
  };

  return (
    <ActionCard dismissible isVisible={isVisible} animationDelay={0.25}>
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
              <span className="font-mono text-foreground underline underline-offset-2">
                ({email})
              </span>{' '}
              to build trust.
            </ActionCardDescription>
          </div>
        </div>
        <ActionCardDismiss onClick={handleDismiss} />
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
