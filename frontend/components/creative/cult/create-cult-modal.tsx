'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, TriangleAlert } from 'lucide-react';
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
import { useCreateCult } from '@/hooks/creative/cult';
import { authClient } from '@/lib/auth-client';

interface CreateCultModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCultModal({ open, onOpenChange }: CreateCultModalProps) {
  const { data: sessionData } = authClient.useSession();
  const isEmailVerified = Boolean(sessionData?.user?.emailVerified);

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [bio, setBio] = useState('');
  const [slug, setSlug] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const { createCult, isCreating } = useCreateCult({
    onSuccess: () => {
      onOpenChange(false);
      setName('');
      setTagline('');
      setBio('');
      setSlug('');
      setAvatarUrl('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !isEmailVerified) return;

    createCult({
      name: name.trim(),
      tagline: tagline.trim() || undefined,
      bio: bio.trim() || undefined,
      slug: slug.trim() || undefined,
      avatarUrl: avatarUrl.trim() || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="space-y-2">
          <DialogTitle className="font-editorial text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-5 text-primary selection:text-background selection:bg-primary" />
            <span>Create a new Cult</span>
          </DialogTitle>
          <DialogDescription className="font-body text-xs text-muted-foreground">
            Form an exclusive creative collective to collaborate on team briefs
            and present a unified portfolio.
          </DialogDescription>
        </DialogHeader>

        {!isEmailVerified && (
          <div className="flex items-start gap-2 border border-primary/30 bg-primary/10 px-3 py-2.5 text-primary">
            <TriangleAlert className="size-4 shrink-0 mt-0.5" />
            <p className="font-body text-xs">
              Verify your email address before creating a cult. You can resend
              the verification email from your dashboard.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="cult-name"
              className="font-mono text-xs uppercase tracking-wider text-foreground"
            >
              Cult Name{' '}
              <span className="text-primary selection:text-background selection:bg-primary">
                *
              </span>
            </Label>
            <Input
              id="cult-name"
              placeholder="e.g. Pixel Punks"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="font-body text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="cult-tagline"
              className="font-mono text-xs uppercase tracking-wider text-foreground"
            >
              Tagline
            </Label>
            <Input
              id="cult-tagline"
              placeholder="e.g. High-octane digital art & cyber aesthetic collective"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="font-body text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="cult-slug"
              className="font-mono text-xs uppercase tracking-wider text-foreground"
            >
              Custom Slug (Optional)
            </Label>
            <Input
              id="cult-slug"
              placeholder="e.g. pixel-punks"
              value={slug}
              onChange={(e) =>
                setSlug(
                  e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
                )
              }
              className="font-mono text-xs"
            />
            <p className="font-mono text-[10px] text-muted-foreground">
              Will be auto-generated from name if left empty.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="cult-avatar"
              className="font-mono text-xs uppercase tracking-wider text-foreground"
            >
              Avatar Image URL (Optional)
            </Label>
            <Input
              id="cult-avatar"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="font-body text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="cult-bio"
              className="font-mono text-xs uppercase tracking-wider text-foreground"
            >
              About the Cult
            </Label>
            <Textarea
              id="cult-bio"
              placeholder="Describe your collective's mission, stack, and aesthetic..."
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="font-body text-sm resize-none"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isCreating}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || !name.trim() || !isEmailVerified}
              className="cursor-pointer gap-2"
            >
              {isCreating && <Loader2 className="size-4 animate-spin" />}
              <span>Create Cult</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
