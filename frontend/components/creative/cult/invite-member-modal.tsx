'use client';

import React, { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCultActions } from '@/hooks/creative/cult';

interface InviteMemberModalProps {
  cultId: string;
  cultSlug: string;
  cultName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteMemberModal({
  cultId,
  cultSlug,
  cultName,
  open,
  onOpenChange,
}: InviteMemberModalProps) {
  const [targetUsername, setTargetUsername] = useState('');
  const [message, setMessage] = useState('');

  const { inviteMember, isInviting } = useCultActions(cultId, cultSlug);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUsername.trim()) return;

    const cleanInput = targetUsername.trim();
    const isEmail = cleanInput.includes('@');

    inviteMember(
      {
        targetEmailId: isEmail ? cleanInput : undefined,
        targetUsername: isEmail ? undefined : cleanInput,
        message: message.trim() || undefined,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setTargetUsername('');
          setMessage('');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="space-y-2">
          <DialogTitle className="font-editorial md:text-2xl font-bold text-foreground flex items-center gap-2">
            <UserPlus className="size-5 text-primary selection:text-background selection:bg-primary" />
            <span>Invite Creative to {cultName}</span>
          </DialogTitle>
          <DialogDescription className="font-body text-xs text-muted-foreground">
            Enter the username or email of the creative profile you wish to
            invite to your collective.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="invite-username"
              className="font-mono text-xs uppercase tracking-wider text-foreground"
            >
              Username or Email{' '}
              <span className="text-primary selection:text-background selection:bg-primary">
                *
              </span>
            </Label>
            <Input
              id="invite-username"
              placeholder="e.g. alexrivera or alex@example.com"
              value={targetUsername}
              onChange={(e) => setTargetUsername(e.target.value)}
              required
              className="font-body text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="invite-message"
              className="font-mono text-xs uppercase tracking-wider text-foreground"
            >
              Personal Message (Optional)
            </Label>
            <Textarea
              id="invite-message"
              placeholder="e.g. Hey! We'd love for you to join our motion design team..."
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="font-body text-sm resize-none"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isInviting}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isInviting || !targetUsername.trim()}
              className="cursor-pointer gap-2"
            >
              {isInviting && <Loader2 className="size-4 animate-spin" />}
              <span>Send Invite</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
