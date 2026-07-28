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
import { Label } from '@/components/ui/label';
import { useUpdateProfile } from '@/hooks/creative/profile/use-update-profile';

interface EditLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: string;
}

export function EditLocationDialog({
  open,
  onOpenChange,
  location: initialLocation,
}: EditLocationDialogProps) {
  const [location, setLocation] = useState(initialLocation);

  const { updateProfileMutation } = useUpdateProfile({
    onSuccess: () => onOpenChange(false),
  });

  const handleOpenChange = (next: boolean) => {
    if (next) setLocation(initialLocation);
    onOpenChange(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({ location: location.trim() });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
          <DialogDescription>
            Shown on your profile so clients know where you&apos;re based.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          <div className="space-y-2">
            <Label
              htmlFor="profile-location"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block"
            >
              Location
            </Label>
            <Input
              id="profile-location"
              placeholder="e.g., Mumbai, India"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
              autoFocus
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
