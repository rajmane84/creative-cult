'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
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
import { useUpdateProfile } from '@/hooks/creative/profile/use-update-profile';

interface EditAboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  headline: string;
  bio: string;
}

export function EditAboutDialog({
  open,
  onOpenChange,
  headline: initialHeadline,
  bio: initialBio,
}: EditAboutDialogProps) {
  const [headline, setHeadline] = useState(initialHeadline);
  const [bio, setBio] = useState(initialBio);

  const { updateProfileMutation } = useUpdateProfile({
    onSuccess: () => onOpenChange(false),
  });

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setHeadline(initialHeadline);
      setBio(initialBio);
    }
    onOpenChange(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({ headline, bio });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit About</DialogTitle>
          <DialogDescription>
            Your headline appears under your name; your bio tells clients more
            about your work.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          <div className="space-y-2">
            <Label
              htmlFor="about-headline"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block"
            >
              Headline
            </Label>
            <Input
              id="about-headline"
              placeholder="e.g., Senior Graphic Designer"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="about-bio"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block"
            >
              Bio
            </Label>
            <Textarea
              id="about-bio"
              placeholder="Tell clients about yourself and your work..."
              rows={6}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary resize-none transition-colors"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={updateProfileMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="gap-2"
            >
              {updateProfileMutation.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
