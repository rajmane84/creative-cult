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
import ExperienceFormSection from '@/components/creative/profile/experience-form-section';
import { Experience } from '@/validations/creative/experience';
import { useUpdateExperience } from '@/hooks/creative/profile/use-update-experience';

interface EditExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experiences: Experience[];
}

export function EditExperienceDialog({
  open,
  onOpenChange,
  experiences: initialExperiences,
}: EditExperienceDialogProps) {
  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);

  const { updateExperienceMutation } = useUpdateExperience({
    onSuccess: () => onOpenChange(false),
  });

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setExperiences(initialExperiences);
    }
    onOpenChange(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateExperienceMutation.mutate({ experiences });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Experience</DialogTitle>
          <DialogDescription>
            Your work history helps clients gauge your track record.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-2">
          <ExperienceFormSection
            experiences={experiences}
            onChange={setExperiences}
          />

          <DialogFooter className="pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={updateExperienceMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateExperienceMutation.isPending}
              className="gap-2"
            >
              {updateExperienceMutation.isPending && (
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
