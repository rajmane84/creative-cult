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
import EducationSection from '@/components/creative/onboarding/education-section';
import { Education } from '@/validations/creative/onboarding';
import { useUpdateEducation } from '@/hooks/creative/profile/use-update-education';

interface EditEducationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  education: Education[];
}

export function EditEducationDialog({
  open,
  onOpenChange,
  education: initialEducation,
}: EditEducationDialogProps) {
  const [education, setEducation] = useState<Education[]>(initialEducation);

  const { updateEducationMutation } = useUpdateEducation({
    onSuccess: () => onOpenChange(false),
  });

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setEducation(initialEducation);
    }
    onOpenChange(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEducationMutation.mutate({ education });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Education</DialogTitle>
          <DialogDescription>
            Showcase your qualifications to help clients verify your background.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-2">
          <EducationSection educationList={education} onChange={setEducation} />

          <DialogFooter className="pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={updateEducationMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateEducationMutation.isPending}
              className="gap-2"
            >
              {updateEducationMutation.isPending && (
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
