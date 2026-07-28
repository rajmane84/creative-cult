'use client';

import { useState } from 'react';
import { Loader2, TriangleAlert } from 'lucide-react';
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
import { useSetLocation } from '@/hooks/creative/profile/use-set-location';

interface SetLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SetLocationDialog({
  open,
  onOpenChange,
}: SetLocationDialogProps) {
  const [location, setLocation] = useState('');

  const { setLocationMutation } = useSetLocation({
    onSuccess: () => onOpenChange(false),
  });

  const handleOpenChange = (next: boolean) => {
    if (next) setLocation('');
    onOpenChange(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;
    setLocationMutation.mutate({ location: location.trim() });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Set Your Location</DialogTitle>
          <DialogDescription>
            We couldn&apos;t detect your location automatically.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          <div className="flex items-start gap-2.5 border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
            <TriangleAlert className="size-4 shrink-0 mt-0.5" />
            <p>
              This is <strong className="font-semibold">permanent</strong> —
              once saved, you won&apos;t be able to change your location again.
              Double-check it before continuing.
            </p>
          </div>

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
              disabled={setLocationMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={setLocationMutation.isPending || !location.trim()}
              className="gap-2"
            >
              {setLocationMutation.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Save Permanently
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
